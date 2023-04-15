const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_input_error',
  errorClass: 'popup__field-error',
  inputVisibleError: 'popup__field-error_active',
  saveButtonSelector: '.popup__save-button',
  inactiveSaveButtonClass: 'popup__save-button_disabled',
};

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputVisibleError);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.inputVisibleError);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.saveButtonSelector);
  formElement.addEventListener('reset', () => {
    disableButton(buttonElement, validationConfig);
  });
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const disableSaveButton = (buttonElement) => {
  buttonElement.classList.remove(validationConfig.inactiveSaveButtonClass);
  buttonElement.disabled = false;
}

const enableSaveButton = (buttonElement) => {
  buttonElement.classList.add(validationConfig.inactiveSaveButtonClass);
  buttonElement.disabled = true;
}

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  inputErrorClass: 'popup__field_input_error',
  errorClass: 'popup__field-error',
  inputVisibleError: 'popup__field-error_active',
  saveButtonSelector: '.popup__save-button',
  inactiveSaveButtonClass: 'popup__save-button_disabled',
});

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function disableButton(buttonElement, validationConfig) {
  buttonElement.classList.add(validationConfig.inactiveSaveButtonClass);
  buttonElement.disabled = true;
}

function enableButton(buttonElement, validationConfig) {
  buttonElement.classList.remove(validationConfig.inactiveSaveButtonClass);
  buttonElement.disabled = false;
}

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
  } else {
    enableButton(buttonElement, validationConfig);
  }
};
