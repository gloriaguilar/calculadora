import { useReducer, useState } from "react";
import "./styles.css";
import Digit from "./Digit";
import OperationButton from "./OperationButton";
export const ACTIONS = {
  ADD_DIGIT: 'add-digit',
  CHOOSE_OPERATION: ' ',
  CLEAR: 'clear',
  DELETE_DIGIT: 'delete-digit'
}


function reducer(state, { type, payload }) {

  // eslint-disable-next-line default-case
  switch (type) {

    case ACTIONS.ADD_DIGIT:

      if (payload.digit === "0" && state.currentOperand === "0") {
        return state
      }

      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state
      }

      return {
        ...state,
        currentOperand: `${state.currentOperand || " "}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      if (state.currentOperand == null) {

        return {
          ...state,
          operation: payload.operation
        }
      }

      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null
      }
    case ACTIONS.CLEAR:
      return {}

    case ACTIONS.EVALUATE:
      if (state.operation == null || state.currentOperand == null || state.previousOperand == null) {
        return state;
      }

      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state)
      }
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {

  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);

  if (isNaN(prev) || isNaN(current)) return "";

  let computation = "";

  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
    default:
      break;
  }

  return computation.toString();

}

function App() {

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, {});

  const [showImage, setShowImage] = useState(false);

  return (
    <div>
      <h1  >Calculadora</h1>
      <div className="app-container">
        <div className="calculator-grid">
          <div className="output">
            <div className="previous-operand">{previousOperand} {operation}</div>
            <div className="current-operand">{currentOperand}</div>
          </div>
          <button className="span-two" onClick={() => {
            setShowImage(false);
            dispatch({ type: ACTIONS.CLEAR })
          }} >AC</button>
          <button>DEL</button>
          <OperationButton operation={'÷'} dispatch={dispatch} />
          <Digit digit={'1'} dispatch={dispatch} />
          <Digit digit={'2'} dispatch={dispatch} />
          <Digit digit={'3'} dispatch={dispatch} />
          <OperationButton operation={'*'} dispatch={dispatch} />

          <Digit digit={'4'} dispatch={dispatch} />
          <Digit digit={'5'} dispatch={dispatch} />
          <Digit digit={'6'} dispatch={dispatch} />
          <OperationButton operation={'+'} dispatch={dispatch} />
          <Digit digit={'7'} dispatch={dispatch} />
          <Digit digit={'8'} dispatch={dispatch} />
          <Digit digit={'9'} dispatch={dispatch} />
          <OperationButton operation={'-'} dispatch={dispatch} />
          <Digit digit={'.'} dispatch={dispatch} />
          <Digit digit={'0'} dispatch={dispatch} />
          <button className="span-two" onClick={() => {
            dispatch({ type: ACTIONS.EVALUATE });
            setShowImage(true);
          }

          } > = </button>
        </div>
        {showImage ?
          <div>
            <h2>Suma alegria, resta el dolor y divide las penas</h2>
            <img src="https://www.boredpanda.com/blog/wp-content/uploads/2014/03/cute-smiling-animals-26.jpg" alt="" srcset="" />
            <p>Ojo: Esta calculadora es para fines de practica,no hace operaciones complicadas, <br /> como resolver tu vida :(</p>
          </div>
          :
          ""
        }

      </div>
    </div >
  );
}

export default App;
