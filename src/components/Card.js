export default class Card { // создаем класс карточки, в ней будет вся разметка, создание новой карточки и все функции
    constructor(templateSelector, {data, userId, handleCardFullscreen, handleSetLike, trashCardItem}) {
        this._data = data
        this._name = data.name
        this._link = data.link
        this._likes = data.likes
        this._userId = userId;// айди пользователя
        this._cardOwnerId = data.owner._id; // айди создателя карточки
        this._cardId = data._id// айди карточки
        this._templateSelector = templateSelector
        this.handleCardFullscreen = handleCardFullscreen
        this._handleSetLike = handleSetLike
        this._trashCardItem = trashCardItem
    }

    generateCard() { //готовим карточку к публикации
        this._element = this._getTemplate();
        this._element.querySelector('.cards__title').textContent = this._name;
        this.deleteButton = this._element.querySelector('.cards__trash') // кнопка удаления
        this.openFullscreenCard = this._element.querySelector('.cards__image') // открытие на весь экран
        this.openFullscreenCard.src = this._link;
        this.openFullscreenCard.alt = this._name;
        this.likeAmount = this._element.querySelector('.cards__like-amount') // span количества лайков
        this.likeButton = this._element.querySelector('.cards__like'); // кнопка лайка
        this.likeAmount.textContent = this._likes.length;

        this._changeStateLike();
        this._deleteButtonTrash();
        this._setEventListener();

        return this._element; // Вернём карточку наружу
    }

    _getTemplate() { //метод получения разметки, далее возвращаем в DOM
        return document
            .querySelector(this._templateSelector)
            .content.querySelector('.cards__item')
            .cloneNode(true)
    }

    _setEventListener() { // метод слушателей
        this.deleteButton.addEventListener('click', () => { // корзина
            this._trashCardItem(this._cardId) // удаляем всю карточку
        })
        this.likeButton.addEventListener('click', () => { // лайк карточки постановка и снятие
            if (this.likeButton.classList.contains('cards__like_active')) {
                //удалить лайк
            } else {
                this._handleSetLike(this._cardId)
            }
        })
        this.openFullscreenCard.addEventListener('click', () => { // открытие на весь экран
            this.handleCardFullscreen(this._link, this._name);
        });
    }

    changeAmountLikes(data) { // изменение количества лайков
        this._likes = data.likes
        this.likeAmount.textContent = this._likes.length
        this.likeButton.classList.toggle('cards__like_active')
    }

    _changeStateLike() { // закрашиваем лайк если его поставили мы
        this._data.likes.forEach((userLikes) => {
            if (userLikes._id === this._userId) {
                this.likeButton.classList.add('cards__like_active')
            }
        })
    }

    _deleteButtonTrash() { // оставляет корзину только на моих карточках
        if (this._userId !== this._cardOwnerId) {
            this.deleteButton.remove()
        }
    }

    removeCard() { // метод удаления карточки для index.js
        this._element.remove()
        this._element = null // коммент ревью 8пр Метод remove удалит только разметку карточки, но сам объект с данными и его слушатели остаются в памяти приложения. Null решает эту проблему
    }
}
