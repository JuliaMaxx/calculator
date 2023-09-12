const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const calculation = document.querySelector('.calculation');
const calculationResult = document.querySelector('.calculation-result');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal');
let num1 = '';
let num2 = '';
let result = '';
let operator = '';

function Calculator() {
  this.operators = {
    '-': (a, b) => a - b,
    '+': (a, b) => +a + +b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b
  }
  this.calculate = function(input) {
    const [num1, operator, num2] = input.split(' ');
    if (!this.operators[operator] || isNaN(num1) || isNaN(num2)) {
      return NaN;
    }
    return this.operators[operator](num1, num2);
  }
}

const calculator = new Calculator;

function disableOperators(){
  operators.forEach(op => op.disabled = true);
}

function enableOperators(){
  operators.forEach(op => op.disabled = false);
}
disableOperators();

function resetValues() {
  num1 = '';
  num2 = '';
  result = '';
  operator = '';
  disableOperators();
}

function clearDisplay() {
  calculation.innerText = '';
  calculationResult.innerText = '';
  resetValues();
}

function deleteLastDigit() {
  const text = calculationResult.innerText;
  calculationResult.innerText = text.length > 0? text.slice(0, -1): text;
}

function changeDisplay(event){
  calculationResult.textContent += event.target.innerText;
  enableOperators();
}

function displayResult(){
  if (num1 !== '' && operator){
    num2 = calculationResult.innerText;
    console.log(num1, operator, num2)
    result = calculator.calculate(`${num1} ${operator} ${num2}`);
    calculationResult.textContent = result;
    num1 = '';
    operator = '';
    calculation.textContent = '';
  }
}

function addOperator(event){
  operator = operator? operator: event.target.innerText;
  if(num1 !== '' && calculationResult.innerText){
    num2 = calculationResult.innerText;
    console.log(num1, operator, num2)
    result = calculator.calculate(`${num1} ${operator} ${num2}`);
    calculation.textContent = `${result} ${operator}`;
    num1 = result;
  } else if(num1 === '') {
    num1 = calculationResult.innerText;
  }
  operator = event.target.innerText;
  calculation.textContent = `${num1} ${operator} `;
  calculationResult.textContent = '';
}

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);
numberButtons.forEach(btn => btn.addEventListener('click', changeDisplay));
operators.forEach(op => op.addEventListener('click', addOperator));
equalSign.addEventListener('click', displayResult);


