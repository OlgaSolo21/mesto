export const configForm = { // конфиг формы для удобства
    popupSelector: '.popup',
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled', // класс неактивной кнопки
    inputErrorClass: 'popup__input_type_error', // класс невалидного поля
};
// основная константа всех форм
export const forms = document.querySelectorAll('.popup__content')
// попап редактирования профиля
export const avatarEditProfile = document.querySelector('.profile__icon')
export const buttonEditPopup = document.querySelector('.profile__edit-button') // кнопка карандаш редактирования профиля
export const nameEditInput = document.querySelector('.popup__input_type_name') // инпут редактирования имени профиля
export const jobEditInput = document.querySelector('.popup__input_type_job') // инпут редактирования "о себе"
// попап добавления новой карточки с местом
export const buttonAddPopup = document.querySelector('.profile__add-button') // кнопка "плюс" добавления новой карточки с местом
export const titleAddInput = document.querySelector('.popup__input_type_place') // инпут добавления названия места
export const imageAddInput = document.querySelector('.popup__input_type_link') // инпут добавления ссылки на картинку места
