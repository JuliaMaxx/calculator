const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const calculation = document.querySelector('.calculation');
const calculationResult = document.querySelector('.calculation-result');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');

function Calculator() {
  this.operators = {
    '-': (a, b) => a - b,
    '+': (a, b) => +a + +b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
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

let num1 = '';

let operator = '';


function disableOperators(){
  operators.forEach(op => op.disabled = true);
}

function enableOperators(){
  operators.forEach(op => op.disabled = false);
}
disableOperators()

function clearDisplay() {
  calculation.innerText = '';
  calculationResult.innerText = '';
  disableOperators();
}

function deleteLastDigit() {
  const text = calculationResult.innerText;
  calculationResult.innerText = text.length > 0? text.slice(0, -1): text;
}

function changeDisplay(event){
  calculationResult.textContent += event.target.innerText;
  enableOperators();
}

function addOperator(event){
  num1 = calculation.innerText;
  operator = event.target.innerText;
  calculation.textContent += `${calculationResult.textContent} ${operator} `;
  calculationResult.textContent = '';
  disableOperators();
}

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);
numberButtons.forEach(btn => btn.addEventListener('click', changeDisplay));
operators.forEach(op => op.addEventListener('click', addOperator));


