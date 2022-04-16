const userModalElement = document.querySelector('.big-picture');
const userModalImageElement = userModalElement.querySelector('.big-picture__img img');
const userModalLikesElement = userModalElement.querySelector('.likes-count');
const userModalCommentsElement = userModalElement.querySelector('.comments-count');
const userModalDescriptionElement = userModalElement.querySelector('.social__caption');
const commentsBlock = userModalElement.querySelector('.social__comments');
const commentsCountBlock = userModalElement.querySelector('.comments-count');
const displayCommentsCountBlock = userModalElement.querySelector('.display-comments-count');
const commentsLoader = userModalElement.querySelector('.comments-loader');

const ONCE_LOAD_COMMENTS_COUNT = 5;
let currentCommentsData = [];

const loadComments = () => {
  const currentCommentsCount = commentsBlock.childElementCount;
  let appendHtml = '';

  for (let i = currentCommentsCount; i < currentCommentsCount + ONCE_LOAD_COMMENTS_COUNT; i++) {
    const {avatar, message, name} = currentCommentsData[i];
    const commentElement = `<li class="social__comment"><img class="social__picture" src="${avatar}" alt="${name}" width="35" height="35"> <p class="social__text">${message}</p></li>`;
    appendHtml += commentElement;

    if (i === currentCommentsData.length - 1) {
      commentsLoader.classList.add('hidden');
      break;
    }
  }

  commentsBlock.insertAdjacentHTML('beforeend', appendHtml);
  displayCommentsCountBlock.innerHTML = commentsBlock.childElementCount.toString();
};

const renderPhoto = ({url, likes, comments, description}) => {
  userModalImageElement.src = url;
  userModalLikesElement.innerText = likes;
  userModalCommentsElement.innerText = comments.length;
  userModalDescriptionElement.innerText = description;

  commentsCountBlock.innerHTML = comments.length;
  currentCommentsData = comments;
  commentsLoader.addEventListener('click', loadComments);
  loadComments();
};

const clearPhoto = () => {
  userModalImageElement.src = '';
  userModalLikesElement.innerText = '';
  userModalCommentsElement.innerText = '';
  userModalDescriptionElement.innerText = '';
  commentsBlock.innerHTML = '';
  commentsCountBlock.innerHTML = '';
  displayCommentsCountBlock.innerHTML = '';
  commentsLoader.classList.remove('hidden');
  currentCommentsData = [];
  commentsLoader.removeEventListener('click', loadComments);
};

export {renderPhoto, clearPhoto};
