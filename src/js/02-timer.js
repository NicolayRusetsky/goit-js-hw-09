import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const refs = {
  daysObj: document.querySelector('[data-days]'),
  hoursObj: document.querySelector('[data-hours]'),
  minutesObj: document.querySelector('[data-minutes]'),
  secondsObj: document.querySelector('[data-seconds]'),
};

let getTime = null;
let choosenTime = null;

startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    choosenTime = selectedDates[0].getTime();
    if (choosenTime <= Date.now()) {
      startBtn.setAttribute('disabled', 'true');
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      startBtn.addEventListener('click', functionOnStart);
      getTime = selectedDates;
    }
  },
};

// startBtn.addEventListener('click', functionOnStart);

flatpickr('#datetime-picker', options);

function functionOnStart() {
  getTime = setInterval(function () {
    let interval = choosenTime - this.Date.now();

    let { days, hours, minutes, seconds } = convertMs(interval);
    if (choosenTime > this.Date.now()) {
      refs.daysObj.textContent = days;
      refs.hoursObj.textContent = hours;
      refs.minutesObj.textContent = minutes;
      refs.secondsObj.textContent = seconds;
    } else {
      clearInterval(getTime);
      startBtn.setAttribute('disabled', 'true');
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
