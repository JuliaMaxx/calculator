const clearBtn = document.getElementById("clear");
const deleteBtn = document.getElementById("delete");
const calculation = document.querySelector(".calculation");
const currentNumber = document.querySelector(".current-number");
const numberButtons = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const equalSign = document.querySelector(".equal");
const signBtn = document.querySelector(".sign");
const squareRoot = document.getElementById("square-root");
const factorial = document.getElementById("factorial");
const logarithm = document.getElementById("logarithm");
const naturalLogarithm = document.getElementById("natural-logarithm");
const message = document.getElementById("message");
const buttons = document.querySelectorAll('#grid > button');
const percent = document.getElementById('percent');
const history = document.querySelector('.history');
const historyBox = document.getElementById('history-box');
const calculatorBox = document.getElementById('calculator-box');
const closeHistoryBtn = document.getElementById('close-history');
const deleteHistoryBtn = document.getElementById('delete-history');
const historyMain = document.querySelector('.history-main');
const pinkThemeBtn = document.getElementById('pink-theme');
const blueThemeBtn = document.getElementById('blue-theme');
const orangeThemeBtn = document.getElementById('orange-theme');
const clickSound = document.getElementById('click-sound');
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
    displayMessage('Division by 0 not allowed :(');
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

function changeSign() {
  let number = currentNumber.innerText;
  if (number !== "" && number !== ".") {
    number = +number;
    if (number[0] === ".") {
      currentNumber.innerText = -(+("0" + number));
    }
    currentNumber.innerText = -number;
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

function calcSquareRoot() {
  const number = currentNumber.innerText;
  if (number < 0) {
    displayMessage('cannot calculate sqrt of negative number');
    return;
  }
  let rootedResult = "";
  if (number !== "" && number !== ".") {
    if (number[0] === ".") {
      rootedResult = (+("0" + number)) ** 0.5;
    }
    rootedResult = (+number) ** 0.5;
    rootedResult = Math.round(+rootedResult * 10 ** 3) / 10 ** 3;
    currentNumber.innerText = rootedResult;
  }
}

function calcFactorial() {
  let number = currentNumber.innerText;
  if (number !== "" && number !== ".") {
    number = +number;
    if (number < 0) {
      displayMessage('cannot calculate factorial of negative number');
      return;
    }
    if (number > 17) {
      displayMessage('number too long')
      return;
    }
    let factResult = 1;
    for (let i = 2; i <= number; i++) {
      factResult *= i;
    }
    
    currentNumber.innerText = factResult;
  }
}

function calcLog() {
  let number = currentNumber.innerText;
  if (number !== "" && number !== ".") {
    number = +number;
    if (number <= 0) {
      displayMessage('cannot calculate log of negative number');
      return;
    }
    let logResult = Math.log(number) / Math.log(10);
    currentNumber.innerText = Math.round(logResult * 10 ** 3) / 10 ** 3;
  }
}

function calcNatLog() {
  let number = currentNumber.innerText;
  if (number !== "" && number !== ".") {
    number = +number;
    if (number <= 0) {
      displayMessage('cannot calculate log of negative number');
      return;
    }
    
    let logResult = Math.log(number);
    currentNumber.innerText = Math.round(logResult * 10 ** 3) / 10 ** 3;
  }
}

function calcPercent() {
  let number = currentNumber.innerText;
  if (number !== "" && number !== ".") {
    number = +number;
    if (num1 && (operator === '+' || operator === '-')){
      currentNumber.innerText = num1*number/100
    }
    else{
      currentNumber.innerText = number/100
    }
  }
}

function showHistory() {
  historyBox.style.visibility = 'visible';
  historyBox.style.height = '100%';
  historyMain.style.opacity = 1;
}
function closeHistory () {
  historyBox.style.height = '0';
  historyBox.style.visibility = 'hidden';
  historyMain.style.opacity = 0;

}

function deleteHistory() {
  historyMain.style.opacity = 0;
  setTimeout(() => {
    historyMain.innerHTML = '';
    historyMain.style.opacity = 1;
  }, 600);
}


function changeToPink() {
  const blueElements = document.querySelectorAll('.blue');
  const orangeElements = document.querySelectorAll('.orange');
  if (blueElements.length > 0) {
    blueElements.forEach(element => {
      element.classList.add('pink');
      element.classList.remove('blue');
    })
  }
  orangeElements.forEach(element => {
    element.classList.add('pink');
    element.classList.remove('orange');
  })
  blueThemeBtn.classList.remove('on');
  orangeThemeBtn.classList.remove('on');
  pinkThemeBtn.classList.add('on');
}

function changeToBlue() {
  const pinkElements = document.querySelectorAll('.pink');
  const orangeElements = document.querySelectorAll('.orange');
  if (pinkElements.length > 0) {
    pinkElements.forEach(element => {
      element.classList.add('blue');
      element.classList.remove('pink');
    })
  }
  else {
    orangeElements.forEach(element => {
      element.classList.add('blue');
      element.classList.remove('orange');
    })
  }
  blueThemeBtn.classList.add('on');
  orangeThemeBtn.classList.remove('on');
  pinkThemeBtn.classList.remove('on');
}

function changeToOrange() {
  const pinkElements = document.querySelectorAll('.pink');
  const blueElements = document.querySelectorAll('.blue');
  if (pinkElements.length > 0) {
    pinkElements.forEach(element => {
      element.classList.add('orange');
      element.classList.remove('pink');
    })
  }
  else {
    blueElements.forEach(element => {
      element.classList.add('orange');
      element.classList.remove('blue');
    })
  }
  blueThemeBtn.classList.remove('on');
  pinkThemeBtn.classList.remove('on');
  orangeThemeBtn.classList.add('on');
}

function playSound() {
  clickSound.play()
}
 
buttons.forEach(button => button.addEventListener('click', clearMessage));
clearBtn.addEventListener("click", clearDisplay);
deleteBtn.addEventListener("click", deleteLastDigit);
numberButtons.forEach((btn) => btn.addEventListener("click", changeDisplay));
operators.forEach((op) => op.addEventListener("click", addOperator));
equalSign.addEventListener("click", displayResult);
signBtn.addEventListener("click", changeSign);
squareRoot.addEventListener("click", calcSquareRoot);
factorial.addEventListener("click", calcFactorial);
logarithm.addEventListener("click", calcLog);
naturalLogarithm.addEventListener("click", calcNatLog);
percent.addEventListener('click', calcPercent);
history.addEventListener('click', showHistory)
closeHistoryBtn.addEventListener('click', closeHistory);
deleteHistoryBtn.addEventListener('click', deleteHistory);
pinkThemeBtn.addEventListener("click", changeToPink);
blueThemeBtn.addEventListener("click", changeToBlue);
orangeThemeBtn.addEventListener("click", changeToOrange);
buttons.forEach(button => button.addEventListener('click', playSound))