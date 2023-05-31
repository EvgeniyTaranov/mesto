export class FormValidator {
  constructor(validationConfig, formElement) {
    this.validationConfig = validationConfig;
    this.formElement = formElement;
    this.formInputsList = Array.from(this.formElement.querySelectorAll(this.validationConfig.inputSelector));
    this.buttonElement = this.formElement.querySelector(this.validationConfig.submitButtonSelector);
    this._setEventListeners();
  }

  _showInputError = (formElement, inputElement, errorMessage, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this.validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this.validationConfig.inputVisibleError);
  };

  _hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this.validationConfig.inputErrorClass);
    errorElement.classList.remove(this.validationConfig.inputVisibleError);
    errorElement.textContent = '';
  };

  _checkInputValidity = (formElement, inputElement, validationConfig) => {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage, validationConfig);
    } else {
      this._hideInputError(formElement, inputElement, validationConfig);
    }
  };

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _disableSaveButton(buttonElement) {
    buttonElement.classList.add(this.validationConfig.inactiveSaveButtonClass);
    buttonElement.disabled = true;
  }

  _enableSaveButton(buttonElement) {
    buttonElement.classList.remove(this.validationConfig.inactiveSaveButtonClass);
    buttonElement.disabled = false;
  }

  _setEventListeners() {
    const inputList = this.formInputsList;
    const buttonElement = this.buttonElement;
    this.formElement.addEventListener('reset', () => {
      this._disableSaveButton(buttonElement);
    });
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(this.formElement, inputElement);
        if (this._hasInvalidInput(inputList)) {
          this._disableSaveButton(buttonElement);
        } else {
          this._enableSaveButton(buttonElement);
        }
      });
    });
  }

}
