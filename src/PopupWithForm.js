import Popup from "./Popup.js";

// Класс попапа-формы
export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
    this._form = this._popup.querySelector(".form");
    this._formInputs = this._form.querySelectorAll(".form__content");
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _getInputValues() {
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

  _handleSubmit(evt) {
    evt.preventDefault();
    this._submitCallback(this._getInputValues());
    this.closePopup();
  }
}
