import './index.css';

import { validationConfig, profilePopup, cardPopup, userAvatarPopup, addButton, editButton, avatarButton, addProfileName, addProfileDescription } from '../utils/constants.js'

import { Card } from '../components/Card.js';
import { FormValidator } from '../components/FormValidator.js';
import { Section } from '../components/Section.js'
import { PopupWithImage } from '../components/PopupWithImage.js';
import { PopupWithForm } from '../components/PopupWithForm.js';
import { UserInfo } from '../components/UserInfo.js';
import { api } from '../components/Api.js'

let userId;

// Валидация форм
new FormValidator(validationConfig, profilePopup);
new FormValidator(validationConfig, cardPopup);
new FormValidator(validationConfig, userAvatarPopup);

// Карточки
const createCard = (data) => {
  const card = new Card(
    data,
    '#elements__card',
    () => {
      imagePopup.open(data.name, data.link)
    },

    (id) => {
      deleteConfirmationPopup.open();
      deleteConfirmationPopup.changeSubmitHandler(() => {
        api
          .deleteCard(id)
          .then((res) => {
            card.deleteCard();
            deleteConfirmationPopup.close()
          })
          .catch((err) => console.log(`Ошибка...: ${err}`));
      });
    },

    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch(err => console.log(`Ошибка...: ${err}`))
      } else {
        api.addLike(id)
          .then(res => {
            card.setLikes(res.likes)
          })
          .catch(err => console.log(`Ошибка...: ${err}`))
      }
    },
  );

  return card.generateCard();
}

const renderCard = (data, wrap) => {
  const card = createCard(data);
  section.addItem(card);
}

// Обработчик profilePopup
const handleProfilePopupFormSubmit = (data) => {
  const { name, about } = data

  api.editProfile(name, about)
    .then(() => {
      userInfo.setUserInfo({ name, about })
      editProfilePopup.close()
    })

    .catch(err => console.log(`Ошибка...: ${err}`))
    .finally(() => editProfilePopup.resetSubmitText());
};

// Обработчик avatarPopup
function handleUserAvatarFormSubmit(values) {
  api.updateUserPic(values.avatar)
    .then(res => {
      userInfo.setAvatar(res.avatar);
      userImagePopup.close()
    })

    .catch(err => console.log(`Ошибка...: ${err}`))
    .finally(() => userImagePopup.resetSubmitText());
}

// Обработчик cardPopup
const handleCardPopupFormSubmit = (data) => {
  api.addCard(data['nameOfPlaceInput'], data['imageLinkInput'])
    .then(res => {
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id
      })

      section.addItem(card)
      addCardPopup.close()
    })

    .catch(err => console.log(`Ошибка...: ${err}`))
    .finally(() => addCardPopup.resetSubmitText());
};

// Кнопки
editButton.addEventListener('click', () => {
  const { name, about } = userInfo.getUserInfo()
  addProfileName.value = name
  addProfileDescription.value = about
  editProfilePopup.open()
});

addButton.addEventListener('click', () => {
  addCardPopup.open()
});

avatarButton.addEventListener('click', () => {
  userImagePopup.open()
});

// Экземпляры классов
const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

const addCardPopup = new PopupWithForm('.card-popup', handleCardPopupFormSubmit);
addCardPopup.setEventListeners();

const editProfilePopup = new PopupWithForm('.profile-popup', handleProfilePopupFormSubmit);
editProfilePopup.setEventListeners();

const section = new Section({ items: [], renderer: renderCard }, '.elements__grid');

const deleteConfirmationPopup = new PopupWithForm('.delete-popup')
deleteConfirmationPopup.setEventListeners();

const userImagePopup = new PopupWithForm('.user-image-popup', handleUserAvatarFormSubmit)
userImagePopup.setEventListeners();

const userInfo = new UserInfo({ userNameSelector: '.profile__name', userDescriptionSelector: '.profile__about', userAvatarSelector: '.profile__avatar' })


Promise.all([api.getProfile(), api.getCards()])
  .then(([userData, cards]) => {
    userId = userData._id;

    const cardList = [];

    cards.forEach((data) => {
      cardList.unshift({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id
      });
    });

    userInfo.setUserInfo(userData);
    section.renderItems(cardList);
  })

  .catch((err) => console.log(`Ошибка...: ${err}`));
