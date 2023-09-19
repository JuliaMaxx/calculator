const pinkThemeBtn = document.getElementById('pink-theme');
const blueThemeBtn = document.getElementById('blue-theme');
const orangeThemeBtn = document.getElementById('orange-theme');

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

pinkThemeBtn.addEventListener("click", changeToPink);
blueThemeBtn.addEventListener("click", changeToBlue);
orangeThemeBtn.addEventListener("click", changeToOrange);