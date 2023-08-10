const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditButton = document.querySelector('.popup_profile')
const buttonCloseEditButton = popupEditButton.querySelector('.popup__close')
const formElement = document.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_type_name')
const jobInput = formElement.querySelector('.popup__input_type_job')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

// пишем функции кнопки добавления данных профиля 4пр
function addPopup() {
    popupEditButton.classList.add('popup_opened')
    nameInput.value = profileTitle.textContent
    jobInput.value = profileSubtitle.textContent
}
function closeEditPopup () {
    popupEditButton.classList.remove('popup_opened')
}
function handleFormSubmit (evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    closeEditPopup()
    }

// вешаем слушатели на попап профиля
profileEditButton.addEventListener('click', addPopup)
buttonCloseEditButton.addEventListener('click', closeEditPopup)
formElement.addEventListener('submit', handleFormSubmit)

