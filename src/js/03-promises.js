import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');

form.addEventListener('submit', onSubmitClick);

function onSubmitClick(event) {
  event.preventDefault();
  const { delay, step, amount } = event.currentTarget;

  let dalayPromise = Number(delay.value);

  for (let i = 1; i <= amount.value; i++) {
    createPromise(i, dalayPromise).then(onFulled).catch(onRegected);
    dalayPromise += Number(step.value);
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, rejected) => {
    const canFulfill = Math.random() > 0.3;

    setTimeout(() => {
      if (canFulfill) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      }

      rejected(`❌ Rejected promise ${position} in ${delay}ms`);
    }, delay);
  });
}

function onFulled(result) {
  Notify.success(result);
}

function onRegected(error) {
  Notify.failure(error);
}
