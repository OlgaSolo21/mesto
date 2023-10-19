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
    popupAddFormValidation, popupEditFormValidation, popupUpdateAvatarValidation,
} from './utils/constants.js'
import Api from "./components/Api.js";
import PopupWithFormDeleteCard from "./components/PopupWithFormDeleteCard.js";

// сделать запрос к серверу
const apiConfig = {
    url: 'https://mesto.nomoreparties.co/v1/cohort-77',
    headers: {
        authorization: '7f52bf50-52cc-48bd-9c80-c48495da8ea4',
        'Content-Type': 'application/json'
    }
}
const api = new Api(apiConfig)
let userId
let cardId

// отрисовываем всю страницу
Promise.all([api.getUserProfile(), api.getInitialCards()])
    .then(([userElement, itemCard]) => {
        userId = userElement._id;
        cardId = itemCard._id
        userInfo.setUserInfo(userElement);
        section.renderItems(itemCard);
    })
    .catch((err) => {
        console.log(`Ошибка: ${err}`)
    })

// СОЗДАНИЕ КАРТОЧКИ
function createCard(data) {
    const card = new Card( //экземпляр класса Card чтобы шаблон карточки получить
        '.cards_template',
        {
            data: data,
            userId: userId,
            cardId: cardId,
            owner: {_id: userId},
            likes: data.likes,
            _id: data._id,
            handleCardFullscreen: openFullScreenPopup, // тут функция отурытия фото на весь экран
            handleSetLike: (cardId) => { // тут функция отображения лайков
                api.setLikeCardPut(cardId)
                    .then((data) => {
                        card.changeAmountLikes(data)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            handleDeleteLike: (cardId) => { // тут фукция удаления лайков
                api.deleteLikeCard(cardId)
                    .then((data) => {
                        card.changeAmountLikes(data)
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
            trashCardItem: (cardId) => {// тут фуекция удаления карточки на корзину
                popupDeleteCard.open()
                popupDeleteCard.submitDeleteCallback(() => {
                    api.deleteCard(cardId)
                        .then(() => {
                            popupDeleteCard.close()
                            card.removeCard()
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                })
            },
        })
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
        popupAddForm.renderLoadingUX(true)
        api.addNewCardPost(data)
            .then((res) => {
                section.addItem(createCard(res)) // section отрисовывает новую карточку в разметку
                popupAddForm.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupAddForm.renderLoadingUX(false)
            })
    }
})
buttonAddPopup.addEventListener('click', () => {
    validateAddPopup.resetButtonPopup()
    popupAddForm.open()
}) // слушатель кнопки открытия попапа добавления новой карточки с местом
popupAddForm.setEventListeners() // слушатели закрытия


// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
const userInfo = new UserInfo({ // создаем экземпляр класса UserInfo
    nameEditInput: '.profile__title',
    jobEditInput: '.profile__subtitle',
    avatarEditProfile: '.profile__avatar'
})

const popupEditForm = new PopupWithForm({
    popupSelector: '#edit-profile',
    handleFormSubmitCallback: (data) => {
        popupEditForm.renderLoadingUX(true)
        api.editProfilePatch(data)
            .then((res) => {
                userInfo.setUserInfo(res)
                popupEditForm.close()
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupEditForm.renderLoadingUX(false)
            })
    }
})

// слушатель кнопки открытия попапа редактирования профиля
buttonEditPopup.addEventListener('click', () => {
    validateEditPopup.resetButtonPopup()
    const userElement = userInfo.getUserInfo()
    nameEditInput.value = userElement.name
    jobEditInput.value = userElement.about
    popupEditForm.open()
})
popupEditForm.setEventListeners() // слушатели попапа редактирования

// ПОПАП ИЗМЕНЕНИЯ АВАТАРА
const popupUpdateAvatar = new PopupWithForm({
    popupSelector: '#edit-avatar-profile',
    handleFormSubmitCallback: (data) => {
        popupUpdateAvatar.renderLoadingUX(true)
        api.updateAvatarPatch(data)
            .then((res) => {
                userInfo.setUserInfo(res)
                popupUpdateAvatar.close()
        })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                popupUpdateAvatar.renderLoadingUX(false)
            })
    }
})
avatarEditProfile.addEventListener('click', () => {
    popupUpdateAvatar.open()
    validateUpdateAvatarPopup.resetButtonPopup()
}) // слушатель кнопки открытия попапа редактирования аватара
popupUpdateAvatar.setEventListeners() // слушатели попапа редактирования аватара

// ПОПАП ОТКРЫТИЯ КАРТОЧКИ НА ВЕСЬ ЭКРАН
const fullScreenImage = new PopupWithImage('.popup_fullscreen')
function openFullScreenPopup(img, title) { // функция открытия попап "на весь экран"
    fullScreenImage.open(img, title)
}
fullScreenImage.setEventListeners() // слушатели закрытия фото на весь экран

//ПОПАП УДАЛЕНИЯ КАРТОЧКИ
const popupDeleteCard = new PopupWithFormDeleteCard('#delete-card')
popupDeleteCard.setEventListeners()

// ВАЛИДАЦИЯ ПОЛЕЙ
const validateAddPopup = new FormValidator(configForm, popupAddFormValidation)
validateAddPopup.enableValidation()

const validateEditPopup = new FormValidator(configForm, popupEditFormValidation)
validateEditPopup.enableValidation()

const validateUpdateAvatarPopup = new FormValidator(configForm, popupUpdateAvatarValidation)
validateUpdateAvatarPopup.enableValidation()

// forms.forEach((formElement) => { // экземпляр класса валидации
//     const formValidator = new FormValidator(configForm, formElement)
//     formValidator.enableValidation()
// })