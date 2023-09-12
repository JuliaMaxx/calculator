const clearBtn = document.getElementById('clear');
const deleteBtn = document.getElementById('delete');
const calculation = document.querySelector('.calculation');
const calculationResult = document.querySelector('.calculation-result');

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

function clearDisplay() {
  calculation.innerText = '';
  calculationResult.innerText = '';
}

function deleteLastDigit() {
  const text = calculation.innerText
  calculation.innerText = text.length > 0? text.slice(0, -1): text;
}

clearBtn.addEventListener('click', clearDisplay);
deleteBtn.addEventListener('click', deleteLastDigit);


