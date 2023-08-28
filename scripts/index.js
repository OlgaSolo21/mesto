const cardsElement = document.querySelector('.cards__elements'); // основная константа для темплейта (ul)

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
const formAddForm = document.querySelector('.popup__add-form') // форма добавления карточки (форма с инпутами)
const titleAddInput = formAddForm.querySelector('.popup__input_type_place') // инпут добавления названия места
const imageAddInput = formAddForm.querySelector('.popup__input_type_link') // инпут добавления ссылки на картинку места
const buttonSubmit = formAddForm.querySelector('.popup__submit') // кнопка "создать" в форме

// попап открытия карточки на весь экран
const popupFullScreen = document.querySelector('#fullscreen-card') // сам попап открытия картинки на весь экран
const imageFullScreenInput = popupFullScreen.querySelector('.popup__image') // инпут картинки карточки места
const captionFullScreenInput = popupFullScreen.querySelector('.popup__caption') // инпут подписи места к картинке

// константы темплейта
const template = document.querySelector('.cards_template').content // находим весь темплейт и получаем доступ к его контенту

// универсальная функция открытия попапов
// в функцию передали параметр попап, далее в уникальных ф-ях вместо popup будем ставить константы каждого попапа
function openAllPopup(popup) {
    popup.classList.add('popup_opened')
}

// универсальная функция закрытия попапов (по рекомендации от ревью - ставим закрытие всех попапов на крестик через цикл)
    // Кнопка находится внутри попапа, т.е. попап является родителем этой кнопки.
    // У попапа есть универсальный класс "popup", значит нам нужен родитель кнопки с классом "popup"
    // Для этого есть специальный метод .closest()
function closeAllPopup(buttonsPopup) {
    buttonsPopup.classList.remove('popup_opened')
}
document.querySelectorAll('.popup__close').forEach(button => {
    const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом, используем метод closest
    button.addEventListener('click', () => closeAllPopup(buttonsPopup)); // закрыли попап
});

// ПОПАП РЕДАКТИРОВАНИЯ ПРОФИЛЯ: вся работа с ним
function openEditPopup() { //функция открытия
    nameEditInput.value = profileEditTitle.textContent
    jobEditInput.value = profileEditSubtitle.textContent
    openAllPopup(popupEdit)
}
buttonEditPopup.addEventListener('click', openEditPopup) // слушатель кнопки открытия попапа редактирования профиля

function closeEditPopup() { //функция закрытия
    closeAllPopup(popupEdit)
}
function handleEditFormSubmit(evt) { // функция обработки отправки формы редактирования и отмена стандартной отправки на сервер
    evt.preventDefault()
    profileEditTitle.textContent = nameEditInput.value
    profileEditSubtitle.textContent = jobEditInput.value
    closeEditPopup()
}
formEditElement.addEventListener('submit', handleEditFormSubmit) // слушатель формы инпутов (кнопка "сохранить")

// РАБОТА С ТЕМПЛЕЙТОМ (массив карточек)
initialCards.forEach(function(card) { // перебираем 6 карточек массива и рендерим их на страницу
    const cards = frameCardsTemplate(card) // константа для append
    cardsElement.append(cards)
});

function frameCardsTemplate(card) { // функция клонирования карточек темплейта
    const cardTemplate = template.querySelector('.cards__item').cloneNode(true) // клонировали li и объявили пее в переменную
    const templateCardImage = cardTemplate.querySelector('.cards__image') // находим картинку места в темплейте и присваиваем ей переменную
    const templateCardTitle = cardTemplate.querySelector('.cards__title') // находим наименование места в темплейте и присваиваем ему переменную
    templateCardImage.src = card.link // нашли картинку в темплей и навесили на нее ссылку из массива
    templateCardImage.alt = card.name // нашли алт для изображений (см закладку со статьей от ревью)
    templateCardTitle.textContent = card.name // нашли название места и навесили на него имя из массива
    cardTemplate.querySelector('.cards__trash').addEventListener('click', () => { // корзина
        cardTemplate.remove()
    })
    cardTemplate.querySelector('.cards__like').addEventListener('click', function (evt) { // кнопка лайк
        evt.target.classList.toggle('cards__like_active')
    })
    cardTemplate.querySelector('.cards__image').addEventListener('click', () => { // слушатель на картинку для открытия фото на весь экран
        openFullScreenPopup (card) // комментарий ревью - подумать как реализовать (done)
        // "Можно передавать в функцию объект с данными, так-же как вы их приняли в функцию создания карточки, будет здорово."
    })
    return cardTemplate
}

// ПОПАП ДОБАВЛЕНИЯ НОВОЙ КАРТОЧКИ С МЕСТОМ: вся работа с ним
function openAddPopup() { //функция открытия
    openAllPopup(popupAdd)
}
buttonAddPopup.addEventListener('click', openAddPopup) // слушатель кнопки открытия попапа добавления новой карточки с местом

function closeAddPopup() { //функция закрытия
    closeAllPopup(popupAdd)
}

function createNewCard(cardNew) { //функция создания новой карточки для добавления
    const cardAddNew = frameCardsTemplate(cardNew)
    cardsElement.prepend(cardAddNew)
}

function handleFormAddSubmit(evt) { // функция обработки отправки формы добавления карточки и отмена стандартной отправки на сервер
    evt.preventDefault();
    const cardNewSave = {name: titleAddInput.value, link: imageAddInput.value};
    createNewCard(cardNewSave); // переменная - cardNewSave со значениями инпутов (объект)
    titleAddInput.value = '' // стираем данные для след карточки
    imageAddInput.value = ''
    closeAddPopup()
    buttonSubmit.classList.add('popup__submit_disabled')
}

formAddForm.addEventListener('submit', handleFormAddSubmit) // слушатель формы инпутов добавления новой карточки

// ПОПАП ОТКРЫТИЯ КАРТОЧКИ НА ВЕСЬ ЭКРАН
function openFullScreenPopup(card) { // функция открытия попап "на весь экран"
    openAllPopup(popupFullScreen)
    imageFullScreenInput.src = card.link
    captionFullScreenInput.textContent = card.name
    imageFullScreenInput.alt = card.name // нашли алт для изображений (см закладку со статьей от ревью)
}
