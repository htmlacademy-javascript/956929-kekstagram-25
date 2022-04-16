import {isCorrectLength, isEscapeKey} from './util.js';

const form = document.querySelector('#upload-select-image');
const loadPhotoInput = document.querySelector('#upload-file');
const userModalCloseElement = document.querySelector('#upload-cancel');
const loadPhotoOverlay = document.querySelector('.img-upload__overlay');
const hashtagsField = form.querySelector('.text__hashtags');
const commentField = form.querySelector('.text__description');

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

const onFormFieldKeydown = (evt) => {
  evt.stopPropagation();
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

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeForm() {
  loadPhotoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearForm();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

const initForm = () => {
  pristine.addValidator(hashtagsField, validateHashtags,  'Некорректные хештеги');
  pristine.addValidator(commentField, validateComment,  'Длина комментария не более 140 символов');

  hashtagsField.addEventListener('keydown', onFormFieldKeydown);
  commentField.addEventListener('keydown', onFormFieldKeydown);

  loadPhotoInput.addEventListener('change', openForm);

  userModalCloseElement.addEventListener('click', closeForm);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
  });
};

export {initForm};
