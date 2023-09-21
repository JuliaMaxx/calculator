function typeKey(event) {
  event.preventDefault();
  const key = event.key;
  buttons.forEach(btn => {
    if (btn.dataset.key == key){
      btn.click();
    }
  })
}


document.addEventListener('keydown', typeKey)