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
