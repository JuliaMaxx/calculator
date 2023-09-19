const squareRoot = document.getElementById("square-root");
const factorial = document.getElementById("factorial");
const logarithm = document.getElementById("logarithm");
const naturalLogarithm = document.getElementById("natural-logarithm");
const signBtn = document.querySelector(".sign");
const percent = document.getElementById('percent');


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

squareRoot.addEventListener("click", calcSquareRoot);
factorial.addEventListener("click", calcFactorial);
logarithm.addEventListener("click", calcLog);
naturalLogarithm.addEventListener("click", calcNatLog);
signBtn.addEventListener("click", changeSign);
percent.addEventListener('click', calcPercent);