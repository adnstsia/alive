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

let fullName = document.querySelector('.form__content_type_full-name');
let description = document.querySelector('.form__content_type_description');
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
  if(popup.querySelector('.form__heading').textContent == 'Редактировать профиль'){
    evt.preventDefault();
    avatarName.textContent = fullName.value;
    avatarDescription.textContent = description.value;
    leavePopup();
  }
  else
  leavePopup();
}

avatarEdit.addEventListener('click', openPopup);
closePopup.addEventListener('click', leavePopup);
profileForm.addEventListener('submit', formSubmit);

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach(function(element){
  const cardsContainer = document.querySelector('.cards');
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  cardElement.querySelector('.card__title').textContent = element.name;

  cardElement.querySelector('.card__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__heart_active');
  });

  cardsContainer.append(cardElement);
})

function openAddPopup(){
  popup.classList.add('popup_opened');
  popup.querySelector('.form__heading').textContent = 'Новое место';
  fullName.value = 'Картинка';
  fullName.placeholder = 'Картинка';
  description.value = 'Ссылка на картинку';
  description.placeholder = 'Ссылка на картинку';
}

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', openAddPopup);

// like.addEventListener('click', function(){
//   const cardElement = cardTemplate.querySelector('.card')
//   cardElement.querySelector('.card__heart').target.classList.add('.card__heart_active');
// })

// const cardsContainer = document.querySelector('.cards');
// const cardElement = cardsContainer.querySelector('.card');
// const like = cardsContainer.querySelector('.card__heart');
// function likeButton(){
//   like.classList.add('.card__heart_active');
//   console.log('bla bla bla');
// }

// like.addEventListener('click', likeButton);
