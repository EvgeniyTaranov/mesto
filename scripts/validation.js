const showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputVisibleError);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.inputVisibleError);
  errorElement.textContent = '';
};

const checkInputValidity = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function disableSaveButton(buttonElement, validationConfig) {
  buttonElement.classList.add(validationConfig.inactiveSaveButtonClass);
  buttonElement.disabled = true;
}

function enableSaveButton(buttonElement, validationConfig) {
  buttonElement.classList.remove(validationConfig.inactiveSaveButtonClass);
  buttonElement.disabled = false;
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.saveButtonSelector);
  formElement.addEventListener('reset', () => {
    disableSaveButton(buttonElement, validationConfig);
  });
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, validationConfig);
      if (hasInvalidInput(inputList)) {
        disableSaveButton(buttonElement, validationConfig);
      } else {
        enableSaveButton(buttonElement, validationConfig);
      }
    });
  });
};

function enableValidation() {
  const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__field',
    inputErrorClass: 'popup__field_input_error',
    errorClass: 'popup__field-error',
    inputVisibleError: 'popup__field-error_active',
    saveButtonSelector: '.popup__save-button',
    inactiveSaveButtonClass: 'popup__save-button_disabled',
  };
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation();
