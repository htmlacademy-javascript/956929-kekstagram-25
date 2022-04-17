const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const loadFormPhoto = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const src = URL.createObjectURL(file);
    preview.src = src;
    effectsPreview.forEach((effectPreview) => {
      effectPreview.style.backgroundImage = `url(${src})`;
    });
  }
};

const clearFormPhoto = () => {
  preview.src = '';
  effectsPreview.forEach((effectPreview) => {
    effectPreview.style.backgroundImage = '';
  });
};

export {loadFormPhoto, clearFormPhoto};
