export default class FormValidator {
    constructor(config, formElement) {
        this._config = config
        this._formElement = formElement
        this._submitButtonPopup = this._formElement.querySelector(this._config.submitButtonSelector)
        this._inputList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector))
        this._errorTextClass = config.errorClass
    }

    _showErrorInput(inputItem, errorSpanText) { // функция показать ошибку при невалидном поле
        const errorSpan = this._formElement.querySelector(`#${inputItem.name}-error`) // создаем переменную и находим все спаны (текст ошибки)
        errorSpan.textContent = errorSpanText
        errorSpan.classList.add(this._errorTextClass)
        inputItem.classList.add(this._config.inputErrorClass) // при показе текста добавляем класс со стилем ошибки
    }

    _hideErrorInput(inputItem) { // функция скрыть ошибку при невалидном поле
        const errorSpan = this._formElement.querySelector(`#${inputItem.name}-error`) // создаем переменную и находим все спаны (текст ошибки)
        errorSpan.textContent = ''
        errorSpan.classList.remove(this._errorTextClass)
        inputItem.classList.remove(this._config.inputErrorClass) // при показе текста добавляем класс со стилем ошибки
    }

    _checkInputValidity(inputItem) { // функция проверки полей на валидность
        if (!inputItem.validity.valid) { // если инпут поле не валидно вызвать функцию ошибки
            this._showErrorInput(inputItem, inputItem.validationMessage)
        } else { // иначе если поле валидно скрывать ошибку
            this._hideErrorInput(inputItem)
        }
    }

    _hasInvalidInput() { // функция проверки валидности полей для блокировки кнопки (true - невалидное поле)
        return this._inputList.some((inputItem) => { // (комментарии из теории): проходим по этому массиву методом some
            // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true
            return !inputItem.validity.valid;
        })
    }

    _disabledButton() { // функция проверки валидности кнопки при добавлении2й карточки(для index.js)
        this._submitButtonPopup.classList.add(this._config.inactiveButtonClass)
        this._submitButtonPopup.disabled = true
    }

    _activeButton() {
        this._submitButtonPopup.classList.remove(this._config.inactiveButtonClass)
        this._submitButtonPopup.disabled = false
    }

    _toggleButtonState() { // функция переключения состояния кнопки если не/валидна
        if (this._hasInvalidInput(this._inputList)) { // если поле невалидно
            this._disabledButton()
        } else { // иначе если валидно
            this._activeButton()
        }
    }

    _setEventListener() { // функция установки слушателей событий
        this._toggleButtonState()
        this._inputList.forEach(inputItem => { // перебираем каждый инпут и вешаем обработчик и событие ввод
            inputItem.addEventListener('input', () => { // событие ввода и фукнция проверки поля на валидность
                this._toggleButtonState(this._inputList)
                this._checkInputValidity(inputItem)
            })
        })
    }

    enableValidation() { // функция включения валидации формы, которую передаем в конструктор
        this._formElement.addEventListener('submit', (evt) => { // обработчик на кнопку и отмена стандартной отправки
            evt.preventDefault()
        })
        this._setEventListener()
}

    resetButtonPopup() { // сбросим валидацию для ux кнопки
        this._inputList.forEach((inputItem) => {
            this._hideErrorInput(inputItem)
        })
        this._toggleButtonState()
    }
}