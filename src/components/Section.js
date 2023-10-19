export default class Section {
    constructor({renderer}, selector) {
        this._renderer = renderer
        this._container = document.querySelector(selector)
    }

    renderItems(item) { //отвечает за отрисовку всех элементов, перебирает массив данных _initialArray и вызывает для каждого элемента массива метод renderer в index.js
        item.forEach(item => this._renderer(item))
    }

    addItem(element) { // публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
        this._container.append(element);
    }

    addNewCard(element) { // публичный метод, чтобы новую добавить картчку (при обновлении карточки улетают вниз)
        this._container.prepend(element);
    }
}