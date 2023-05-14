import { initialCards, Card } from './Card.js';

import { FormValidator } from './FormValidator.js';

export { cardTemplate, imagePopup, imagePopupImage, imagePopupTitle, openPopup };


const cardTemplate = document.querySelector('#elements__card');

const cardContainer = document.querySelector('.elements__grid');

const imagePopup = document.querySelector('.image-popup');

const imagePopupImage = imagePopup.querySelector('.image-popup__image');

const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

const closeButtons = document.querySelectorAll('.popup__close-button');

const editButton = document.querySelector('.profile__edit-button');

const addButton = document.querySelector('.profile__add-button');

const profileName = document.querySelector('.profile__name');

const profileAbout = document.querySelector('.profile__about');

const profilePopup = document.querySelector('.profile-popup');

const profilePopupForm = document.querySelector('.popup__form');

const cardPopup = document.querySelector('.card-popup');

const cardPopupForm = document.querySelector('.popup__form[name="addNewCardForm"]');

const addProfileName = profilePopupForm.querySelector('.popup__field_input_name');

const addProfileDescription = profilePopupForm.querySelector('.popup__field_input_about');

let numberOfCardsAddedFromForm = 0;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_input_error',
  errorClass: 'popup__field-error',
  inputVisibleError: 'popup__field-error_active',
  submitButtonSelector: '.popup__save-button',
  inactiveSaveButtonClass: 'popup__save-button_disabled',
};

new FormValidator(validationConfig, profilePopup);
new FormValidator(validationConfig, cardPopup);

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEsc);
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function closeByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

const overlays = document.querySelectorAll('.popup');
overlays.forEach((overlay) => {
  overlay.addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  });
});

function createCards(initialCards) {
  const card = new Card(initialCards, '#elements__card');
  const cardElement = card.generateCard();
  return cardElement;
}

initialCards.forEach((item) => {
  cardContainer.append(createCards(item));
});

function openProfilePopup(profilePopup) {
  openPopup(profilePopup);
  addProfileName.value = profileName.textContent;
  addProfileDescription.value = profileAbout.textContent;
}

function handleProfilePopupFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = addProfileName.value;
  profileAbout.textContent = addProfileDescription.value;
  closePopup(profilePopup);
}

function openCardPopup() {
  cardPopupForm.reset();
  openPopup(cardPopup);
}

function handleCardPopupFormSubmit(event) {
  event.preventDefault();
  const cardName = event.target.elements['nameOfPlaceInput'].value;
  const cardImage = event.target.elements['imageLinkInput'].value;
  const cardData = {
    name: cardName,
    link: cardImage,
  };
  const completeCard = createCards(cardData);
  cardContainer.insertBefore(completeCard, cardContainer.firstChild);
  closePopup(cardPopup);
}

editButton.addEventListener('click', function () {
  openProfilePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', handleProfilePopupFormSubmit);

addButton.addEventListener('click', openCardPopup);

cardPopupForm.addEventListener('submit', handleCardPopupFormSubmit);
