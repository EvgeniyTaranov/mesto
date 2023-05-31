export class Section {
  constructor({ items, renderer }, cardContainer) {
    this._container = document.querySelector('.elements__grid')
    this._items = items
    this._renderer = renderer
  }

  renderItems() {
    this._items.forEach(data => {
      this._renderer(data, this._container)
    })
  }

  addItem(element) {
    this._container.prepend(element)
  }
}

