// CALCULATOR STATE
let firstNumber = "";
let secondNumber = "";
let currentDisplayValue = "0";
let currentOperator = null;
let shouldResetScreen = false;

// DISPLAY ELEMENT
// -------------------------------
const display = document.getElementById("display");

// -------------------------------
// DISPLAY UPDATE FUNCTION
// -------------------------------
function updateDisplay() {
  display.textContent = currentDisplayValue;
}

// -------------------------------
// APPEND NUMBER TO DISPLAY
// -------------------------------
function appendNumber(number) {
  if (currentDisplayValue === "0" || shouldResetScreen) {
    currentDisplayValue = number;
    shouldResetScreen = false;
  } else {
    currentDisplayValue += number;
  }
  updateDisplay();
}

// -------------------------------
// CHOOSE OPERATOR & HIGHLIGHT IT
// -------------------------------
function chooseOperator(operator) {
  if (currentOperator !== null) evaluate(); // for chaining

  firstNumber = currentDisplayValue;
  currentOperator = operator;
  shouldResetScreen = true;

  // Highlight selected operator
  operatorButtons.forEach(button => {
    if (button.textContent === operator) {
      button.classList.add("active-operator");
    } else {
      button.classList.remove("active-operator");
    }
  });
}

// -------------------------------
// EVALUATE THE EXPRESSION
// -------------------------------
function evaluate() {
  if (currentOperator === null || shouldResetScreen) return;

  secondNumber = currentDisplayValue;
  const result = operate(currentOperator, parseFloat(firstNumber), parseFloat(secondNumber));

  currentDisplayValue = result === undefined ? "Error" : result.toString();
  updateDisplay();
  currentOperator = null;

  // Remove operator highlight
  operatorButtons.forEach(button => button.classList.remove("active-operator"));
}

// -------------------------------
// CLEAR CALCULATOR STATE
// -------------------------------
function clearCalculator() {
  firstNumber = "";
  secondNumber = "";
  currentOperator = null;
  currentDisplayValue = "0";
  shouldResetScreen = false;
  updateDisplay();

  // Remove operator highlight
  operatorButtons.forEach(button => button.classList.remove("active-operator"));
}

// -------------------------------
// DELETE LAST DIGIT
// -------------------------------
function deleteLastDigit() {
  if (shouldResetScreen || currentDisplayValue === "0") return;

  currentDisplayValue = currentDisplayValue.slice(0, -1);
  if (currentDisplayValue === "") {
    currentDisplayValue = "0";
  }
  updateDisplay();
}

// -------------------------------
// BASIC OPERATIONS
// -------------------------------
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return b === 0 ? undefined : a / b;
}

// -------------------------------
// OPERATOR DISPATCH FUNCTION
// -------------------------------
function operate(op, a, b) {
  switch (op) {
    case "+": return add(a, b);
    case "-":
    case "−": return subtract(a, b);
    case "*":
    case "×": return multiply(a, b);
    case "/":
    case "÷": return divide(a, b);
    default: return null;
  }
}

// -------------------------------
// SELECT BUTTONS
// -------------------------------
const numberButtons = document.querySelectorAll("button:not(.operator):not(.function):not(.equal):not(.clear):not(.delete)");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector(".equal");
const clearButton = document.querySelector(".clear");
const deleteButton = document.querySelector(".delete");

// -------------------------------
// EVENT LISTENERS
// -------------------------------
numberButtons.forEach(button => {
  button.addEventListener("click", () => appendNumber(button.textContent));
});

operatorButtons.forEach(button => {
  button.addEventListener("click", () => chooseOperator(button.textContent));
});

equalButton.addEventListener("click", evaluate);
clearButton.addEventListener("click", clearCalculator);
deleteButton.addEventListener("click", deleteLastDigit);

// -------------------------------
// INITIAL DISPLAY
// -------------------------------
updateDisplay();
