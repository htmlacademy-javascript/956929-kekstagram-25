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

export {random, getRandom, isEscapeKey, isCorrectLength};
