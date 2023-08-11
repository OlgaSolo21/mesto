const initialCards = [
    {
        name: 'Калининград',
        link: 'https://images.unsplash.com/photo-1531000164940-cde686a49bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
    },
    {
        name: 'Алтайский край',
        link: 'https://images.unsplash.com/photo-1596003903067-bf5762ad5c19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80'
    },
    {
        name: 'Байкал',
        link: 'https://images.unsplash.com/photo-1490879112094-281fea0883dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
    },
    {
        name: 'Карачаево-Черкессия',
        link: 'https://images.unsplash.com/photo-1635530043255-eb163c579d4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    },
    {
        name: 'Сочи',
        link: 'https://images.unsplash.com/photo-1567245597540-5232c358e457?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    },
    {
        name: 'Санкт-Петербург',
        link: 'https://images.unsplash.com/photo-1610045129185-a421e70e755f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=417&q=80'
    }
];

const cardsElement = document.querySelector('.cards__elements');
const buttonClose = document.querySelector('.popup__close');

// попап редактирования профиля
const buttonEditPopup = document.querySelector('.profile__edit-button') // кнопка карандаш редактирования профиля
const profileEditTitle = document.querySelector('.profile__title') // строка "имя" профиля
const profileEditSubtitle = document.querySelector('.profile__subtitle') // строка "о себе" профиля
const popupEdit = document.querySelector('.popup_profile') // сам попап редактирования профиля
const formElement = document.querySelector('.popup_edit-form') // форма редактирования профиля (форма с инпутами)
const nameEditInput = formElement.querySelector('.popup__input_type_name') // инпут редактирования имени профиля
const jobEditInput = formElement.querySelector('.popup__input_type_job') // инпут редактирования "о себе"
const closeEdit = document.querySelector('.popup__close_type_edit')

// попап добавления новой карточки с местом
const buttonAddPopup = document.querySelector('.profile__add-button') // кнопка "плюс" добавления новой карточки с местом
const popupAdd = document.querySelector('.popup_add') // сам попап добавления новой карточки
const addFormButton = document.querySelector('.popup_add-form') // форма добавления карточки (форма с инпутами)
const titleAddInput = addFormButton.querySelector('.popup__input_type_place') // инпут добавления названия места
const imageAddInput = addFormButton.querySelector('.popup__input_type_link') // инпут добавления ссылки на картинку места
const closeAdd = document.querySelector('.popup__close_type_add')

// попап открытия карточки на весь экран
const popupFullScreen = document.querySelector('.popup_fullscreen') // сам попап открытия картинки на весь экран
const imageFullScreenInput = document.querySelector('.popup__image') // инпут картинки карточки места
const captionFullScreenInput = document.querySelector('.popup__caption') // инпут подписи места к картинке
const closeFullScreen = document.querySelector('.popup__close_type_fullscreen')

// константы темплейта
const template = document.querySelector('.cards_template').content // находим весь темплейт и получаем доступ к его контенту

// универсальная функция открытия попапов
// в функцию передали параметр попап, далее в уникальных ф-ях вместо popup будем ставить константы каждого попапа
function openPopup(popup) {
    popup.classList.add('popup_opened')
} 

// универсальная функция закрытия попапов
// в функцию передали параметр попап, далее в уникальных ф-ях вместо popup будем ставить константы каждого попапа
function closePopup(popup) {
    popup.classList.remove('popup_opened')
}

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ: вся работа с ним
function openEditPopup() { //функция открытия
    nameEditInput.value = profileEditTitle.textContent
    jobEditInput.value = profileEditSubtitle.textContent
    openPopup(popupEdit)
}
buttonEditPopup.addEventListener('click', openEditPopup) // слушатель кнопки открытия попапа редактирования профиля

function closeEditPopup() { //функция закрытия
    closePopup(popupEdit)
}
closeEdit.addEventListener('click', closeEditPopup) // слушатель кнопки закрытия попапа редактирования профиля

function handleEditFormSubmit(evt) { // функция обработки отправки формы редактирования и отмена стандартной отправки на сервер
    evt.preventDefault()
    profileEditTitle.textContent = nameEditInput.value
    profileEditSubtitle.textContent = jobEditInput.value
    closeEditPopup()
}
formElement.addEventListener('submit', handleEditFormSubmit) // слушатель формы инпутов (кнопка "сохранить")

// // ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ С МЕСТОМ: вся работа с ним !!не сделано пока не пропишу массив!!
// function openAddPopup() { //функция открытия
//     openPopup(popupAdd)
// }
// buttonAddPopup.addEventListener('click', openAddPopup) // слушатель кнопки открытия попапа добавления новой карточки с местом
//
// function closeAddPopup() { //функция закрытия
//     closePopup(popupAdd)
// }
// closeAdd.addEventListener('click', closeAddPopup) // слушатель кнопки закрытия попапа добавления новой карточки с местом
//
// function f() { //функция создания новой карточки для добавления
//
// }
//
// function f1() { // функция клона массива для создания новой карточки для добавления
//
// }
//
// function f2() { // функция обработки отправки формы редактирования и отмена стандартной отправки на сервер
//
// }
// addFormButton.addEventListener('submit', funk) // слушатель формы инпутов добавления новой карточки

// // ПОПАП ОТКРЫТИЯ КАРТОЧКИ НА ВЕСЬ ЭКРАН !!не сделано пока не пропишу массив!!
// function openFullScreenPopup() {
//     openPopup(popupFullScreen)
//     imageFullScreenInput.src = templateCardImage.src
//     captionFullScreenInput.value = templateCardTitle.textContent
// }


// РАБОТА С ТЕМПЛЕЙТОМ (массив карточек)
function frameArray() {
    initialCards.forEach(frameCardsTemplate)
}
function frameCardsTemplate(card) { // функция клонирования карточек темплейта
    const cardTemplate = template.querySelector('.cards__item').cloneNode(true) // клонировали li и объявили пее в переменную
    const templateCardImage = template.querySelector('.cards__image')
    const templateCardTitle = template.querySelector('.cards__title')
    templateCardImage.src = card.link // нашли картинку в темплей и навесили на нее ссылку из массива
    templateCardTitle.textContent = card.name // нашли название места и навесили на него имя из массива

    cardsElement.append(cardTemplate)
}

frameArray()



















