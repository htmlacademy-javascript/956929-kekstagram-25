const filtersBlock = document.querySelector('.img-filters');
const filterButtons = document.querySelectorAll('.img-filters__button');

const INACTIVE_CLASS = 'img-filters--inactive';
const FILTER_ACTIVE_CLASS = 'img-filters__button--active';

const initFilters = () => {
  if (filtersBlock.classList.contains(INACTIVE_CLASS)) {
    filtersBlock.classList.remove(INACTIVE_CLASS);
  }
};

const setFilterUpdate = (cb) => {
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', (evt) => {
      filterButtons.forEach((item) => item.classList.remove(FILTER_ACTIVE_CLASS));
      evt.target.classList.add(FILTER_ACTIVE_CLASS);
      cb();
    });
  });
};

export {initFilters, setFilterUpdate};
