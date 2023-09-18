export default class FormValidator {
    constructor(config, formElement) {
        this._config = config
        this._formElement = formElement
    }

    _showErrorInput(inputItem, errorSpanText) { // функция показать ошибку при невалидном поле
        errorSpanText.textContent = inputItem.validationMessage // переменная спан ошибки принимает свойство текста ошибки (из вебинара)
        inputItem.classList.add(this._config.inputErrorClass) // при показе текста добавляем класс со стилем ошибки
    }

    _hideErrorInput(inputItem, errorSpanText, config) { // функция скрыть ошибку при невалидном поле
        errorSpanText.textContent = inputItem.validationMessage
        inputItem.classList.remove(this._config.inputErrorClass) // при показе текста удаляем класс со стилем ошибки
    }

    _checkInputValidity(inputItem, formItem, config) { // функция проверки полей на валидность
        const errorSpanText = this._formElement.querySelector(`#${inputItem.name}-error`) // создаем переменную и находим все спаны (текст ошибки)
        if (!inputItem.validity.valid) { // если инпут поле не валидно вызвать функцию ошибки
            this._showErrorInput(inputItem, errorSpanText, config)
        } else { // иначе если поле валидно скрывать ошибку
            this._hideErrorInput(inputItem, errorSpanText, config)
        }
    }

    _hasInvalidInput(inputsList) { // функция проверки валидности полей для блокировки кнопки (true - невалидное поле)
        return inputsList.some((inputItem) => { // (комментарии из теории): проходим по этому массиву методом some
            // Если поле не валидно, колбэк вернёт true Обход массива прекратится и вся функция hasInvalidInput вернёт true
            return !inputItem.validity.valid;
        })
    }

    _checkInvalidButton(submitButtonPopup, config) { // функция проверки валидности кнопки при добавлении2й карточки(для index.js)
        submitButtonPopup.classList.add(config.inactiveButtonClass)
        submitButtonPopup.disabled = 'invalid'
    }

    _toggleButtonState(inputsList, submitButtonPopup, config) { // функция переключения состояния кнопки если не/валидна
        if (hasInvalidInput(inputsList)) { // если поле невалидно
            checkInvalidButton(submitButtonPopup, config)
        } else { // иначе если валидно
            submitButtonPopup.classList.remove(config.inactiveButtonClass) // из ревью - можно создать функцию в validate - продумать реализацию!
            submitButtonPopup.disabled = false
        }
    }

    _setEventListener(formItem, config) { // функция установки слушателей событий
        const inputsList = Array.from(formItem.querySelectorAll(config.inputSelector)) // находим инпуты в формах
        inputsList.forEach(function (inputItem) { // перебираем каждый инпут и вешаем обработчик и событие ввод
            inputItem.addEventListener('input', () => { // событие ввода и фукнция проверки поля на валидность
                toggleButtonState(inputsList, submitButtonPopup, config)
                checkInputValidity(inputItem, formItem, config)
            })
        })

        const submitButtonPopup = formItem.querySelector(config.submitButtonSelector) // находим кнопки "сохранить"
        toggleButtonState(inputsList, submitButtonPopup, config)

        formItem.addEventListener('submit', function (evt) { // обработчик на кнопку и отмена стандартной отправки
            evt.preventDefault()
        })
    }

    enableValidation(config) { // функция включения валидации всех форм
        const formList = Array.from(document.querySelectorAll(config.formSelector)) // находим в конст все формы на странице (делаем массивом сразу)
        formList.forEach(function (formItem) { // перебираем каждую форму и функция установки слушателей
            setEventListener(formItem, config)
        })
    }
}

enableValidation(configForm)

const configForm = { // конфиг формы для удобства
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled', // класс неактивной кнопки
    inputErrorClass: 'popup__input_type_error', // класс невалидного поля
};