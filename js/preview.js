import {openUserModal} from './user-modal.js';
import {random} from './util.js';

const picturesBlock = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
let imagesCount = 25;

const sortPhotos = (photoA, photoB) => {
  const activeFilter = document.querySelector('.img-filters__button--active').id;
  imagesCount = 25;

  switch (activeFilter) {
    case 'filter-discussed':
      return photoB.comments.length - photoA.comments.length;
    case 'filter-random':
      imagesCount = 10;
      return random(1, 10) - random(1, 10);
    case 'filter-default':
    default:
      return 0;
  }
};

const clearPhotos = () => {
  const photos = document.querySelectorAll('.picture');
  photos.forEach((photo) => {
    photo.parentNode.removeChild(photo);
  });
};

const renderPhotos = (photos) => {
  clearPhotos();
  const picturesBlockFragment = document.createDocumentFragment();

  photos
    .slice()
    .sort(sortPhotos)
    .slice(0, imagesCount)
    .forEach((photo) => {
      const {url, likes, comments} = photo;
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__likes').innerText = likes;
      pictureElement.querySelector('.picture__comments').innerText = comments.length;
      pictureElement.addEventListener('click', () => {
        openUserModal(photo);
      });
      picturesBlockFragment.appendChild(pictureElement);
    });

  picturesBlock.appendChild(picturesBlockFragment);
};

export {renderPhotos};
