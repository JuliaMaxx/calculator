const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const calculation = document.querySelector('.calculation');
const calculationResult = document.querySelector('.calculation-result');
const numberButtons = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operator');
const equalSign = document.querySelector('.equal');
const signBtn = document.querySelector('.sign');
const squareRoot = document.getElementById('square-root');
const maxDigits = 999999999999999;
let num1 = '';
let num2 = '';
let result = '';
let operator = '';

function Calculator() {
  this.operators = {
    '-': (a, b) => a - b,
    '+': (a, b) => +a + +b,
    'x': (a, b) => a * b,
    '÷': (a, b) => a / b,
    '^': (a, b) => a ** b
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
  let number =  event.target.dataset.digit;
  if (calculationResult.textContent.length < 18)
  {calculationResult.textContent += 
  number === '.' && +calculationResult.textContent % 1 !== 0?
  "":
  number;
  }
  enableOperators();
}

function calculateResult(n1, op, n2){
  result = calculator.calculate(`${n1} ${op} ${n2}`);
  result = Math.round(+result * 10**3) / 10**3;
  result = result > maxDigits? maxDigits: result;
  return result;
}

function displayResult(){
  if (num1 !== '' && operator){
    num2 = calculationResult.innerText;
    result = calculateResult(num1, operator, num2);
    calculationResult.textContent = result;
    num1 = '';
    operator = '';
    calculation.textContent += num2 + ' =';
  }
}

function changeSign(){
  const number = calculationResult.innerText
  if(number !== '' && number !== '.'){
    if (number[0] === '.'){
      calculationResult.innerText = -(+("0"+number))
    }
    calculationResult.innerText = -(+number)
  }
}

function addOperator(event){
  if (calculation.textContent !== "" &&
   !calculation.textContent.includes('=')||
   calculationResult.innerText !== "" 
   ){ 
    operator = operator? operator: event.target.dataset.digit;
    if(num1 !== '' && calculationResult.innerText !== ""){
      num2 = calculationResult.innerText;
      result = calculateResult(num1, operator, num2);
      calculation.textContent = `${result} ${operator}`;
      num1 = result;
    } else if(num1 === '') {
      num1 = calculationResult.innerText;
    }
    operator = event.target.dataset.digit;
    calculation.textContent = `${num1} ${operator} `;
    calculationResult.textContent = '';
  }
}

function calcSquareRoot() {
  const number = calculationResult.innerText;
  let rootedResult = ''
  if(number !== '' && number !== '.'){
    if (number[0] === '.'){
      rootedResult = (+("0"+number)) ** 0.5;
    }
    rootedResult = (+number) ** 0.5;
    rootedResult = Math.round(+rootedResult * 10**3) / 10**3;
  }
  calculationResult.innerText = rootedResult; 
}

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);
numberButtons.forEach(btn => btn.addEventListener('click', changeDisplay));
operators.forEach(op => op.addEventListener('click', addOperator));
equalSign.addEventListener('click', displayResult);
signBtn.addEventListener('click', changeSign);
squareRoot.addEventListener('click', calcSquareRoot);

