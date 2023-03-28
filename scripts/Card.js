// Импорты из модулей
import { popupImage, imagePopupPhoto, imagePopupText } from "./index.js";
import openPopup from "./index.js";

// Класс создания карточки
export default class Card {
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

  // поставить сердечко
  _putLike = () => {
    this._element
      .querySelector(".card__heart")
      .addEventListener("click", function (evt) {
        evt.target.classList.toggle("card__heart_active");
      });
  };

  // удаление карточки
  _removeCard = () => {
    this._element
      .querySelector(".card__trash")
      .addEventListener("click", () => {
        this._element.remove();
      });
  };

  // открытие попапа с фотокарточкой
  _openCard = () => {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        imagePopupPhoto.src = this._src;
        imagePopupPhoto.alt = this._alt;
        imagePopupText.textContent = this._textContent;
        openPopup(popupImage);
      });
  };
}
