export default class FormValidator {
    constructor(config, formElement) {
        this._config = config
        this._formElement = formElement
        this._submitButtonPopup = this._formElement.querySelector(this._config.submitButtonSelector)
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
    }

    _showErrorInput(inputItem, errorSpanText) { // функция показать ошибку при невалидном поле
        errorSpanText.textContent = inputItem.validationMessage // переменная спан ошибки принимает свойство текста ошибки (из вебинара)
        inputItem.classList.add(this._config.inputErrorClass) // при показе текста добавляем класс со стилем ошибки
    }

    _hideErrorInput(inputItem, errorSpanText) { // функция скрыть ошибку при невалидном поле
        errorSpanText.textContent = ''
        inputItem.classList.remove(this._config.inputErrorClass) // при показе текста удаляем класс со стилем ошибки
    }

    _checkInputValidity(inputItem) { // функция проверки полей на валидность
        const errorSpanText = this._formElement.querySelector(`#${inputItem.name}-error`) // создаем переменную и находим все спаны (текст ошибки)
        if (!inputItem.validity.valid) { // если инпут поле не валидно вызвать функцию ошибки
            this._showErrorInput(inputItem, errorSpanText)
        } else { // иначе если поле валидно скрывать ошибку
            this._hideErrorInput(inputItem, errorSpanText)
        }
    }

    _hasInvalidInput() { // функция проверки валидности полей для блокировки кнопки (true - невалидное поле)
        return this._inputList.some((inputItem) => { // (комментарии из теории): проходим по этому массиву методом some
            // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true
            return !inputItem.validity.valid;
        })
    }

    _checkInvalidButton() { // функция проверки валидности кнопки при добавлении2й карточки(для index.js)
        this._submitButtonPopup.classList.add(this._config.inactiveButtonClass)
        this._submitButtonPopup.disabled = 'invalid'
    }

    _toggleButtonState() { // функция переключения состояния кнопки если не/валидна
        if (this._hasInvalidInput()) { // если поле невалидно
            this._checkInvalidButton()
        } else { // иначе если валидно
            this._submitButtonPopup.classList.remove(this._config.inactiveButtonClass)
            this._submitButtonPopup.disabled = false
        }
    }

    _setEventListener() { // функция установки слушателей событий
        this._inputList.forEach(inputItem => { // перебираем каждый инпут и вешаем обработчик и событие ввод
            inputItem.addEventListener('input', () => { // событие ввода и фукнция проверки поля на валидность
                this._toggleButtonState()
                this._checkInputValidity(inputItem)
                console.log(1)
            })
        })
        this._formElement.addEventListener('submit', (evt) => { // обработчик на кнопку и отмена стандартной отправки
            evt.preventDefault()
            this._toggleButtonState()
        })
        this._toggleButtonState()
    }

    enableValidation() { // функция включения валидации всех форм
        this._setEventListener()
    }
}