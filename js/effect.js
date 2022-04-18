const effectsRadio = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelField = document.querySelector('.effect-level__value');
const effectLevelContainerElement = document.querySelector('.img-upload__effect-level');
let currentSelectedEffect = 'none';

const effects = {
  chrome: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    makeStyle: (value) => `grayscale(${value})`
  },
  sepia: {
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    makeStyle: (value) => `sepia(${value})`
  },
  marvin: {
    range: {
      min: 0,
      max: 100
    },
    step: 1,
    makeStyle: (value) => `invert(${value}%)`
  },
  phobos: {
    range: {
      min: 0,
      max: 3
    },
    step: 0.1,
    makeStyle: (value) => `blur(${value}px)`
  },
  heat: {
    range: {
      min: 1,
      max: 3
    },
    step: 0.1,
    makeStyle: (value) => `brightness(${value})`
  },
  none: {
    range: {
      min: 0,
      max: 0
    },
    step: 0,
    makeStyle: () => ''
  }
};

const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: effects[currentSelectedEffect].range,
    step: effects[currentSelectedEffect].step,
    start: effects[currentSelectedEffect].range.min,
  });
  sliderElement.noUiSlider.set(effects[currentSelectedEffect].range.max);
};

const setEffect = (evt) => {
  currentSelectedEffect = evt.target.value;
  imagePreview.className = '';
  imagePreview.classList.add(`effects__preview--${currentSelectedEffect}`);

  if (currentSelectedEffect === 'none') {
    effectLevelContainerElement.classList.add('hidden');
  } else if (effectLevelContainerElement.classList.contains('hidden')) {
    effectLevelContainerElement.classList.remove('hidden');
  }

  updateSlider();
};

const createSlider = () => {
  noUiSlider.create(sliderElement, {
    range: effects.none.range,
    step: effects.none.step,
    start: effects.none.range.min,
    connect: 'lower'
  });
};

const initEffects = () => {
  createSlider();
  effectLevelContainerElement.classList.add('hidden');

  effectsRadio.forEach((effectRadio) => {
    effectRadio.addEventListener('change', setEffect);
  });

  sliderElement.noUiSlider.on('update', () => {
    const value = sliderElement.noUiSlider.get();
    effectLevelField.value = value;
    imagePreview.style.filter = effects[currentSelectedEffect].makeStyle(value);
  });
};

const disposeEffects = () => {
  const defaultCheckedRadio = document.querySelector('#effect-none');
  defaultCheckedRadio.checked = true;
  currentSelectedEffect = 'none';
  imagePreview.style.removeProperty('filter');
  imagePreview.className = '';
  sliderElement.noUiSlider.destroy();
};

export {initEffects, disposeEffects};
