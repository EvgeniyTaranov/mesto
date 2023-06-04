export class Card {
  constructor(data, cardTemplate, handleImageClick, handleDeleteClick, handleLikeClick) {
    this._link = data.link;
    this._text = data.name;
    this._cardTemplate = cardTemplate;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._handleImageClick = handleImageClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteClick = handleDeleteClick;
    this._likes = data.likes;
    this._likeCountElement = null;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardTemplate)
      .content
      .firstElementChild
      .cloneNode(true);

    return cardElement;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  isLiked() {
    const isLikedByUser = this._likes.find(user => user._id === this._userId);
    return isLikedByUser;
  }

  _setEventListeners() {
    this._deleteButton.addEventListener('click', () => this._handleDeleteClick(this._id));

    this._likeButton.addEventListener('click', () => this._handleLikeClick(this._id));

    this._imagePopupImage.addEventListener('click', () => this._handleImageClick());
  }

  setLikes(newLikes) {
    this._likes = newLikes;
    this._likeCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._putLike();
    } else {
      this._putDisLike();
    }
  }

  _putLike() {
    this._likeButton.classList.add('elements__like-button_type_active');
  }

  _putDisLike() {
    this._likeButton.classList.remove('elements__like-button_type_active');
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imagePopupImage = this._element.querySelector('.elements__image');
    this._imagePopupImage.src = this._link ?? "https://dummyimage.com/282";
    this._imagePopupImage.alt = this._text;
    this._element.querySelector('.elements__place').textContent = this._text;
    this._likeButton = this._element.querySelector('.elements__like-button');
    this._deleteButton = this._element.querySelector('.elements__trash-button');
    this._likeCountElement = this._element.querySelector('.elements__likes-counter');
    this.setLikes(this._likes);
    this._setEventListeners();

    if (this._ownerId !== this._userId) {
      this._deleteButton.style.display = 'none';
    }

    return this._element;
  }
}
