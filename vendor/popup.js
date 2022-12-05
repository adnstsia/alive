// .avatar__write
// .form__item_full-name = .avatar__title
// .form__item_description = .avatar__subtitle
// .popup
// .popup__opened
// .cross
// .form__button

const popup = document.querySelector('.popup');
const popupOpened = document.querySelector('.popup__opened');
const cross = document.querySelector('.cross');
const formButton = document.querySelector('.form');

let avatarWrite = document.querySelector('.avatar__write');
let fullName = document.querySelector('.form__item_full-name');
let description = document.querySelector('.form__item_description');
let avatarName = document.querySelector('.avatar__title');
let avatarDescription = document.querySelector('.avatar__subtitle');

function open() {
  popup.classList.add('popup__opened');
  fullName.value = avatarName.textContent;
  description.value = avatarDescription.textContent;
}

function close() {
  popup.classList.remove('popup__opened');
}

function formSubmit (evt) {
  evt.preventDefault();
  avatarName.textContent = fullName.value;
  avatarDescription.textContent = description.value;
  close();
}

avatarWrite.addEventListener('click', open);
cross.addEventListener('click', close);
formButton.addEventListener('submit', formSubmit);
