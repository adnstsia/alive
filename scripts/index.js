// .avatar__write
// .form__item_full-name = .avatar__title
// .form__item_description = .avatar__subtitle
// .popup
// .popup__opened
// .cross
// .form__button

const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');
const profileForm = document.querySelector('.form');
const avatarEdit = document.querySelector('.avatar__edit');

let fullName = document.querySelector('.form__content_full-name');
let description = document.querySelector('.form__content_description');
let avatarName = document.querySelector('.avatar__title');
let avatarDescription = document.querySelector('.avatar__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  fullName.value = avatarName.textContent;
  description.value = avatarDescription.textContent;
}

function leavePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmit (evt) {
  evt.preventDefault();
  avatarName.textContent = fullName.value;
  avatarDescription.textContent = description.value;
  leavePopup();
}

avatarEdit.addEventListener('click', openPopup);
closePopup.addEventListener('click', leavePopup);
profileForm.addEventListener('submit', formSubmit);
