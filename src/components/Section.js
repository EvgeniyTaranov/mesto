export class Section {
  constructor({ items, renderer }, cardContainer) {
    this._container = document.querySelector(cardContainer);
    this._items = items;
    this._renderer = renderer;
  }

  renderItems(items) {
    if (items != null) this._items = items;
    this._items.forEach(data => {
      this._renderer(data, this._container);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
