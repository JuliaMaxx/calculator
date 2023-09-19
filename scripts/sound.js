const clickSound = document.getElementById('click-sound');
const soundSwitch = document.getElementById('sound-switch');

function playSound() {
  clickSound.currentTime = 0;
  clickSound.play()
}

function toggleSound () {
  soundSwitch.classList.toggle('on');
  if (soundSwitch.classList.contains('on')){
    buttons.forEach(button => button.addEventListener('click', playSound));
    soundSwitch.innerHTML = `<img src="icons/icons8-sound-32 (1).png">`;
  }
  else {
    buttons.forEach(button => button.removeEventListener('click', playSound))
    soundSwitch.innerHTML = `<img src="icons/icons8-no-sound-32.png">`;
  }
}

soundSwitch.addEventListener('click', toggleSound);
buttons.forEach(button => button.addEventListener('click', playSound))