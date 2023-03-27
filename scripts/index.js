const config = {
  inputErrorClass: "form__content_type_error",
  formInputErrorClassActive: "form__input-error_active",
  formInputErrorClassInactive: "form__button_inactive",
  formSelector: ".form__content",
  formContentForCheck: "form__content",
  formButtonSelector: ".form__button",
  form: ".form",
};

// валидация форм
class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
    this._inputList = Array.from(
      this._formElement.querySelectorAll(this._config.formSelector)
    );
    this._buttonElement = this._formElement.querySelector(
      this._config.formButtonSelector
    );
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.formInputErrorClassActive);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-error`
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.formInputErrorClassActive);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => !inputElement.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._buttonElement.classList.add(
        this._config.formInputErrorClassInactive
      );
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(
        this._config.formInputErrorClassInactive
      );
      this._buttonElement.disabled = false;
    }
  }

  _setEventListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._formElement.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}

const forms = Array.from(document.querySelectorAll(config.form));
forms.forEach((formElement) => {
  const formValidator = new FormValidator(config, formElement);
  formValidator.enableValidation();
});

// Массив карточек
const initialCards = [
  {
    name: "Кинкаку-дзи",
    link: "https://images.unsplash.com/photo-1675384201055-a5d68374fb7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80",
  },
  {
    name: "Уиндермир",
    link: "https://images.unsplash.com/photo-1674468391816-c99157eb212e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=382&q=80",
  },

  {
    name: "Мон-Фалер, Италия",

    link: "https://images.unsplash.com/photo-1675191475318-d2bf6bad1200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80",
  },
  {
    name: "Плотина Гувера, США",
    link: "https://images.unsplash.com/photo-1674973188795-d692174fff62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Сан-Франциско, США",
    link: "https://images.unsplash.com/photo-1661206444414-d440660c9ff0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80",
  },
  {
    name: "Озеро Морейн, Канада",
    link: "https://images.unsplash.com/photo-1536637706725-c96e8837df7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80",
  },
];

const buttonOpenAddCard = document.querySelector(".add-button");
const cardsContainer = document.querySelector(".cards");
const avatarName = document.querySelector(".avatar__title");
const avatarDescription = document.querySelector(".avatar__subtitle");
const popup = document.querySelector(".popup");

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
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
  document.addEventListener("keydown", closeByEsc);
}

// закрытие попапа
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

  // const formValidator = new FormValidator(config, popupEdit);
  // formValidator.enableValidation();

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

// создание карточки
// const createCard = (cardData) => {
//   // карточка
//   const cardElement = cardForClone.cloneNode(true);

//   const cardImage = cardElement.querySelector(".card__image");
//   const cardTitle = cardElement.querySelector(".card__title");
//   cardImage.src = cardData.link;
//   cardImage.alt = cardData.name;
//   cardTitle.textContent = cardData.name;

//   // сердечко
//   cardElement
//     .querySelector(".card__heart")
//     .addEventListener("click", function (evt) {
//       evt.target.classList.toggle("card__heart_active");
//     });

//   // удаление карточки
//   cardElement.querySelector(".card__trash").addEventListener("click", () => {
//     cardElement.remove();
//   });

//   // открытие попапа с фотокарточкой
//   cardImage.addEventListener("click", function () {
//     imagePopupPhoto.src = cardImage.src;
//     imagePopupText.textContent = cardTitle.textContent;
//     imagePopupPhoto.alt = cardTitle.textContent;
//     openPopup(popupImage);
//   });

//   return cardElement;
// };

class Card {
  constructor(cardData, cardTemplate) {
    this._src = cardData.link;
    this._alt = cardData.name;
    this._textContent = cardData.name;

    this._cardTemplate = cardTemplate;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners = () => {
    this._cardHeart();
    this._cardRemove();
    this._cardOpen();
  };

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners(); // вызовите _setEventListeners

    this._element.querySelector(".card__image").src = this._src;
    imagePopupPhoto.src = this._element.querySelector(".card__image").src;
    this._element.querySelector(".card__image").alt = this._alt;
    this._element.querySelector(".card__title").textContent = this._textContent;
    imagePopupText.textContent =
      this._element.querySelector(".card__title").textContent;
    imagePopupPhoto.alt =
      this._element.querySelector(".card__title").textContent;
    return this._element;
  }

  // сердечко
  _cardHeart = () => {
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__heart_active");
      });
  };

  // удаление карточки
  _cardRemove = () => {
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._element.remove();
      });
  };

  // открытие попапа с фотокарточкой
  _cardOpen = () => {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", function () {
        openPopup(popupImage);
      });
  };
}

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
