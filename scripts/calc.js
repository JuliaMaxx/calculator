const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const calculation = document.querySelector(".calculation");
const currentNumber = document.querySelector(".current-number");
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal");
const message = document.getElementById("message");
const buttons = document.querySelectorAll('#grid > button');
const calculatorBox = document.getElementById('calculator-box');
const maxDigits = 999999999999999;
const minDigits = -999999999999999;
let num1 = "";
let num2 = "";
let result = "";
let operator = "";

function Calculator() {
  this.operators = {
    "-": (a, b) => a - b,
    "+": (a, b) => +a + +b,
    "x": (a, b) => a * b,
    "÷": (a, b) => a / b,
    "^": (a, b) => a ** b,
  };
  this.calculate = function (input) {
    const [num1, operator, num2] = input.split(" ");
    if (!this.operators[operator] || isNaN(num1) || isNaN(num2)) {
      return NaN;
    }
    return this.operators[operator](num1, num2);
  };
}

const calculator = new Calculator();

function disableOperators() {
  operators.forEach((op) => (op.disabled = true));
}

function enableOperators() {
  operators.forEach((op) => (op.disabled = false));
}

disableOperators();

function resetValues() {
  num1 = "";
  num2 = "";
  result = "";
  operator = "";
  calculation.innerText = "";
  currentNumber.innerText = "";
  disableOperators();
}

function clearDisplay() {
  resetValues();
}

function displayMessage(msg) {
  result = '';
  message.style.display = "block";
  message.innerText = msg;

}

function deleteLastDigit() {
  const text = currentNumber.innerText;
  currentNumber.innerText = text.length > 0 ? text.slice(0, -1) : text;
}

function changeDisplay(event) {
  let number = event.target.dataset.digit;
  if (calculation.textContent.includes("=")) {
    calculation.innerText = "";
  }
  if (currentNumber.textContent.length < 15) {
    if (
      (number === "." ||
      number === '3.14159' ||
      number == '2.71828')
      && currentNumber.textContent.includes('.')
      ){
        currentNumber.textContent += '';
        displayMessage('cannot have two dots in number');

    }
    else {
      currentNumber.textContent += number;
    }
  }
  enableOperators();
}

function calculateResult(num1, operator, num2) {
  result = calculator.calculate(`${num1} ${operator} ${num2}`);
  result = Math.round(+result * 10 ** 3) / 10 ** 3;
  if (result > maxDigits || result < minDigits) {
    displayMessage( 'Number too long');
  }
  if (+num2 === 0 && operator === "÷") {
    displayMessage('Division by 0 not allowed');
  }
  if (result !== ''){
    const newDiv = document.createElement('div');
    let historyText = `${num1} ${operator} ${num2} = ${result}`;
    newDiv.textContent = historyText;
    historyMain.appendChild(newDiv);
  }
  return result;
}

function displayResult() {
  if (num1 !== "" && operator && currentNumber.innerText !== '') {
    num2 = currentNumber.innerText;
    num1 = num1 === '.'? 0: num1;
    num2 = num2 === '.'? 0: num2;
    result = calculateResult(num1, operator, num2);
    currentNumber.textContent = result;
    num1 = "";
    operator = "";
    calculation.textContent += num2 + " =";
  }
}

function clearMessage() {
  message.style.display = 'none';
}

function addOperator(event) {
  if (
    (calculation.textContent !== "" &&
      !calculation.textContent.includes("=")) ||
    currentNumber.innerText !== ""
  ) {
    operator = operator ? operator : event.target.dataset.digit;
    if (num1 !== "" && currentNumber.innerText !== "") {
      num2 = currentNumber.innerText;
      num1 = num1 === '.'? 0: num1;
      num2 = num2 === '.'? 0: num2;
      result = calculateResult(num1, operator, num2);
      calculation.textContent = `${result} ${operator}`;
      num1 = result === "" ? num1 : result;
    } else if (num1 === "") {
      num1 = currentNumber.innerText;
    }
    operator = event.target.dataset.digit;
    calculation.textContent = `${num1} ${operator} `;
    currentNumber.textContent = "";
  }
}

buttons.forEach(button => button.addEventListener('click', clearMessage));
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteLastDigit);
numberButtons.forEach((btn) => btn.addEventListener("click", changeDisplay));
operators.forEach((op) => op.addEventListener("click", addOperator));
equalSign.addEventListener("click", displayResult);
