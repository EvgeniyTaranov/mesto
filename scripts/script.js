const editButton = document.querySelector('.profile__edit-button');

let profileName = document.querySelector('.profile__name');

let profileAbout = document.querySelector('.profile__about');

const popup = document.querySelector('.popup');

const formElement = popup.querySelector('.popup__form');

const closeButton = popup.querySelector('.popup__close-button');

let nameInput = formElement.querySelector('.popup__field_name_input');
let jobInput = formElement.querySelector('.popup__field_about_input');

// Переменная, необходимая для работы кнопки like
// const likeButtons = document.querySelectorAll('.elements__like-button');

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

// Функция, управляющая нажатием кнопки like
// likeButtons.forEach(button => {
//   button.addEventListener('click', () => {
//     button.classList.toggle('elements__like-button_type_active');
//   });
// });

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

