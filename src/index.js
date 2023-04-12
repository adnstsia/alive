import './pages/index.css';
// Импорты из модулей
import initialCards from "./initalCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import UserInfo from "./UserInfo.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import Section from "./Section.js";
import { config } from "./FormValidator.js";

// НУЖНЫЕ ДЛЯ РАБОТЫ ПЕРЕМЕННЫЕ + СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ

// Для выбора форм для валидации
const formValidators = {};

// Контейнер с карточками
const cardsContainer = document.querySelector(".cards");

// Попап ~Картинка + описание~
const popupElementImage = document.querySelector(".popup_type_image");
const imagePopupPhoto = popupElementImage.querySelector(".popup__photo");
const imagePopupText = popupElementImage.querySelector(".popup__text");
const overlayImage = popupElementImage.querySelector(".overlay");
const popupImage = new PopupWithImage(
  ".popup_type_image",
  ".popup__photo",
  ".popup__text"
);

//  Попап ~редактирование~
const popupEdit = new PopupWithForm(".popup_type_edit", handleEditFormSubmit);
const popupEditElement = document.querySelector(".popup_type_edit");
const buttonOpenEditCard = document.querySelector(".avatar__edit");
const overlayEdit = popupEditElement.querySelector(".overlay");
const formContentFullName = popupEditElement.querySelector(
  ".form__content_type_full-name"
);
const formContentDescription = popupEditElement.querySelector(
  ".form__content_type_description"
);

// Попап ~добавление карточки~
const popupAdd = new PopupWithForm(".popup_type_add", handleAddFormSubmit);
const popupAddElement = document.querySelector(".popup_type_add");
const overlayAdd = popupAddElement.querySelector(".overlay");
const popupAddFormContentPlace = popupAddElement.querySelector(
  ".form__content_type_full-name"
);
const popupAddFormContentPhoto = popupAddElement.querySelector(
  ".form__content_type_description"
);
const buttonOpenAddCard = document.querySelector(".add-button");

// СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ + ФУНКЦИИ, В КОТОРЫХ ПРОИСХОДИТ СОЗДАНИЕ ЭКЗЕМПЛЯРОВ КЛАССОВ, ИХ ИСПОЛЬЗОВАНИЕ

// Создание карточки
const createCard = (item) => {
  const card = new Card(item, "#card", (src, alt, text) => {
    imagePopupPhoto.src = src;
    imagePopupPhoto.alt = alt;
    imagePopupText.textContent = text;
    popupImage.openPopup(src, alt);
  });
  const cardElement = card.generateCard();

  return cardElement;
};

// Хранение информации о пользователе
let userInfo = new UserInfo({
  nameSelector: ".avatar__title",
  infoSelector: ".avatar__subtitle",
});
let user = userInfo.getUserInfo();

// Отрисовка элементов
const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  cardsContainer
);
section.renderItems();

// Включение валидации
function enableValidations(config) {
  const forms = Array.from(document.querySelectorAll(config.form));

  forms.forEach((formElement) => {
    const validator = new FormValidator(formElement, config);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
}
enableValidations(config);

// Закрытие попапа ~картинка+описание~
const closeImagePopup = () => {
  popupImage.closePopup();
};

// Открытие попапа ~редактирование~
const openEditPopup = () => {
  formContentFullName.value = user.name;
  formContentDescription.value = user.info;

  popupEdit.setEventListeners();
  popupEdit.openPopup();
};

// Сабмит попапа ~редактирование~
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  userInfo.setUserInfo({
    name: formContentFullName.value,
    info: formContentDescription.value,
  });

  closeEditPopup();
  const newUser = userInfo.getUserInfo();
  user.name = newUser.name;
  user.info = newUser.info;

  formValidators["edit-form"].resetValidation();
}

// Закрытие попапа ~редактирование~
const closeEditPopup = () => {
  popupEdit.closePopup();
};

// Сабмит попапа ~добавление карточки~
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = createCard({
    name: popupAddFormContentPlace.value,
    link: popupAddFormContentPhoto.value,
  });
  section.addItem(newCard);
  closeAddPopup();

  evt.target.reset();

  formValidators["add-form"].resetValidation();
}

// Открытие попапа ~добавление карточки~
const openAddPopup = () => {
  popupAdd.setEventListeners();
  popupAdd.openPopup();
};

// Закрытие попапа ~добавление карточки~
const closeAddPopup = () => {
  popupAdd.closePopup();
};

// СЛУШАТЕЛИ
buttonOpenEditCard.addEventListener("click", openEditPopup);
buttonOpenAddCard.addEventListener("click", openAddPopup);

overlayEdit.addEventListener("mousedown", closeEditPopup);
overlayAdd.addEventListener("mousedown", closeAddPopup);
overlayImage.addEventListener("mousedown", closeImagePopup);

popupEditElement
  .querySelector(".form")
  .addEventListener("submit", handleEditFormSubmit);
popupAddElement
  .querySelector(".form")
  .addEventListener("submit", handleAddFormSubmit);

// ЭКСПОРТЫ
export { popupImage, imagePopupPhoto, imagePopupText };
