import {isEscapeKey} from './util.js';
import {renderPhoto, clearPhoto} from './photo.js';

const userModalElement = document.querySelector('.big-picture');
const userModalCloseElement = userModalElement.querySelector('.big-picture__cancel');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUserModal();
  }
};

function openUserModal (photo) {
  document.body.classList.add('modal-open');

  userModalElement.classList.remove('hidden');
  renderPhoto(photo);

  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeUserModal() {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearPhoto();

  document.removeEventListener('keydown', onPopupEscKeydown);
}

userModalCloseElement.addEventListener('click', () => {
  closeUserModal();
});

export {openUserModal};
