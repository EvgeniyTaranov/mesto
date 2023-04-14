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


function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.addEventListener('keydown', closeByEsc);
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
for (let i = 0; i < overlays.length; i++) {
  overlays[i].addEventListener('click', function (event) {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  });
}

function createCard(cardData) {
  const cardElement = cardTemplate.content.querySelector('.elements__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardPlace = cardElement.querySelector('.elements__place');
  const deleteButton = cardElement.querySelector('.elements__trash-button');
  const likeButton = cardElement.querySelector('.elements__like-button');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardPlace.textContent = cardData.name;

  cardImage.addEventListener('click', () => {
    openPopup(imagePopup);
    imagePopupImage.src = cardData.link;
    imagePopupImage.alt = cardData.name;
    imagePopupTitle.textContent = cardData.name;
  });

  deleteButton.addEventListener('click', () => {
    cardElement.remove();
  });

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('elements__like-button_type_active');
  });

  return cardElement;
}


function uploadInitialCards() {
  initialCards.forEach((cardData) => {
    const completeCard = createCard(cardData);
    const cardIndex = initialCards.findIndex((c) => c.name === cardData.name && c.link === cardData.link);

    if (cardIndex >= 0) {
      const indexInCardContainer = cardIndex + numberOfCardsAddedFromForm;
      const existingCard = cardContainer.children[indexInCardContainer];
      cardContainer.insertBefore(completeCard, existingCard);
    } else {
      cardContainer.insertBefore(completeCard, cardContainer.firstChild);
      numberOfCardsAddedFromForm++;
    }
  });
}

uploadInitialCards();


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
  const completeCard = createCard(cardData);
  cardContainer.insertBefore(completeCard, cardContainer.firstChild);
  closePopup(cardPopup);
}


editButton.addEventListener('click', function () {
  openProfilePopup(profilePopup);
});

profilePopupForm.addEventListener('submit', handleProfilePopupFormSubmit);

addButton.addEventListener('click', openCardPopup);

cardPopupForm.addEventListener('submit', handleCardPopupFormSubmit);
