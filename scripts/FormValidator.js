export const config = {
  inputErrorClass: "form__content_type_error",
  formInputErrorClassActive: "form__input-error_active",
  formInputErrorClassInactive: "form__button_inactive",
  formSelector: ".form__content",
  formContentForCheck: "form__content",
  formButtonSelector: ".form__button",
  form: ".form",
};

// Класс валидации форм
export default class FormValidator {
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
