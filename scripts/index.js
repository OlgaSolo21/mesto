const profileEditButton = document.querySelector('.profile__edit-button')
const popupEditButton = document.querySelector('.popup_edit_button')
const buttonCloseEditButton = popupEditButton.querySelector('.popup__close')

function togglePopup() {
    popupEditButton.classList.toggle('popup_opened')
}

profileEditButton.addEventListener('click', togglePopup)
buttonCloseEditButton.addEventListener('click', togglePopup)

let popupSubmit = document.querySelector('.popup__submit')
let profilePopupSubmit = document.querySelector('.popup__container')
let nameInput = profilePopupSubmit.querySelector('.popup__input_name')
let jobInput = profilePopupSubmit.querySelector('.popup__input_job')
let profileTitle = document.querySelector('.profile__title')
let profileSubtitle = document.querySelector('.profile__subtitle')

    function handleFormSubmit (evt) {
        evt.preventDefault();
        profileTitle = profileTitle.value
        profileSubtitle = profileSubtitle.value

        // Получите значение полей jobInput и nameInput из свойства value
        document.querySelector('.popup__input_name')
        document.querySelector('.popup__input_job')
        // Выберите элементы, куда должны быть вставлены значения полей
nameInput.textContent = profileTitle
jobInput.textContent = profileSubtitle
        // Вставьте новые значения с помощью textContent
    }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupSubmit.addEventListener('submit', handleFormSubmit);