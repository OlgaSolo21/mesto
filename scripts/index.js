const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditButton = document.querySelector('.popup')
const buttonCloseEditButton = popupEditButton.querySelector('.popup__close')

function addPopup() {
    popupEditButton.classList.add('popup_opened')
    nameInput.value = profileTitle.textContent
    jobInput.value = profileSubtitle.textContent
}

function closeEditPopup () {
    popupEditButton.classList.remove('popup_opened')
}

profileEditButton.addEventListener('click', addPopup)
buttonCloseEditButton.addEventListener('click', closeEditPopup)


const formElement = document.querySelector('.popup__form')
const submitPopup = document.querySelector('.popup')
const nameInput = formElement.querySelector('.popup__input_name')
const jobInput = formElement.querySelector('.popup__input_job')
const profileTitle = document.querySelector('.profile__title')
const profileSubtitle = document.querySelector('.profile__subtitle')

function closeSubmitPopup() {
    submitPopup.classList.remove('popup_opened')
}

function handleFormSubmit (evt) {
    evt.preventDefault()
    profileTitle.textContent = nameInput.value
    profileSubtitle.textContent = jobInput.value
    closeSubmitPopup()
    }

formElement.addEventListener('submit', handleFormSubmit)
