// валидация форм
const config = {
  inputErrorClass: "form__content_type_error",
  formInputErrorClassActive: "form__input-error_active",
  formInputErrorClassInactive: "form__button_inactive",
  formSelector: ".form__content",
  formContentForCheck: "form__content",
  formButtonSelector: ".form__button",
  form: ".form"
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.formInputErrorClassActive);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.formInputErrorClassActive);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.formSelector)
  );
  const buttonElement = formElement.querySelector(config.formButtonSelector);

  formElement.addEventListener("input", (evt) => {
    const target = evt.target;
    if (target.classList.contains(config.formContentForCheck)) {
      checkInputValidity(formElement, target, config);
      toggleButtonState(inputList, buttonElement, config);
    }
  });

  toggleButtonState(inputList, buttonElement, config);
};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.form));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => !inputElement.validity.valid);
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(config.formInputErrorClassInactive);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(config.formInputErrorClassInactive);
    buttonElement.disabled = false;
  }
};

enableValidation(config);
