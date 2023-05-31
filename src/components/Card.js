export class Card {
  constructor(data, cardTemplate, handleImageClick) {
    this._link = data.link;
    this._text = data.name;
    this._cardTemplate = cardTemplate;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .firstElementChild
      .cloneNode(true);

    return cardElement;
  }

  _handleDelete() {
    if (this._element) {
      this._element.remove();
    }
  }

  _handleLike() {
    this._likeButton.classList.toggle('elements__like-button_type_active');
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => {
      this._handleDelete();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleLike();
    });

    this._imagePopupImage.addEventListener('click', () => this._handleImageClick());
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imagePopupImage = this._element.querySelector('.elements__image');
    this._imagePopupImage.src = this._link;
    this._imagePopupImage.alt = this._text;
    this._element.querySelector('.elements__place').textContent = this._text;
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__trash-button');
    this._setEventListeners();
    return this._element;
  }
}


