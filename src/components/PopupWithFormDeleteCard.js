import Popup from "./Popup.js";

export default class PopupWithFormDeleteCard extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._formDelete = this._popupSelector.querySelector('.popup__content')
        this._buttonSubmitForm = this._formDelete.querySelector('.popup__submit')
    }

    submitDeleteCallback(call) { // функция для Card куда пишем сабмит кнопки
        this._handleSubmit = call
    }

    setEventListeners() {
        super.setEventListeners();
        this._formDelete.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleSubmit()
        })
    }
}