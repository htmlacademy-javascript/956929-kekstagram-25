import {isCorrectLength, isEscapeKey} from './util.js';
import {initScaleControl, disposeScaleControl} from './scale.js';
import {initEffects, disposeEffects} from './effect.js';
import {sendData} from './api.js';
import {clearFormPhoto, loadFormPhoto} from './form-photo.js';

const form = document.querySelector('#upload-select-image');
const loadPhotoInput = document.querySelector('#upload-file');
const userModalCloseElement = document.querySelector('#upload-cancel');
const loadPhotoOverlay = document.querySelector('.img-upload__overlay');
const hashtagsField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const pristine = new Pristine(form, {
  classTo: 'form__field',
  errorTextParent: 'form__field',
  errorTextTag: 'p',
});

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
};

const onMessageEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    hideMessage();
  }
};

const onFormFieldKeydown = (evt) => {
  evt.stopPropagation();
};

const onMessageBlockClick = (evt) => {
  const errorMessage = document.querySelector('.error');
  const successMessage = document.querySelector('.success');
  let prefix = '';

  if (errorMessage) {
    prefix = 'error';
  }

  if (successMessage) {
    prefix = 'success';
  }
  const innerMessageBlock = document.querySelector(`.${prefix}__inner`);

  if (innerMessageBlock.contains(evt.target)) {
    return;
  }

  hideMessage();
};

const clearForm = () => {
  loadPhotoInput.value = '';
  hashtagsField.value = '';
  commentField.value = '';
  pristine.validate();
};

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = value.toLowerCase().trim().split(/\s+/);
  const uniqueHashtags = [];
  const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;

  for (const hashtag of hashtags) {
    if (uniqueHashtags.includes(hashtag)) {
      return false;
    }

    if (!re.test(hashtag)) {
      return false;
    }

    uniqueHashtags.push(hashtag);
  }

  return uniqueHashtags.length <= 5;
};

const validateComment = (value) => isCorrectLength(value, 140);

function openForm() {
  loadPhotoOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  loadFormPhoto();
  initScaleControl();
  initEffects();

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeForm() {
  loadPhotoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearForm();
  clearFormPhoto();
  disposeScaleControl();
  disposeEffects();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

function hideMessage() {
  const errorMessage = document.querySelector('.error');
  const successMessage = document.querySelector('.success');

  if (errorMessage) {
    document.body.removeChild(errorMessage);
  }

  if (successMessage) {
    document.body.removeChild(successMessage);
  }

  document.removeEventListener('keydown', onMessageEscKeydown);
}

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const showSuccessMessage = () => {
  const messageTemplate = document.querySelector('#success').content.querySelector('.success');
  const messageElement = messageTemplate.cloneNode(true);
  const messageButtonElement = messageElement.querySelector('.success__button');

  document.body.appendChild(messageElement);

  messageButtonElement.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  messageElement.addEventListener('click', onMessageBlockClick);
};

const showErrorMessage = () => {
  const messageTemplate = document.querySelector('#error').content.querySelector('.error');
  const messageElement = messageTemplate.cloneNode(true);
  const messageButtonElement = messageElement.querySelector('.error__button');

  document.body.appendChild(messageElement);

  messageButtonElement.addEventListener('click', hideMessage);
  document.addEventListener('keydown', onMessageEscKeydown);
  messageElement.addEventListener('click', onMessageBlockClick);
};

const onSuccessUserFormSend = () => {
  closeForm();
  showSuccessMessage();
};

const onFailUserFormSend = () => {
  closeForm();
  showErrorMessage();
};

const setUserFormSubmit = (onSuccess, onFail) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();

    if (!isValid) {
      return;
    }

    blockSubmitButton();
    sendData(
      () => {
        onSuccess();
        unblockSubmitButton();
      },
      () => {
        onFail();
        unblockSubmitButton();
      },
      new FormData(evt.target),
    );
  });
};

const initForm = () => {
  pristine.addValidator(hashtagsField, validateHashtags,  'Некорректные хештеги');
  pristine.addValidator(commentField, validateComment,  'Длина комментария не более 140 символов');

  hashtagsField.addEventListener('keydown', onFormFieldKeydown);
  commentField.addEventListener('keydown', onFormFieldKeydown);

  loadPhotoInput.addEventListener('change', openForm);

  userModalCloseElement.addEventListener('click', closeForm);
  setUserFormSubmit(onSuccessUserFormSend, onFailUserFormSend);
};

export {initForm};
