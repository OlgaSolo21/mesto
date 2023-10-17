import './pages/index.css'; // добавьте импорт главного файла стилей
// импорты модулей
import Card from './components/Card.js'
import FormValidator from './components/FormValidator.js'
import Section from './components/Section.js'
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
import Api from "./components/Api.js";

// сделать запрос к серверу
const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: '7f52bf50-52cc-48bd-9c80-c48495da8ea4',
        'Content-Type': 'application/json'
    }
}
const api = new Api(apiConfig)

// отрисовываем всю страницу
Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then(([userElement, itemCard]) => {
        userInfo.setUserInfo(userElement)
        section.renderItems(itemCard)
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })

// СОЗДАНИЕ КАРТОЧКИ
// функцию создания карточки, используем публичный метод из класса
function createCard(data) {
    const card = new Card(data, '.cards_template', openFullScreenPopup) //экземпляр класса Card чтобы шаблон карточки получить
    return card.generateCard() // возвращаем функцию публикации карточки
}
// создание массива карточек через section
const section = new Section({ //создание карточек из класса section
    renderer: (item) => { //У класса Section нет своей разметки. Он получает разметку через функцию-колбэк и вставляет её в контейнер.
        const cardElement = createCard(item) // используем функцию создания НОВОЙ карточки и добавление ее в начало контейнера
        section.addItem(cardElement)
    }
}, '.cards__elements')

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ С МЕСТОМ
const popupAddForm = new PopupWithForm({
    popupSelector: '#add-card',
    handleFormSubmitCallback: (data) => { // используем api
        console.log(data)
        api.addNewCardPost(data)
            .then((res) => {
                section.addItem(createCard(res)) // section отрисовывает новую карточку в разметку
                popupAddForm.close()
            })
            .catch((err) => {
                console.log(err);
            })
    }
},)
buttonAddPopup.addEventListener('click', () => {popupAddForm.open()}) // слушатель кнопки открытия попапа добавления новой карточки с местом
popupAddForm.setEventListeners() // слушатели закрытия


// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const userInfo = new UserInfo({ // создаем экземпляр класса UserInfo
    nameEditInput: '.profile__title',
    jobEditInput: '.profile__subtitle',
    avatarEditProfile: '.profile__avatar'
})

// слушатель кнопки открытия попапа редактирования профиля
buttonEditPopup.addEventListener('click', () => {
    const userElement = userInfo.getUserInfo()
    nameEditInput.value = userElement.name
    jobEditInput.value = userElement.about
    popupEditForm.open()
})

const popupEditForm = new PopupWithForm({
    popupSelector: '#edit-profile',
    handleFormSubmitCallback: (data) => {
        api.editProfilePatch(data)
            .then((res) => {
                userInfo.setUserInfo(res)
                popupEditForm.close()
            })
            .catch((err) => {
                console.log(err);
            })
    }
})
popupEditForm.setEventListeners() // слушатели попапа редактирования

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