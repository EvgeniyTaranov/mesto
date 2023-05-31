export const initialCards = [
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


export const cardTemplate = document.querySelector('#elements__card');

export const cardContainer = document.querySelector('.elements__grid');

export const imagePopup = document.querySelector('.image-popup');

export const imagePopupImage = imagePopup.querySelector('.image-popup__image');

export const imagePopupTitle = imagePopup.querySelector('.image-popup__title');

export const closeButtons = document.querySelectorAll('.popup__close-button');

export const editButton = document.querySelector('.profile__edit-button');

export const addButton = document.querySelector('.profile__add-button');

export const profileName = document.querySelector('.profile__name');

export const profileAbout = document.querySelector('.profile__about');

export const profilePopup = document.querySelector('.profile-popup');

export const profilePopupForm = document.querySelector('.popup__form');

export const cardPopup = document.querySelector('.card-popup');

export const cardPopupForm = document.querySelector('.popup__form[name="addNewCardForm"]');

export const addProfileName = profilePopupForm.querySelector('.popup__field_input_name');

export const addProfileDescription = profilePopupForm.querySelector('.popup__field_input_about');

export const overlays = document.querySelectorAll('.popup');

export let numberOfCardsAddedFromForm = 0;


export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_input_error',
  errorClass: 'popup__field-error',
  inputVisibleError: 'popup__field-error_active',
  submitButtonSelector: '.popup__save-button',
  inactiveSaveButtonClass: 'popup__save-button_disabled',
};
