import './pages/index.css'; // добавьте импорт главного файла стилей
// импорты модулей
import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js'
import {initialCards} from './components/initialCards.js'
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from "./components/UserInfo.js";
import {
    configForm,
    forms,
    avatarEditProfile,
    buttonEditPopup,
    nameEditInput,
    jobEditInput,
    buttonAddPopup,
    titleAddInput,
    imageAddInput
} from './utils/constants.js'

// ООП СОЗДАНИЕ КАРТОЧКИ
//8пр - создание массива карточек через section
function createCard(data) { // функцию создания карточки, используем публичный метод из класса
    const card = new Card(data, '.cards_template', openFullScreenPopup) //экземпляр класса Card чтобы шаблон карточки получить
    return card.generateCard() // возвращаем функцию публикации карточки
}

const section = new Section({ //создание карточек из класса section
    items: initialCards, // это массив карточек
    renderer: (item) => { //У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
        const cardElement = createCard(item) // используем функцию создания НОВОЙ карточки и добавление ее в начало контейнера
        section.addItem(cardElement)
    }
}, '.cards__elements')
section.renderItems() // отрисовываем карточки

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const userInfo = new UserInfo({ // создаем экземпляр класса UserInfo
    nameEditInput: '.profile__title',
    jobEditInput: '.profile__subtitle'
})

const popupEditForm = new PopupWithForm({
    popupSelector: '#edit-profile',
    handleFormSubmitCallback: (data) => {
        userInfo.setUserInfo(data.UserName, data.UserJob)
        popupEditForm.close()
    }
})

const popupEditAvatarForm = new PopupWithForm({
    popupSelector: '#edit-avatar-profile',
    handleFormSubmitCallback: () => {
        popupEditAvatarForm.open()
    }
})

function openEditPopup() {
    const userElement = userInfo.getUserInfo()
    nameEditInput.value = userElement.profileEditTitle
    jobEditInput.value = userElement.profileEditSubtitle
    popupEditForm.open()
}

function openEditAvatar() {
    popupEditAvatarForm.open()
}

avatarEditProfile.addEventListener('click', openEditAvatar)
popupEditAvatarForm.setEventListeners()

buttonEditPopup.addEventListener('click', openEditPopup) // слушатель кнопки открытия попапа редактирования профиля
popupEditForm.setEventListeners() // слушатели закрытия попапа редактирования

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ С МЕСТОМ
const popupAddForm = new PopupWithForm({
    popupSelector: '#add-card',
    handleFormSubmitCallback: (data) => {
        const newCard = {name:data[titleAddInput.name], link:data[imageAddInput.name]}
        const cardAddElement = createCard(newCard);
        section.addItem(cardAddElement)
        popupAddForm.close()
    }
},)
function openAddPopup() { //функция открытия
    popupAddForm.open()
}
buttonAddPopup.addEventListener('click', openAddPopup) // слушатель кнопки открытия попапа добавления новой карточки с местом
popupAddForm.setEventListeners() // слушатели закрытия

// ПОПАП ОТКРЫТИЯ КАРТОЧКИ НА ВЕСЬ ЭКРАН
const fullScreenImage = new PopupWithImage('.popup_fullscreen')
function openFullScreenPopup(img, title) { // функция открытия попап "на весь экран"
    fullScreenImage.open(img, title)
}
fullScreenImage.setEventListeners() // слушатели закрытия фото на весь экран


forms.forEach((formElement) => { // экземпляр класса валидации
    const formValidator = new FormValidator(configForm, formElement)
    formValidator.enableValidation()
})