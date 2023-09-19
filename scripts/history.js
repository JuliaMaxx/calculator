const closeHistoryBtn = document.getElementById('close-history');
const deleteHistoryBtn = document.getElementById('delete-history');
const historyMain = document.querySelector('.history-main');
const historyBtn = document.querySelector('.history');
const historyBox = document.getElementById('history-box');

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

historyBtn.addEventListener('click', showHistory)
closeHistoryBtn.addEventListener('click', closeHistory);
deleteHistoryBtn.addEventListener('click', deleteHistory);