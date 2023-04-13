import "./index.css";
// Импорты из модулей
import initialCards from "../initalCards.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PicturePopup from "../components/PicturePopup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import Section from "../components/Section.js";
import { config } from "../components/FormValidator.js";

// Для выбора форм для валидации
const formValidators = {};

// Контейнер с карточками
const cardsContainer = document.querySelector(".cards");

// Попап ~Картинка + описание~
const popupElementImage = document.querySelector(".popup_type_image");
const imagePopupPhoto = popupElementImage.querySelector(".popup__photo");
const imagePopupText = popupElementImage.querySelector(".popup__text");
const overlayImage = popupElementImage.querySelector(".overlay");
const popupImage = new PicturePopup(
  ".popup_type_image",
  ".popup__photo",
  ".popup__text"
);

//  Попап ~редактирование~
const popupEditElement = document.querySelector(".popup_type_edit");
const buttonOpenEditCard = document.querySelector(".avatar__edit");
const overlayEdit = popupEditElement.querySelector(".overlay");
const formContentFullName = popupEditElement.querySelector(
  ".form__content_type_full-name"
);
const formContentDescription = popupEditElement.querySelector(
  ".form__content_type_description"
);

// Хранение информации о пользователе
let userInfo = new UserInfo({
  nameSelector: ".avatar__title",
  infoSelector: ".avatar__subtitle",
});

// Сабмит попапа ~редактирование~
function handleEditFormSubmit(event) {
  if (event.defaultPrevented) return;

  userInfo.setUserInfo({
    name: formContentFullName.value,
    info: formContentDescription.value,
  });

  closeEditPopup();
  formValidators["edit-form"].resetValidation();

  // Остановка действия по умолчанию после выполнения функции
  event.defaultPrevented = true;
  return false;
}

const popupEdit = new PopupWithForm(".popup_type_edit", handleEditFormSubmit);

// Попап ~добавление карточки~
const popupAddElement = document.querySelector(".popup_type_add");
const overlayAdd = popupAddElement.querySelector(".overlay");
const popupAddFormContentPlace = popupAddElement.querySelector(
  ".form__content_type_full-name"
);
const popupAddFormContentPhoto = popupAddElement.querySelector(
  ".form__content_type_description"
);
const buttonOpenAddCard = document.querySelector(".add-button");

function handleAddFormSubmit() {
  const newCard = createCard({
    name: popupAddFormContentPlace.value,
    link: popupAddFormContentPhoto.value,
  });
  section.addItem(newCard);
  closeAddPopup();

  popupAddElement.querySelector(".form").reset();

  formValidators["add-form"].resetValidation();
}

const popupAdd = new PopupWithForm(".popup_type_add", handleAddFormSubmit);

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

// Отрисовка элементов
const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  cardsContainer
);
section.renderItems();

// Функция включение валидации
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
  formContentFullName.value = userInfo.getUserInfo().name;
  formContentDescription.value = userInfo.getUserInfo().info;

  popupEdit.setEventListeners();
  popupEdit.openPopup();
};

// Закрытие попапа ~редактирование~
const closeEditPopup = () => {
  popupEdit.closePopup();
};

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

// ЭКСПОРТЫ
export { popupImage, imagePopupPhoto, imagePopupText };
