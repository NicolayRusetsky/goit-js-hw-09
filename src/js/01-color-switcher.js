function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

stopBtn.setAttribute('disabled', 'true');

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', 'true');
  stopBtn.removeAttribute('disabled');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'true');
});

// function start() {
//   startBtn.setAttribute('disabled', 'true');
//   stopBtn.removeAttribute('disabled');
//   timerId = setInterval(() => {
//     body.style.backgroundColor = getRandomHexColor();
//   }, 1000);
// }

// function stop() {
//   clearInterval(timerId);
//   startBtn.removeAttribute('disabled');
//   stopBtn.setAttribute('disabled', 'true');
// }
