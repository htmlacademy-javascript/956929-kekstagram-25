function random (a, b) {
  const down = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const up = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (up - down + 1) + down;
  return Math.floor(result);
}

const getRandom = (elements) => {
  return elements[random(0, elements.length - 1)];
};

const isCorrectLength = (str, maxLength) => str.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertTemplate = document.querySelector('#data-error').content.querySelector('.error');
  const alertContainer = alertTemplate.cloneNode(true);
  const alertTextContainer = alertContainer.querySelector('.error__title');
  const ALERT_SHOW_TIME = 5000;

  alertTextContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {random, getRandom, isEscapeKey, isCorrectLength, showAlert, debounce};
