export const configForm = { // конфиг формы для удобства
    popupSelector: '.popup',
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled', // класс неактивной кнопки
    errorClass: 'popup__span-error_active',
    inputErrorClass: 'popup__input_type_error', // класс невалидного поля
};

// сделать запрос к серверу
export const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: '7f52bf50-52cc-48bd-9c80-c48495da8ea4',
        'Content-Type': 'application/json'
    }
}

// попап редактирования профиля
export const avatarEditProfile = document.querySelector('.profile__icon') // карандаш аватара
export const popupUpdateAvatarValidation = document.querySelector('#popup__avatar-form')
export const buttonEditPopup = document.querySelector('.profile__edit-button') // кнопка карандаш редактирования профиля
export const popupEditFormValidation = document.querySelector('#popup__edit-form')
export const nameEditInput = document.querySelector('.popup__input_type_name') // инпут редактирования имени профиля
export const jobEditInput = document.querySelector('.popup__input_type_job') // инпут редактирования "о себе"

// попап добавления новой карточки с местом
export const popupAddFormValidation = document.querySelector('#popup__add-form')
export const buttonAddPopup = document.querySelector('.profile__add-button') // кнопка "плюс" добавления новой карточки с местом
