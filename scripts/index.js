// 1) Нужно?
// 2) Проверка имени на смысл
// 2) Проверка имени на camelCase (с маленькой!!)

const profileForm = document.querySelector('.form');
const buttonOpenEditCard = document.querySelector('.avatar__edit');
const buttonOpenAddCard = document.querySelector('.add-button');
const cardsContainer = document.querySelector('.cards');
const popupTemplate = document.querySelector('#popup').content;
const page = document.querySelector('.page');

let avatarName = document.querySelector('.avatar__title');
let avatarDescription = document.querySelector('.avatar__subtitle');


// открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add('popup_opened');
}


// закрытие попапа
function closePopup(popupElement) {
  popupElement.classList.add('popup_closed');

  setTimeout(function () {
    popupElement.classList.remove('popup_opened');
    popupElement.classList.remove('popup_closed');
  }, 500)
}


// создание попапа РЕДАКТИРОВАНИЕ
const editPopup = popupTemplate.querySelector('.popup').cloneNode(true);
editPopup.classList.add('popup_type_edit');
page.append(editPopup);

const editPopupContainer = editPopup.querySelector('.popup__container');
editPopupContainer.classList.add('popup__container_type_edit')

const popupEditForm = document.createElement('form');
popupEditForm.classList.add('form');

const formHeading = document.createElement('h2');
formHeading.classList.add('form__heading');
formHeading.textContent = 'Редактировать профиль';

const formContentFullName = document.createElement('input');
formContentFullName.classList.add('form__content');
formContentFullName.classList.add('form__content_type_full-name');
formContentFullName.value = avatarName.textContent;
formContentFullName.id = 'name';
formContentFullName.name = 'name';
formContentFullName.placeholder = '';
formContentFullName.required = true;

const formContentDescription = document.createElement('input');
formContentDescription.classList.add('form__content');
formContentDescription.classList.add('form__content_type_description');
formContentDescription.value = avatarDescription.textContent;
formContentDescription.id = 'description';
formContentDescription.name = 'description';
formContentDescription.placeholder = '';
formContentDescription.required = true;

const formButton = document.createElement('button');
formButton.classList.add('form__button');
formButton.textContent = 'Сохранить';

popupEditForm.append(formHeading, formContentFullName, formContentDescription, formButton);
editPopupContainer.append(popupEditForm);
console.log(editPopup);


// открытие попапа РЕДАКТИРОВАНИЕ
const openEditPopup = () => {
  return openPopup(editPopup);
}


// закрытие попапа РЕДАКТИРОВАНИЕ
const closeEditPopup = () => {
  return closePopup(editPopup);
}


// сабмит попапа РЕДАКТИРОВАНИЕ
function handleEditFormSubmit(evt) {
  evt.preventDefault();
    avatarName.textContent = formContentFullName.value;
    avatarDescription.textContent = formContentDescription.value;
    closeEditPopup();
}


// создание попапа ДОБАВЛЕНИЕ КАРТОЧКИ
const addPopup = popupTemplate.querySelector('.popup').cloneNode(true);
addPopup.classList.add('popup_type_add');
page.append(addPopup);
console.log(addPopup);

const addPopupContainer = addPopup.querySelector('.popup__container');
addPopupContainer.classList.add('popup__container_type_add')

const popupAddForm = document.createElement('form');
popupAddForm.classList.add('form');

const addFormHeading = document.createElement('h2');
addFormHeading.classList.add('form__heading');
addFormHeading.textContent = 'Новое место';

const addFormContentPlace = document.createElement('input');
addFormContentPlace.classList.add('form__content');
addFormContentPlace.classList.add('form__content_type_full-name');
addFormContentPlace.value = '';
addFormContentPlace.id = 'name';
addFormContentPlace.name = 'name';
addFormContentPlace.placeholder = 'Название';
addFormContentPlace.required = true;

const addFormContentPhoto = document.createElement('input');
addFormContentPhoto.classList.add('form__content');
addFormContentPhoto.classList.add('form__content_type_description');
addFormContentPhoto.value = '';
addFormContentPhoto.id = 'description';
addFormContentPhoto.name = 'description';
addFormContentPhoto.placeholder = 'Ссылка на картинку';
addFormContentPhoto.required = true;

const addFormButton = document.createElement('button');
addFormButton.classList.add('form__button');
addFormButton.textContent = 'Сохранить';

popupAddForm.append(addFormHeading, addFormContentPhoto, addFormContentPlace, addFormButton);
addPopupContainer.append(popupAddForm);


// открытие попапа ДОБАВЛЕНИЕ КАРТОЧКИ
const openAddPopup = () => {
  return openPopup(addPopup);
}


// закрытие попапа ДОБАВЛЕНИЕ КАРТОЧКИ
const closeAddPopup = () => {
  return closePopup(addPopup);
}


// сабмит попапа ДОБАВЛЕНИЕ КАРТОЧКИ
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const element =
  {
    name: addFormContentPlace.value,
    link: addFormContentPhoto.value
  }

  renderCard(element);
  closeAddPopup();
  addFormContentPlace.value = '';
  addFormContentPhoto.value = '';
}


// создание попапа КАРТИНКА + ОПИСАНИЕ
const imagePopup = popupTemplate.querySelector('.popup').cloneNode(true);
imagePopup.classList.add('popup_type_image');

const imagePopupContainer = imagePopup.querySelector('.popup__container');
imagePopupContainer.classList.add('popup__container_type_image');

page.append(imagePopup);
console.log(imagePopup);

const imagePopupPhoto = document.createElement('img');
imagePopupPhoto.classList.add('popup__photo');
imagePopupPhoto.src = '';
imagePopupPhoto.alt = '';
console.log(imagePopupPhoto.alt);

const imagePopupText = document.createElement('h2');
imagePopupText.classList.add('popup__text');
imagePopupText.textContent = '';

imagePopupContainer.append(imagePopupPhoto, imagePopupText);


// закрытие попапа КАРТИНКА + ОПИСАНИЕ
const closeImagePopup = () => {
  return closePopup(imagePopup);
}


// Листенеры
buttonOpenEditCard.addEventListener('click', openEditPopup);
buttonOpenAddCard.addEventListener('click', openAddPopup);

editPopup.querySelector('.popup__close').addEventListener('click', closeEditPopup);
addPopup.querySelector('.popup__close').addEventListener('click', closeAddPopup);
imagePopup.querySelector('.popup__close').addEventListener('click', closeImagePopup);

formButton.addEventListener('click', handleEditFormSubmit);
addFormButton.addEventListener('click', handleAddFormSubmit);


// Массив карточек
const initialCards = [
  {
    name: 'Кинкаку-дзи',
    link: 'https://images.unsplash.com/photo-1675384201055-a5d68374fb7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'Уиндермир',
    link: 'https://images.unsplash.com/photo-1674468391816-c99157eb212e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=382&q=80'
  },
  {
    name: 'Мон-Фалер, Италия',
    link: 'https://images.unsplash.com/photo-1675191475318-d2bf6bad1200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
  },
  {
    name: 'Плотина Гувера, США',
    link: 'https://images.unsplash.com/photo-1674973188795-d692174fff62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Сан-Франциско, США',
    link: 'https://images.unsplash.com/photo-1661206444414-d440660c9ff0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Озеро Морейн, Канада',
    link: 'https://images.unsplash.com/photo-1536637706725-c96e8837df7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
  }
];


// создание карточки
const createCard = (cardData) => {

  // карточка
  const cardTemplate = document.querySelector('#card').content;
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector('.card__title').textContent = cardData.name;

  // сердечко
  cardElement.querySelector('.card__heart').addEventListener('click', function (evt) {
    evt.target.classList.toggle('card__heart_active');
  });

  // удаление карточки
  cardElement.querySelector('.card__trash').addEventListener('click', () => {
    cardElement.remove();
  })

  // открытие попапа с фотокарточкой
  cardImage.addEventListener('click', function () {

    imagePopupPhoto.src = cardElement.querySelector('.card__image').src;
    imagePopupText.textContent = cardElement.querySelector('.card__title').textContent;
    imagePopupPhoto.alt = cardElement.querySelector('.card__title').textContent;
    openPopup(imagePopup);

})

  return cardElement;
}


// добавление одной карточки на страницу
const renderCard = (cardData) => {
  cardsContainer.prepend(createCard(cardData));
}


// добавление имеющихся в изначальном массиве карточек на страницу
cardsContainer.append(...initialCards.map((cardData) => {
  return createCard(cardData);
}))
