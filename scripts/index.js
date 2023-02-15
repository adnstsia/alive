const buttonOpenEditCard = document.querySelector(".avatar__edit");
const buttonOpenAddCard = document.querySelector(".add-button");
const cardsContainer = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card").content;
const cardForClone = cardTemplate.querySelector(".card");
const avatarName = document.querySelector(".avatar__title");
const avatarDescription = document.querySelector(".avatar__subtitle");

// открытие попапа
function openPopup(popupElement) {
  popupElement.classList.add("popup_opened");
}

// закрытие попапа
function closePopup(popupElement) {
  popupElement.classList.add("popup_closed");

  setTimeout(function () {
    popupElement.classList.remove("popup_opened");
    popupElement.classList.remove("popup_closed");
  }, 500);
}

// Попап РЕДАКТИРОВАНИЕ
const popupEdit = document.querySelector(".popup_type_edit");

const formContentFullName = popupEdit.querySelector(
  ".form__content_type_full-name"
);

const formContentDescription = popupEdit.querySelector(
  ".form__content_type_description"
);

const popupEditFormButton = popupEdit.querySelector(".form__button");

// открытие попапа РЕДАКТИРОВАНИЕ
const openEditPopup = () => {
  formContentFullName.value = avatarName.textContent;
  formContentDescription.value = avatarDescription.textContent;

  return openPopup(popupEdit);
};

// закрытие попапа РЕДАКТИРОВАНИЕ
const closeEditPopup = () => {
  return closePopup(popupEdit);
};

// сабмит попапа РЕДАКТИРОВАНИЕ
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  avatarName.textContent = formContentFullName.value;
  avatarDescription.textContent = formContentDescription.value;

  closeEditPopup();
}

// Попап ДОБАВЛЕНИЕ КАРТОЧКИ
const popupAdd = document.querySelector(".popup_type_add");

const popupAddFormContentPlace = popupAdd.querySelector(
  ".form__content_type_full-name"
);

const popupAddFormContentPhoto = popupAdd.querySelector(
  ".form__content_type_description"
);

const popupAddFormButton = popupAdd.querySelector(".form__button");

// открытие попапа ДОБАВЛЕНИЕ КАРТОЧКИ
const openAddPopup = () => {
  return openPopup(popupAdd);
};

// закрытие попапа ДОБАВЛЕНИЕ КАРТОЧКИ
const closeAddPopup = () => {
  return closePopup(popupAdd);
};

// сабмит попапа ДОБАВЛЕНИЕ КАРТОЧКИ
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
}

// Попап КАРТИНКА + ОПИСАНИЕ
const popupImage = document.querySelector(".popup_type_image");

const imagePopupPhoto = popupImage.querySelector(".popup__photo");

const imagePopupText = popupImage.querySelector(".popup__text");

// закрытие попапа КАРТИНКА + ОПИСАНИЕ
const closeImagePopup = () => {
  return closePopup(popupImage);
};

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

// создание карточки
const createCard = (cardData) => {
  // карточка
  const cardElement = cardForClone.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardElement.querySelector(".card__title").textContent = cardData.name;

  // сердечко
  cardElement
    .querySelector(".card__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("card__heart_active");
    });

  // удаление карточки
  cardElement.querySelector(".card__trash").addEventListener("click", () => {
    cardElement.remove();
  });

  // открытие попапа с фотокарточкой
  cardImage.addEventListener("click", function () {
    imagePopupPhoto.src = cardElement.querySelector(".card__image").src;
    imagePopupText.textContent =
      cardElement.querySelector(".card__title").textContent;
    imagePopupPhoto.alt = cardElement.querySelector(".card__title").textContent;
    openPopup(popupImage);
  });

  return cardElement;
};

// добавление одной карточки на страницу
const renderCard = (cardData) => {
  cardsContainer.prepend(createCard(cardData));
};

// добавление имеющихся в изначальном массиве карточек на страницу
cardsContainer.append(
  ...initialCards.map((cardData) => {
    return createCard(cardData);
  })
);
