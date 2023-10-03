// импорты модулей
import Card from './Card.js'
import FormValidator from './FormValidator.js'
import Section from './Section.js'
import {initialCards} from './initialCards.js'
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';

export const configForm = { // конфиг формы для удобства
    popupSelector: '.popup',
    formSelector: '.popup__content',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled', // класс неактивной кнопки
    inputErrorClass: 'popup__input_type_error', // класс невалидного поля
};
// основная константа для темплейта (ul)
const cardsElement = document.querySelector('.cards__elements');
// основная константа всех форм
const forms = document.querySelectorAll('.popup__content')
// попап редактирования профиля
const buttonEditPopup = document.querySelector('.profile__edit-button') // кнопка карандаш редактирования профиля
const profileEditTitle = document.querySelector('.profile__title') // строка "имя" профиля
const profileEditSubtitle = document.querySelector('.profile__subtitle') // строка "о себе" профиля
const popupEdit = document.querySelector('#edit-profile') // сам попап редактирования профиля
const formEditElement = document.querySelector('.popup__edit-form') // форма редактирования профиля (форма с инпутами)
const nameEditInput = formEditElement.querySelector('.popup__input_type_name') // инпут редактирования имени профиля
const jobEditInput = formEditElement.querySelector('.popup__input_type_job') // инпут редактирования "о себе"
// попап добавления новой карточки с местом
const buttonAddPopup = document.querySelector('.profile__add-button') // кнопка "плюс" добавления новой карточки с местом
const popupAdd = document.querySelector('#add-card') // сам попап добавления новой карточки
const formAddInput = document.querySelector('.popup__add-form') // форма добавления карточки (форма с инпутами)
const titleAddInput = formAddInput.querySelector('.popup__input_type_place') // инпут добавления названия места
const imageAddInput = formAddInput.querySelector('.popup__input_type_link') // инпут добавления ссылки на картинку места
// попап открытия карточки на весь экран
const popupFullScreen = document.querySelector('#fullscreen-card') // сам попап открытия картинки на весь экран
const imageFullScreenInput = popupFullScreen.querySelector('.popup__image') // инпут картинки карточки места
const captionFullScreenInput = popupFullScreen.querySelector('.popup__caption') // инпут подписи места к картинке

// УНИВЕРСАЛЬНЫЕ ФУНКЦИИ
// открытия попапов
// в функцию передали параметр попап, далее в уникальных ф-ях вместо popup будем ставить константы каждого попапа
// function openPopup(popup) {
//     popup.classList.add('popup_opened')
//     document.addEventListener('keydown', closeEscPopup)
// }

// УНИВЕРСАЛЬНЫЕ ФУНКЦИИ
// закрытия попапов
// function closePopup(popup) {
//     popup.classList.remove('popup_opened')
//     document.removeEventListener('keydown', closeEscPopup)
// }
// закоммичено - из пр5 2й вариант поиска крестиков (подробнее в ревью 6пр рекомендации)
// document.querySelectorAll('.popup__close').forEach(button => {
//     const popup = button.closest('.popup'); // нашли родителя с нужным классом, используем метод closest
//     button.addEventListener('click', () => closePopup(popup)); // закрыли попап
// });

// функция закрытия попапов на оверлей и по крестику (рекомендация ревью)
// const popups = Array.from(document.querySelectorAll('.popup')) // из комментариев ревью - ищем все попапы
// popups.forEach((popup) => { // исп цикл устанавливаем слушатель на все попапы в глобальной зоне видимости (подробнее в уомментах ревью)
//     popup.addEventListener('click', closeByClickPopup)
// })

// поиск крестиков - вариант от ревью
// function closeByClickPopup(evt) {
//     if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
//         closePopup(evt.currentTarget)
//     }
// }

// функция закрытия попапов на esc
// function closeEscPopup(evt) {
//     if (evt.key === 'Escape') {
//         const popupOpened = document.querySelector('.popup_opened')
//         closePopup(popupOpened)
//     }
// }

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
function handleEditFormSubmit(evt) { // функция обработки отправки формы редактирования и отмена стандартной отправки на сервер
    evt.preventDefault()
    profileEditTitle.textContent = nameEditInput.value
    profileEditSubtitle.textContent = jobEditInput.value
    closeEditPopup()
}
formEditElement.addEventListener('submit', handleEditFormSubmit) // слушатель формы инпутов (кнопка "сохранить")

// ООП СОЗДАНИЕ КАРТОЧКИ
//8пр - создание массива карточек через section
const section = new Section({ //создание карточек из класса section
    items: initialCards, // это массив карточек
    renderer: (item) => { //У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
        const cardElement = createCard(item) // используем функцию создания НОВОЙ карточки и добавление ее в начало контейнера
        section.addItem(cardElement)
    }
}, '.cards__elements')

section.renderItems()

function createCard(data) { // функцию создания карточки, используем публичный метод из класса
    const card = new Card(data, '.cards_template', openFullScreenPopup)
    return card.generateCard()
}

// ПОПАП ОТКРЫТИЯ КАРТОЧКИ НА ВЕСЬ ЭКРАН
const fullScreenImage = new PopupWithImage('.popup_fullscreen')
function openFullScreenPopup(img, title) { // функция открытия попап "на весь экран"
    fullScreenImage.open(img, title)
}
fullScreenImage.setEventListeners()

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ С МЕСТОМ: вся работа с ним
const popupAddForm = new PopupWithForm({
    popupSelector: '#add-card',
    handleFormSubmitCallback: (data) => {
        const cardAddElement = createCard(data)
        section.addItem(cardAddElement)
        popupAddForm.close()
    }
},)
function openAddPopup() { //функция открытия
    popupAddForm.open()
}
buttonAddPopup.addEventListener('click', openAddPopup) // слушатель кнопки открытия попапа добавления новой карточки с местом
popupAddForm.setEventListeners() // слушатели закрытия

// function closeAddPopup() { //функция закрытия
//     closePopup(popupAdd)
// }

// function createNewCard(cardNew) { //функция создания новой карточки для добавления
//     section.addItem(createCard(cardNew)) //используе метод addItem классф section и функцию создания карточки
// }

// function handleFormAddSubmit(evt) { // функция обработки отправки формы добавления карточки и отмена стандартной отправки на сервер
//     evt.preventDefault();
//     const cardNewSave = {name: titleAddInput.value, link: imageAddInput.value};
//     createNewCard(cardNewSave); // переменная - cardNewSave со значениями инпутов (объект)
//     // titleAddInput.value = '' // стираем данные для след карточки - 2й вариант очистки полей
//     // imageAddInput.value = ''
//     closeAddPopup()
//     formAddInput.reset() //  рекомендация ревью 6пр - очистить форму исп меньше кода (метод reset)
// }

//formAddInput.addEventListener('submit', handleFormAddSubmit) // слушатель формы инпутов добавления новой карточки

forms.forEach((formElement) => { // экземпляр класса валидации
    const formValidator = new FormValidator(configForm, formElement)
    formValidator.enableValidation()
})