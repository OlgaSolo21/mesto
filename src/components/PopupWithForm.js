import Popup from "./Popup.js";

export default class PopupWithForm extends Popup{
    constructor({popupSelector, handleFormSubmitCallback}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmitCallback
        this._popupForm = this._popupSelector.querySelector('.popup__content')
        this._inputList = this._popupForm.querySelectorAll('.popup__input')
        this._buttonSubmitForm = this._popupForm.querySelector('.popup__submit')
        this._buttonSubmitTextUX = this._buttonSubmitForm
    }

    _getInputValues() {
        this._formValues = {};
        this._inputList.forEach((input) => {
            this._formValues[input.name] = input.value;
        })

        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._popupForm.addEventListener('submit',(evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues())
        })
    }

    close() {
        super.close();
        this._popupForm.reset()
    }

    renderLoadingUX(isLoading, message = 'Сохранение...') {
        if (isLoading) {
            this._buttonSubmitForm.textContent = message
        } else {
            this._buttonSubmitForm.textContent = this._buttonSubmitTextUX
        }
    }
}