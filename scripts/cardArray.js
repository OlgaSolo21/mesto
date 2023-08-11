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

// находим константы массива и попап открытия фото
const cardsElement = document.querySelector('.cards__elements')
const template = document.querySelector('.card_template').content
const openCardItem = document.querySelector('.popup_img')
const openPopupText = openCardItem.querySelector('.open__text')
const openFoto = document.querySelector('.open__img')
const imageLink = document.querySelector('.cards__image')
const textName = document.querySelector('.cards__title')
// константы кнопки addbutton 5пр
const addButtonProfile = document.querySelector('.profile__add-button')
const addPopupButton = document.querySelector('.popup_add')
const closePopupButton = addPopupButton.querySelector('.popup_button')
const addFormButton = document.querySelector('.add_card')
const namePlaceAddCard = addFormButton.querySelector('.popup__input_type_place')
const linkPlaceAddCard = addFormButton.querySelector('.popup__input_type_link')

// функция рендеринга массива
function renderArray() {
    initialCards.forEach(renderCard)
}
//функция рендеринга карточек из массива (перебираем массив и добавляем карточки, кнопка лайк, удалить, открытие фото)
function renderCard(element) {
    // находим и клонируем содержимое темплейта
    const templateElement = template.querySelector('.cards__item').cloneNode(true)
    // наполняем содержимым темплейт
    const imageLink = templateElement.querySelector('.cards__image')
    imageLink.src = element.link
    const textName = templateElement.querySelector('.cards__title')
    textName.textContent = element.name
    // создаем кнопку удаления и вешаем на нее слушатель
    templateElement.querySelector('.cards__trash').addEventListener('click', () => {
        templateElement.remove()
    })
    // создаем кнопку лайка и вешаем на нее слушатель
    templateElement.querySelector('.cards__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__like_active');
    })
    // создаем попап открытие фото
    imageLink.addEventListener('click', () => {
        openFullCard ()
    })
    function openFullCard() {
        openFoto.src = imageLink.src
        openPopupText.value = textName.textContent
        openCardItem.classList.add('popup_opened')
    }
    // функция закрытия попапа с фото
    const closeImg = document.querySelector('.popup_close-img')
    closeImg.addEventListener('click', () => {
        openCardItem.classList.remove('popup_opened')
    })

    addImgPopup (element.link, element.name)
    // отображаем на странице массив
    cardsElement.append(templateElement)
}
renderArray()

// функция открытия попап кнопки добавления
function openPopupAdd() {
    addPopupButton.classList.add('popup_opened')
}
// функция закрытия попап кнопки добавления
function closePopupAdd() {
    addPopupButton.classList.remove('popup_opened')
}

function addImgPopup(evt) {
    const addNewCard = template.cloneNode(true)
    addNewCard.querySelector('.cards__image').src = linkPlaceAddCard.value
    addNewCard.querySelector('.cards__title').textContent = namePlaceAddCard.value
    evt.preventDefault()
    namePlaceAddCard.value = ''
    linkPlaceAddCard.src = ''
    closePopupAdd()
    cardsElement.prepend(addNewCard)
}

// вешаем слушатель на попап добавления фото
addButtonProfile.addEventListener('click', openPopupAdd)
closePopupButton.addEventListener('click', closePopupAdd)
addFormButton.addEventListener('submit', addImgPopup)
