// .avatar__write
// .form__item_full-name = .avatar__title
// .form__item_description = .avatar__subtitle
// .popup
// .popup__opened
// .cross
// .form__button

const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close');
const profileForm = document.querySelector('.form');
const avatarEdit = document.querySelector('.avatar__edit');

let fullName = document.querySelector('.form__content_type_full-name');
let description = document.querySelector('.form__content_type_description');
let avatarName = document.querySelector('.avatar__title');
let avatarDescription = document.querySelector('.avatar__subtitle');

function openPopup() {
  popup.classList.add('popup_opened');
  fullName.value = avatarName.textContent;
  description.value = avatarDescription.textContent;
}

function leavePopup() {
  popup.classList.add('popup_closed');

  setTimeout(function(){
  popup.classList.remove('popup_opened');
  popup.classList.remove('popup_closed');
  }, 500)
}

function formSubmit (evt) {
  evt.preventDefault();
  if(popup.querySelector('.form__heading').textContent == 'Редактировать профиль'){
    avatarName.textContent = fullName.value;
    avatarDescription.textContent = description.value;
    leavePopup();
  }
  else {
    const element =
    {
      name: cardName = fullName.value,
      link: cardLink = description.value
    }

    initialCards.unshift({
      name: cardName = fullName.value,
      link: cardLink = description.value
    });

    renderCard(element);
    leavePopup();
  }


}

avatarEdit.addEventListener('click', openPopup);
closePopup.addEventListener('click', leavePopup);
profileForm.addEventListener('submit', formSubmit);


const initialCards = [
  {
    name: 'Кинкаку-дзи',
    link: 'https://images.unsplash.com/photo-1675384201055-a5d68374fb7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  },
  {
    name: 'Уиндермир',
    link: 'https://images.unsplash.com/photo-1674468391816-c99157eb212e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=382&q=80'
  },
  {
    name: 'Мон-Фалер, Италия',
    link: 'https://images.unsplash.com/photo-1675191475318-d2bf6bad1200?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80'
  },
  {
    name: 'Плотина Гувера, США',
    link: 'https://images.unsplash.com/photo-1674973188795-d692174fff62?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Сан-Франциско, США',
    link: 'https://images.unsplash.com/photo-1661206444414-d440660c9ff0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  },
  {
    name: 'Озеро Морейн, Канада',
    link: 'https://images.unsplash.com/photo-1536637706725-c96e8837df7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
  }
];

const cardsContainer = document.querySelector('.cards');

const createCard = (element) => {

    // карточка
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);

    cardElement.querySelector('.card__image').src = element.link;
    cardElement.querySelector('.card__image').alt = element.name;
    cardElement.querySelector('.card__title').textContent = element.name;

    // сердечко
    cardElement.querySelector('.card__heart').addEventListener('click', function (evt) {
      evt.target.classList.toggle('card__heart_active');
    });

    // удаление карточки
    cardElement.querySelector('.card__trash').addEventListener('click', () => {
    cardElement.remove();
    })

    // открытие попапа с фотокарточкой
    cardElement.querySelector('.card__image').addEventListener('click', function(evt){
      const popupImg = document.querySelector('.popupImg');
      const closePopupImg = document.querySelector('.popupImg__close');

      document.querySelector('.popupImg__photo').src = cardElement.querySelector('.card__image').src;
      document.querySelector('.popupImg__text').textContent = cardElement.querySelector('.card__title').textContent;
      popupImg.classList.add('popupImg_opened');

    // закрытие попапа с фотокарточкой
      closePopupImg.addEventListener('click', function(){
        popupImg.classList.remove('popupImg_opened');
      })
    })

  return cardElement;
}

// добавление 1ой карточки на страницу
const renderCard = (element) => {
  cardsContainer.prepend(createCard(element));
}

cardsContainer.append(...initialCards.map((element) => {
  return createCard(element);
}))


function openAddPopup(){
  popup.classList.add('popup_opened');
  popup.querySelector('.form__heading').textContent = 'Новое место';
  fullName.value = '';
  fullName.placeholder = 'Картинка';
  description.value = '';
  description.placeholder = 'Ссылка на картинку';
}

const addButton = document.querySelector('.add-button');
addButton.addEventListener('click', openAddPopup);
