import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._inputs = [...this._form.querySelectorAll('.popup__field')];
    this._submitButton = this._popup.querySelector('.popup__save-button');
    this._textSubmit = this._submitButton.textContent;
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });

    return values;
  }

  changeSubmitHandler(newSubmitHandler) {
    this._handleSubmit = newSubmitHandler
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleSubmit(this._getInputValues());
      this._submitButton.textContent = 'Сохранение...'
    });
  }

  resetSubmitText() {
    this._submitButton.textContent = this._textSubmit;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
