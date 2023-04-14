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
const popupImage = new PicturePopup(
  ".popup_type_image",
  ".popup__photo",
  ".popup__text"
);
popupImage.setEventListeners();

//  Попап ~редактирование~
const popupEditElement = document.querySelector(".popup_type_edit");
const buttonOpenEditCard = document.querySelector(".avatar__edit");
const formContentFullName = popupEditElement.querySelector(
  ".form__content_type_full-name"
);
const formContentDescription = popupEditElement.querySelector(
  ".form__content_type_description"
);

// Хранение информации о пользователе
const userInfo = new UserInfo({
  nameSelector: ".avatar__title",
  infoSelector: ".avatar__subtitle",
});

// popupEdit.setEventListeners();
const popupEdit = new PopupWithForm(".popup_type_edit", () => {
  const { name, description } = popupEdit._getInputValues();
  console.log(popupEdit._getInputValues());
  userInfo.setUserInfo({
    name: name,
    info: description,
  });

  closeEditPopup();
  console.log(userInfo.getUserInfo());
});
popupEdit.setEventListeners();

// Попап ~добавление карточки~
const buttonOpenAddCard = document.querySelector(".add-button");

const popupAdd = new PopupWithForm(".popup_type_add", () => {
  const { photoLink, placeName } = popupAdd._getInputValues();
  const newCard = createCard({
    name: placeName,
    link: photoLink,
  });

  section.addItem(newCard);

  closeAddPopup();
});
popupAdd.setEventListeners();

// Создание карточки
const createCard = (item) => {
  const card = new Card(item, "#card", (src, alt) => {
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

// Открытие попапа ~редактирование~
const openEditPopup = () => {
  const { name, info } = userInfo.getUserInfo();
  formValidators["edit-form"].resetValidation();

  formContentFullName.value = name;
  formContentDescription.value = info;

  popupEdit.openPopup();
};

// Закрытие попапа ~редактирование~
const closeEditPopup = () => {
  popupEdit.closePopup();
};

// Открытие попапа ~добавление карточки~
const openAddPopup = () => {
  formValidators["add-form"].resetValidation();

  popupAdd.openPopup();
};

// Закрытие попапа ~добавление карточки~
const closeAddPopup = () => {
  popupAdd.closePopup();
};

// СЛУШАТЕЛИ
buttonOpenEditCard.addEventListener("click", openEditPopup);
buttonOpenAddCard.addEventListener("click", openAddPopup);

// ЭКСПОРТЫ
export { popupImage, imagePopupPhoto, imagePopupText };
