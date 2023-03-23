import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
const { delay, step, amount } = form.elements;

form.addEventListener('submit', onClick);

function onClick(e) {
  e.preventDefault();

  let result = Number(delay.value);

  if (result < 0 || Number(step.value) < 0 || Number(amount.value) < 0) {
    return;
  }
  for (let i = 1; i <= Number(amount.value); i += 1) {
    createPromise(i, result)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    result += Number(step.value);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;

  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        fulfill({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
