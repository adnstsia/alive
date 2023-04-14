// Класс открытия-закрытия попапов
export default class Popup {
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







