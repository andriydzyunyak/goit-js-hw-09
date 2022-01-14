let intervalId = null;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

refs.startBtn.addEventListener('click', onBtnChangeColorStart);
refs.stopBtn.addEventListener('click', onBtnChangeColorStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onBtnChangeColorStart() {
  intervalId = setInterval(() => {
    document.body.style.background = getRandomHexColor();
    refs.startBtn.setAttribute('disabled', true);
  }, 1000);
}

function onBtnChangeColorStop() {
  clearInterval(intervalId);
  refs.startBtn.removeAttribute('disabled');
}
