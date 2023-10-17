export default class Card { // создаем класс карточки, в ней будет вся разметка, создание новой карточки и все функции
    constructor(data, templateSelector, handleCardClick) {
        this._name = data.name
        this._link = data.link
        this._likes = data._likes
        this._templateSelector = templateSelector
        this.handleCardClick = handleCardClick
    }

    generateCard() { //готовим карточку к публикации
        this._element = this._getTemplate();
        this._element.querySelector('.cards__image').src = this._link;
        this._element.querySelector('.cards__image').alt = this._name;
        this._element.querySelector('.cards__title').textContent = this._name;
        this._setEventListener();
        return this._element;
    }

    _getTemplate() { //метод получения разметки, далее возвращаем в DOM
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.cards__item')
            .cloneNode(true)
    }

    _setEventListener() { // метод слушателей
        this._element.querySelector('.cards__trash').addEventListener('click', () => { // корзина
            this._trashCardItem()
        })
        this._element.querySelector('.cards__like').addEventListener('click', (evt) => { // лайк карточки
            this._likeCardItem(evt)
        })
        this._element.querySelector('.cards__image').addEventListener('click', () => { // открытие на весь экран
            this.handleCardClick(this._link, this._name);
        });
    }

    _trashCardItem() { // метод удаления карточки (корзина)
        this._element.remove()
        this._element = null // коммент ревью 8пр Метод remove удалит только разметку карточки, но сам объект с данными и его слушатели остаются в памяти приложения. Null решает эту проблему
    }

    _likeCardItem(evt) { // метод лайка карточки (сердечко)
        evt.target.classList.toggle('cards__like_active')
    }

    changeAmountLikes() {

    }
}
