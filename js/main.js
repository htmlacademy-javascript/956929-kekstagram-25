import './util.js';
import {makePosts} from './data.js';
import {renderPhotos} from './preview.js';
import {initForm} from './user-form.js';

const photos = makePosts();
renderPhotos(photos);
initForm();
