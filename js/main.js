import {renderPhotos} from './preview.js';
import {initForm} from './user-form.js';
import {getData} from './api.js';
import {showAlert, debounce} from './util.js';
import {initFilters, setFilterUpdate} from './filter.js';

const RERENDER_DELAY = 500;

getData((photos) => {
  renderPhotos(photos);
  initFilters();
  setFilterUpdate(debounce(
    () => renderPhotos(photos),
    RERENDER_DELAY,
  ));
}, showAlert);
initForm();
