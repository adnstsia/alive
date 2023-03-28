// Импорты из модулей
import initialCards from "./initalCards.js";
// import { popupImage, imagePopupPhoto, imagePopupText } from "./initalCards.js";
import Card from "./Сard.js";
import FormValidator from "./FormValidator.js";
import { config } from "./FormValidator.js";

// Подключение валидации к каждой форме
const forms = Array.from(document.querySelectorAll(config.form));
forms.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
});

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
const popupEditFormButton = popupEdit.querySelector(".form__button");

// Попап ДОБАВЛЕНИЕ КАРТОЧКИ
const popupAdd = document.querySelector(".popup_type_add");
const overlayAdd = popupAdd.querySelector(".overlay");
const popupAddFormContentPlace = popupAdd.querySelector(
  ".form__content_type_full-name"
);
const popupAddFormContentPhoto = popupAdd.querySelector(
  ".form__content_type_description"
);
const popupAddFormButton = popupAdd.querySelector(".form__button");

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

// Деактивация кнопки сабмит
function disableSubmitButton(button) {
  button.disabled = true;
  button.classList.add("form__button_inactive");
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
  disableSubmitButton(popupEditFormButton);
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

  renderCard(element);
  closeAddPopup();

  popupAddFormContentPlace.value = "";
  popupAddFormContentPhoto.value = "";

  disableSubmitButton(popupAddFormButton);
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

popupEditFormButton.addEventListener("click", handleEditFormSubmit);
popupAddFormButton.addEventListener("click", handleAddFormSubmit);

overlayEdit.addEventListener("mousedown", closeEditPopup);
overlayAdd.addEventListener("mousedown", closeAddPopup);
overlayImage.addEventListener("mousedown", closeImagePopup);

// добавление одной карточки на страницу
const renderCard = (item) => {
  const card = new Card(item, "#card");
  cardsContainer.prepend(card.generateCard());
};

// добавление имеющихся в изначальном массиве карточек на страницу
cardsContainer.append(
  ...initialCards.map((item) => {
    const card = new Card(item, "#card");
    const cardElement = card.generateCard();

    return cardElement;
  })
);

// Экспорты
export { popupImage, imagePopupPhoto, imagePopupText };
