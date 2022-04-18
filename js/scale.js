const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const setScaleValue = (value) => {
  scaleControlValue.value = value;
  imagePreview.style.transform = `scale(${value * 0.01})`;
};

const getScaleValue = () => parseInt(scaleControlValue.value, 10);

const zoomInPhoto = () => {
  const currentValue = getScaleValue();

  if (currentValue >= MAX_SCALE_VALUE) {
    return;
  }

  setScaleValue(currentValue + SCALE_STEP);
};

const zoomOutPhoto = () => {
  const currentValue = getScaleValue();

  if (currentValue <= MIN_SCALE_VALUE) {
    return;
  }

  setScaleValue(currentValue - SCALE_STEP);
};

const initScaleControl = () => {
  setScaleValue(MAX_SCALE_VALUE);
  scaleControlSmaller.addEventListener('click', zoomOutPhoto);
  scaleControlBigger.addEventListener('click', zoomInPhoto);
};

const disposeScaleControl = () => {
  scaleControlValue.value = '';
  imagePreview.style.removeProperty('transform');
  scaleControlSmaller.removeEventListener('click', zoomOutPhoto);
  scaleControlBigger.removeEventListener('click', zoomInPhoto);
};

export {initScaleControl, disposeScaleControl};
