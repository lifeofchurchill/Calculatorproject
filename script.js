let firstNUmber = "";
let secondNumber = "";
let currentOperator = null;


//functions for the 4 arithmetic calculations
function add(a, b) {
 return a + b; 
}

function subtract(a, b) {
 return a - b;
}

function divide(a, b) {
    if (b === 0) {
        return undefined;
    }
 return a / b;
}

function multiply(a, b) {
 return a * b;
}

//function that calls one of the above operators
function operate(a, op, b) {
 switch (op) {
    case "-": 
        return subtract(a - b);
    case "+":
        return add(a + b);
    case "*":
        return multiply(a * b);
    case "/":
        return divide(a / b);
    default: 
        return null;
 }
}