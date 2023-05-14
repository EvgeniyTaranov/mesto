import { cardTemplate, imagePopup, imagePopupImage, imagePopupTitle, openPopup } from './index.js';

export { initialCards, Card };

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

class Card {
  constructor(initialCards, cardTemplate, handleClick) {
    this._link = initialCards.link;
    this._name = initialCards.name;
    this._cardTemplate = cardTemplate;
    this._handleClick = handleClick;
    this._imagePopupImage = null;
    this._likeButton = null;
    this._trashButton = null;
    this._element = undefined;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .firstElementChild
      .cloneNode(true);
    return cardElement;
  }

  _handleLike() {
    this._likeButton.classList.toggle('elements__like-button_type_active');
  }

  _handleDelete() {
    if (this._element) {
      this._element.remove();
    }
  }

  _handlePopupClick() {
    imagePopupImage.src = this._link;
    imagePopupImage.alt = this._name;
    openPopup(imagePopup);
    imagePopupTitle.textContent = this._name;
  }

  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._trashButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._imagePopupImage.addEventListener('click', () => {
      this._handlePopupClick();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imagePopupImage = this._element.querySelector('.elements__image');
    this._imagePopupImage.src = this._link;
    this._imagePopupImage.alt = this._name;
    this._element.querySelector('.elements__place').textContent = this._name;
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._trashButton = this._element.querySelector('.elements__trash-button');
    this._setEventListeners();
    return this._element;
  }

}
