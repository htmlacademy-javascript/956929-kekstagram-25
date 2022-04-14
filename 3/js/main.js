const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Валентин',
  'Глеб',
  'Дима',
  'Никита',
  'Анастасия',
  'Екатерина',
  'Степан',
  'Пётр',
  'Виктория',
  'Ксения',
  'Ольга',
  'Джон',
  'Джек',
  'Андрей',
  'Полина'
];

const POST_MIN_LIKES = 15;
const POST_MAX_LIKES = 200;
const AVATAR_MIN_ID = 1;
const AVATAR_MAX_ID = 6;
const COMMENT_MIN_COUNT = 1;
const COMMENT_MAX_COUNT = 5;
const COMMENT_ID_START = 10;
const COMMENT_ID_STEP = 5;


function random (a, b) {
  const down = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const up = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (up - down + 1) + down;
  return Math.floor(result);
}

const getRandom = (elements) => {
  return elements[random(0, elements.length - 1)];
};

const generateIntId = function (start = 0, maxStep = 1) {
  let id = start;
  const minStep = 1;
  return () => {
    id += random(minStep, maxStep);
    return id;
  };
};

const getCommentNextId = generateIntId (COMMENT_ID_START, COMMENT_ID_STEP);
const shuffleArray = (array) =>  [...array].sort(() => Math.random() - 0.5);

const makeCommentMessage = function () {
  const sentencesMinCount = 1;
  const sentencesMaxCount = 2;
  const sentencesCount = getRandom(sentencesMinCount, sentencesMaxCount);
  return shuffleArray(MESSAGE).slice(0, sentencesCount).join(' ');
};

function makeComment() {
  return {
    id: getCommentNextId(),
    avatar: `img/avatar-${random(AVATAR_MIN_ID, AVATAR_MAX_ID)}.svg`,
    message: makeCommentMessage(),
    name: getRandom(NAMES),
  };
}

const makePost = function (_, index) {
  const id = index + 1;
  return {
    id,
    url: `photos/${id}.jpg`,
    description: 'Новая фотография',
    likes: random(POST_MIN_LIKES, POST_MAX_LIKES),
    comments: Array.from({ length: random(COMMENT_MIN_COUNT, COMMENT_MAX_COUNT) }, makeComment),
  };
};

const posts = Array.from({ length: 25 }, makePost);

console.log(posts);
