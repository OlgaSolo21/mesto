const configForm = { // классы формы для удобства
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__button_disabled', // класс неактивной кнопки
    inputErrorClass: 'popup__input_type_error', // класс невалидного поля
    errorClass: 'popup__error_visible' // класс стиля текста ошибки
};

function setEventListener(formItem, config) { // функция установки слушателей событий
    const inputsList = Array.from(document.querySelectorAll(config.inputSelector))
    console.log(inputsList)
    formItem.addEventListener('submit', function (evt){ // обработчик на кнопку и отмена стандартной отправки
        evt.preventDefault()
        // console.log('submit')
    })
}

function enableValidation(config) { // функция включения валидации всех форм
    const formList = Array.from(document.querySelectorAll(config.formSelector)) // находим в конст все формы на странице (делаем массивом сразу)
    // console.log(formList)
    formList.forEach(function (formItem) { // перебираем каждую форму
        setEventListener(formItem, config)
    })
}

enableValidation(configForm)