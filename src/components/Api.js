export default class Api {
    constructor({url, headers}) {
        this._url = url
        this._headers = headers
    }

    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject(`Ошибка: ${res.status}`);
        }
    }

    getInitialCards() { //запрос на сервер для получения карточек
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'GET'
        })
            .then(this._handleResponse)
    }

    getUserProfile() { // запрос на сервер для получения данных о пользователе
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'GET'
        })
            .then(this._handleResponse)
    }

    editProfilePatch(data) { // Редактирование профиля посылаем запрос методом PATCH
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'PATCH',
            body: JSON.stringify({
                name: data.UserName,
                about: data.UserJob
            })
        })
            .then(this._handleResponse)
    }

    addNewCardPost(data) { //Добавление новой карточки POST-запрос
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'POST',
            body: JSON.stringify({
                name: data.UserPlace,
                link: data.UserLink
            })
        })
            .then(this._handleResponse)
    }

    setLikeCardPut() { // Постановка лайка
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'PUT'
        })
            .then(this._handleResponse)
    }

    deleteLikeCard() { // Снятие лайка
        return fetch(`${this._url}/cards/${cardId}/likes`, {
            headers: this._headers,
            method: 'DELETE'
        })
            .then(this._handleResponse)
    }

}
