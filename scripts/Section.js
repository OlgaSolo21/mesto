export default class Section {
    constructor({items, renderer}, selector) {
        this._initialArray = items
        this._renderer = renderer
        this._container = document.querySelector(selector)
    }

    renderItems() { //отвечает за отрисовку всех элементов, перебирает массив данных _initialArray и вызывает для каждого элемента массива метод renderer в index.js
        this._initialArray.forEach(item => this._renderer(item))
    }

    addItem(element) { // публичный метод, который принимает DOM-элемент и добавляет его в контейнер.
        this._container.prepend(element);
    }
}