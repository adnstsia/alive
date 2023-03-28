// Импорты из модулей
import initialCards from "./initalCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { config } from "./FormValidator.js";


const formValidators = {};


// Включение валидации

function enableValidations (config) {

  const forms = Array.from(document.querySelectorAll(config.form));

 forms.forEach((formElement) => {

  const validator = new FormValidator(formElement, config);

  // получаем данные из атрибута `name` у формы
  const formName = formElement.getAttribute("name");

  // вот тут в объект записываем под именем формы
  formValidators[formName] = validator;
  validator.enableValidation();
});
}

enableValidations(config);


// Нужные в работе констаты
const buttonOpenAddCard = document.querySelector(".add-button");
const cardsContainer = document.querySelector(".cards");
const avatarName = document.querySelector(".avatar__title");
const avatarDescription = document.querySelector(".avatar__subtitle");

// Попап РЕДАКТИРОВАНИЕ
const buttonOpenEditCard = document.querySelector(".avatar__edit");
const popupEdit = document.querySelector(".popup_type_edit");
const overlayEdit = popupEdit.querySelector(".overlay");
const formContentFullName = popupEdit.querySelector(
  ".form__content_type_full-name"
);
const formContentDescription = popupEdit.querySelector(
  ".form__content_type_description"
);

// Попап ДОБАВЛЕНИЕ КАРТОЧКИ
const popupAdd = document.querySelector(".popup_type_add");
const overlayAdd = popupAdd.querySelector(".overlay");
const popupAddFormContentPlace = popupAdd.querySelector(
  ".form__content_type_full-name"
);
const popupAddFormContentPhoto = popupAdd.querySelector(
  ".form__content_type_description"
);

// Попап КАРТИНКА + ОПИСАНИЕ
const popupImage = document.querySelector(".popup_type_image");
const imagePopupPhoto = popupImage.querySelector(".popup__photo");
const imagePopupText = popupImage.querySelector(".popup__text");
const overlayImage = popupImage.querySelector(".overlay");

// Открытие попапа
export default function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

// Закрытие попапа
function closePopup(popupElement) {
  popupElement.classList.add("popup_closed");
  document.removeEventListener("keydown", closeByEsc);
  setTimeout(function () {
    popupElement.classList.remove("popup_opened");
    popupElement.classList.remove("popup_closed");
  }, 500);
}


// Раздел попап РЕДАКТИРОВАНИЕ

// Открытие попапа РЕДАКТИРОВАНИЕ
const openEditPopup = () => {
  formContentFullName.value = avatarName.textContent;
  formContentDescription.value = avatarDescription.textContent;

  openPopup(popupEdit);
};

// Закрытие попапа РЕДАКТИРОВАНИЕ
const closeEditPopup = () => {
  closePopup(popupEdit);
};

// Сабмит попапа РЕДАКТИРОВАНИЕ
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  avatarName.textContent = formContentFullName.value;
  avatarDescription.textContent = formContentDescription.value;
  closeEditPopup();

  formValidators['edit-form'].resetValidation();
}

// Раздел попап ДОБАВЛЕНИЕ КАРТОЧКИ

// Открытие попапа ДОБАВЛЕНИЕ КАРТОЧКИ
const openAddPopup = () => {
  openPopup(popupAdd);
};

// Закрытие попапа ДОБАВЛЕНИЕ КАРТОЧКИ
const closeAddPopup = () => {
  closePopup(popupAdd);
};

// Сабмит попапа ДОБАВЛЕНИЕ КАРТОЧКИ
function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const element = {
    name: popupAddFormContentPlace.value,
    link: popupAddFormContentPhoto.value,
  };

  cardsContainer.prepend(createCard(element));
  closeAddPopup();

  evt.target.reset()

  formValidators['add-form'].resetValidation();
}

// Раздел попап КАРТИНКА + ОПИСАНИЕ

// Закрытие попапа КАРТИНКА + ОПИСАНИЕ
const closeImagePopup = () => {
  return closePopup(popupImage);
};

//Закрытие нажатием на esc
function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}

// Листенеры
buttonOpenEditCard.addEventListener("click", openEditPopup);
buttonOpenAddCard.addEventListener("click", openAddPopup);

popupEdit
  .querySelector(".popup__close")
  .addEventListener("click", closeEditPopup);

popupAdd
  .querySelector(".popup__close")
  .addEventListener("click", closeAddPopup);
popupImage
  .querySelector(".popup__close")
  .addEventListener("click", closeImagePopup);

popupEdit.querySelector('.form').addEventListener("submit", handleEditFormSubmit);
popupAdd.querySelector('.form').addEventListener("submit", handleAddFormSubmit);

overlayEdit.addEventListener("mousedown", closeEditPopup);
overlayAdd.addEventListener("mousedown", closeAddPopup);
overlayImage.addEventListener("mousedown", closeImagePopup);

// Создание карточки
const createCard = (item) => {

  const card = new Card(item, "#card");
  const cardElement = card.generateCard();

  return cardElement;
}

// добавление имеющихся в изначальном массиве карточек на страницу
cardsContainer.append(
  ...initialCards.map(createCard)
);

// Экспорты
export { popupImage, imagePopupPhoto, imagePopupText };
