import './index.css';

import { initialCards, validationConfig, profilePopup, cardPopup, addButton, editButton, addProfileName, addProfileDescription } from '../utils/constants.js';

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';

// Валидация форм
new FormValidator(validationConfig, profilePopup);
new FormValidator(validationConfig, cardPopup);

// Карточки
const createCard = (data) => {
  const card = new Card(data, '#elements__card', () => {
    imagePopup.open(data.name, data.link)
  });
  return card.generateCard();
}

const renderCard = (data, wrap) => {
  const card = createCard(data);
  wrap.append(card);
}

// Обработчик profilePopup
const handleProfilePopupFormSubmit = (data) => {
  const { nameInput, aboutInput } = data;
  userInfo.setUserInfo(nameInput, aboutInput);
  editProfilePopup.close();
}

// Обработчик cardPopup
const handleCardPopupFormSubmit = (data) => {
  const card = createCard({
    name: data['nameOfPlaceInput'],
    link: data['imageLinkInput']
  })

  section.addItem(card);
  addCardPopup.close();
}

// Кнопки
editButton.addEventListener('click', () => {
  const { name, job } = userInfo.getUserInfo();
  addProfileName.value = name;
  addProfileDescription.value = job;
  editProfilePopup.open();
});

addButton.addEventListener('click', () => {
  addCardPopup.open()
});

// Экземпляры классов
const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.card-popup', handleCardPopupFormSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.profile-popup', handleProfilePopupFormSubmit);
editProfilePopup.setEventListeners();

const section = new Section({ items: initialCards, renderer: renderCard }, '.elements__grid');
section.renderItems();

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userDescriptionSelector: '.profile__about' });
