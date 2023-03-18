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

function deleteCard(event) {
  const deleteButton = event.target.closest('.elements__trash-button');
  if (deleteButton) {
    const cardElement = deleteButton.closest('.elements__card');
    cardElement.remove();
  }
}

initialCards.forEach((card) => {
  const cardElement = cardTemplate.content.querySelector('.elements__card').cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardPlace = cardElement.querySelector('.elements__place');
  cardImage.src = card.link;
  cardImage.alt = card.name;
  cardPlace.textContent = card.name;
  cardContainer.appendChild(cardElement);
});

cardContainer.addEventListener('click', deleteCard);
const editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
const popup = document.querySelector('.popup');
const formElement = popup.querySelector('.popup__form');
const closeButton = popup.querySelector('.popup__close-button');
let nameInput = formElement.querySelector('.popup__field_input_name');
let jobInput = formElement.querySelector('.popup__field_input_about');

function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
};

function closePopup() {
  popup.classList.remove('popup_opened');
};

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup();
};

const elementsContainer = document.querySelector('.elements');

elementsContainer.addEventListener('click', (event) => {
  const likeButton = event.target.closest('.elements__like-button');
  if (likeButton) {
    likeButton.classList.toggle('elements__like-button_type_active');
  }
});

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);


const addCardButton = document.querySelector('.profile__add-button');
const closeCardButton = document.querySelector('.card-popup .popup__close-button');
const cardPopup = document.querySelector('.card-popup');

cardPopup.style.visibility = 'hidden';

addCardButton.addEventListener('click', () => {
  cardPopup.style.visibility = 'visible';
  cardPopup.style.opacity = '1'
});

closeCardButton.addEventListener('click', () => {
  cardPopup.style.visibility = 'hidden';
  cardPopup.style.opacity = '0'
  cardPopup.style.transition = 'visibility 0s, linear 0.4s, opacity 300ms';
});

const addNewCardForm = document.querySelector('form[name="addNewCardForm"]');
const elementsGrid = document.querySelector('.elements__grid');

addNewCardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const card = {
    name: event.target.nameInput.value,
    link: event.target.aboutInput.value,
  };

  const cardElement = cardTemplate.content.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardPlace = cardElement.querySelector('.elements__place');

  cardImage.setAttribute('src', card.link);
  cardPlace.textContent = card.name;

  elementsGrid.prepend(cardElement);
  addNewCardForm.reset();

  cardPopup.style.visibility = 'hidden';
});

const elementsCards = document.querySelectorAll('.elements__card');
const imagePopup = document.querySelector('.image-popup');
const popupImage = imagePopup.querySelector('.image-popup__image');
const popupTitle = imagePopup.querySelector('.image-popup__title');

function openImagePopup(imgSrc, titleText) {
  const popupCloseButton = imagePopup.querySelector('.popup__close-button');
  popupCloseButton.addEventListener('click', closeImagePopup);
  popupImage.src = imgSrc;
  popupTitle.textContent = titleText;
  imagePopup.classList.add('popup_opened');
}

function closeImagePopup() {
  const popupCloseButton = imagePopup.querySelector('.popup__close-button');
  popupCloseButton.removeEventListener('click', closeImagePopup);
  imagePopup.classList.remove('popup_opened');
}

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('elements__image')) {
    const image = event.target;
    const card = image.closest('.elements__card');
    const title = card.querySelector('.elements__place').textContent;
    openImagePopup(image.src, title);
  }
});

function addNewCard(imageSrc, titleText) {
  const cardTemplate = document.querySelector('#elements__card');
  const cardClone = cardTemplate.content.cloneNode(true);
  const image = cardClone.querySelector('.elements__image');
  const title = cardClone.querySelector('.elements__place');
  image.src = imageSrc;
  title.textContent = titleText;
  document.querySelector('.elements__list').appendChild(cardClone);
}

const addCardForm = document.querySelector('.add-card__form');
addCardForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const imageSrc = addCardForm.querySelector('.add-card__input_type_image').value;
  const titleText = addCardForm.querySelector('.add-card__input_type_title').value;
  addNewCard(imageSrc, titleText);
  addCardForm.reset();
});
