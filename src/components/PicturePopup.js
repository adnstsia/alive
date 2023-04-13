import Popup from "./Popup.js";

// Класс попапа с фото
export default class PicturePopup extends Popup {
  constructor(popupSelector, imageSelector, captionSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(imageSelector);
    this._caption = this._popup.querySelector(captionSelector);
  }

  openPopup(imageSrc, imageCaption) {
    this.setEventListeners();
    this._image.src = imageSrc;
    this._image.alt = imageCaption;
    this._caption.textContent = imageCaption;
    super.openPopup();
  }
}
