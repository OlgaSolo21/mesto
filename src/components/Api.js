export default class Api {
    constructor({url, headers}) {
        this._url = url
        this._headers = headers
    }

    getInitialCards() {
        return fetch(`${this._url}/cards`, {
            headers: this._headers,
            method: 'GET'
        })
            .then((res) => {
                if(res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }

    getUserProfile() {
        return fetch(`${this._url}/users/me`, {
            headers: this._headers,
            method: 'GET'
        })
            .then((res) => {
                if(res.ok) {
                    return res.json()
                } else {
                    return Promise.reject(`Ошибка: ${res.status}`)
                }
            })
    }
}