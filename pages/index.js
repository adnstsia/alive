// Array of initial cards
const initialCards = [
  {
    name: "Clouds",
    link: "https://i.pinimg.com/474x/45/a5/3e/45a53ec76708d9fd6152b07b5d067132.jpg",
  },
  {
    name: "Vietnamese cuisine",
    link: "https://i.pinimg.com/474x/e0/a9/13/e0a9136ebbda250de37ccd01cfa59b24.jpg",
  },
  {
    name: "Skate season",
    link: "https://i.pinimg.com/736x/a7/fe/ac/a7feacff43479d0a77b834d3aaa24871.jpg",
  },
  {
    name: "Gingerbreads",
    link: "https://i.pinimg.com/474x/b5/1f/da/b51fda9e056629f88b137e5baaf9f966.jpg",
  },
  {
    name: "funny socks",
    link: "https://i.pinimg.com/474x/c3/39/fc/c339fc84cdc64e3eddd6135cc8104e5d.jpg",
  },
  {
    name: "Snowflakes!!",
    link: "https://i.pinimg.com/736x/56/fe/e5/56fee5755fd05b99e1c0db6712ac458c.jpg",
  },
  {
    name: "Armenia",
    link: "https://i.pinimg.com/474x/0b/6e/79/0b6e7993a4b600486cb59618b59abd8f.jpg",
  },
  {
    name: "green-yellow-red",
    link: "https://i.pinimg.com/474x/46/cb/67/46cb67c41b4b5cf7fdfef2e8ec29df32.jpg",
  },
  {
    name: "refill station",
    link: "https://i.pinimg.com/564x/86/e3/fc/86e3fcd51f5ed17a0af5d17ca5d55f2d.jpg",
  },
];

// Card creation class
class Card {
  constructor(cardData, cardTemplate, handleCardClick) {
    this._src = cardData.link;
    this._alt = cardData.name;
    this._textContent = cardData.name;

    this._cardTemplate = cardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content.querySelector(".card")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners = () => {
    this._putLike();
    this._removeCard();
    this._openCard();
  };

  generateCard() {
    this._element = this._getTemplate();

    this._cardImage = this._element.querySelector(".card__image");

    this._cardImage.src = this._src;
    this._cardImage.alt = this._alt;
    this._element.querySelector(".card__title").textContent = this._textContent;

    this._setEventListeners();

    return this._element;
  }

  // Like functionality
  _putLike = () => {
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__heart_active");
      });
  };

  // Card removal
  _removeCard = () => {
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._element.remove();
      });
  };

  // Popup opening with card image
  _openCard = () => {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._src, this._alt, this._textContent);
    });
  };
}

const config = {
  inputErrorClass: "form__content_type_error",
  formInputErrorClassActive: "form__input-error_active",
  formInputErrorClassInactive: "form__button_inactive",
  formSelector: ".form__content",
  formContentForCheck: "form__content",
  formButtonSelector: ".form__button",
  form: ".form",
};

// Form validation class
class FormValidator {
  constructor(formElement, config) {
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

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
  }
}

// Popup opening-closing class
class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  openPopup() {
    this._popup.classList.add("popup_opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  closePopup() {
    this._popup.classList.add("popup_closed");
    document.removeEventListener("keydown", this._handleEscClose);
    setTimeout(() => {
      this._popup.classList.remove("popup_opened");
      this._popup.classList.remove("popup_closed");
    }, 500);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  }

  setEventListeners() {
    this._popup.querySelector(".popup__close").addEventListener("click", () => {
      this.closePopup();
    });
    this._popup.querySelector(".overlay").addEventListener("click", () => {
      this.closePopup();
    });
  }
}

// Popup with picture class
class PicturePopup extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  openPopup(imageSrc, imageCaption) {
    this._image.src = imageSrc;
    this._image.alt = imageCaption;
    this._caption.textContent = imageCaption;
    super.openPopup();
  }
}

// Popup with form class
class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".form");
    this._formInputs = this._form.querySelectorAll(".form__content");
    this._handleSubmit = () => {
      this._handleFormSubmit();
    };
  }

  getInputValues() {
    const values = {};
    this._formInputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._handleSubmit);
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }

  _handleFormSubmit() {
    const formData = this.getInputValues();
    this._submitCallback(formData);
    this.closePopup();
  }
}

// Section rendering class
class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._items.forEach((item) => {
      const renderedItem = this._renderer(item);
      this.addItem(renderedItem);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

// User info display class
class UserInfo {
  constructor({ nameSelector, infoSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._infoElement = document.querySelector(infoSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      info: this._infoElement.textContent,
    };
  }

  setUserInfo({ name, info }) {
    this._nameElement.textContent = name;
    this._infoElement.textContent = info;
  }
}

// For selecting forms for validation
const formValidators = {};

// Cards container
const cardsContainer = document.querySelector(".cards");

// Popup ~Image + description~
const popupElementImage = document.querySelector(".popup_type_image");
const imagePopupPhoto = popupElementImage.querySelector(".popup__photo");
const imagePopupText = popupElementImage.querySelector(".popup__text");
const popupImage = new PicturePopup(
  ".popup_type_image",
  ".popup__photo",
  ".popup__text"
);
popupImage.setEventListeners();

// Popup ~edit~
const popupEditElement = document.querySelector(".popup_type_edit");
const buttonOpenEditCard = document.querySelector(".avatar__edit");
const formContentFullName = popupEditElement.querySelector(
  ".form__content_type_full-name"
);
const formContentDescription = popupEditElement.querySelector(
  ".form__content_type_description"
);

// User info storage
const userInfo = new UserInfo({
  nameSelector: ".avatar__title",
  infoSelector: ".avatar__subtitle",
});

const popupEdit = new PopupWithForm(".popup_type_edit", () => {
  const { name, description } = popupEdit.getInputValues();
  console.log(popupEdit.getInputValues());
  userInfo.setUserInfo({
    name: name,
    info: description,
  });

  closeEditPopup();
  console.log(userInfo.getUserInfo());
});
popupEdit.setEventListeners();

// Popup ~add card~
const buttonOpenAddCard = document.querySelector(".add-button");

const popupAdd = new PopupWithForm(".popup_type_add", () => {
  const { photoLink, placeName } = popupAdd.getInputValues();
  const newCard = createCard({
    name: placeName,
    link: photoLink,
  });

  section.addItem(newCard);

  closeAddPopup();
});
popupAdd.setEventListeners();

// Card creation
const createCard = (item) => {
  const card = new Card(item, "#card", (src, alt) => {
    popupImage.openPopup(src, alt);
  });
  const cardElement = card.generateCard();

  return cardElement;
};

// Rendering elements
const section = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  cardsContainer
);
section.renderItems();

// Validation enable function
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

// Open ~edit~ popup
const openEditPopup = () => {
  const { name, info } = userInfo.getUserInfo();
  formValidators["edit-form"].resetValidation();

  formContentFullName.value = name;
  formContentDescription.value = info;

  popupEdit.openPopup();
};

// Close ~edit~ popup
const closeEditPopup = () => {
  popupEdit.closePopup();
};

// Open ~add card~ popup
const openAddPopup = () => {
  formValidators["add-form"].resetValidation();

  popupAdd.openPopup();
};

// Close ~add card~ popup
const closeAddPopup = () => {
  popupAdd.closePopup();
};

// Listeners
buttonOpenEditCard.addEventListener("click", openEditPopup);
buttonOpenAddCard.addEventListener("click", openAddPopup);
