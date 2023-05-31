import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  open(text, link) {
    const title = this._popup.querySelector('.image-popup__title');
    const image = this._popup.querySelector('.image-popup__image');
    image.src = link;
    image.alt = text;
    title.textContent = text;
    super.open();
  }
}
