export const configForm = { // конфиг формы для удобства
    popupSelector: '.popup',
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled', // класс неактивной кнопки
    errorClass: 'popup__span-error_active',
    inputErrorClass: 'popup__input_type_error', // класс невалидного поля
};
// основная константа всех форм
export const forms = document.querySelectorAll('.popup__content')

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
