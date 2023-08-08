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

// находим список ul
const cardsElement = document.querySelector('.cards__elements')
// находим template по id и получаем достум в контенту
const template = document.querySelector('#cards').content

//перебираем массив и добавляем карточки
initialCards.forEach(function (card) {
    // находим и клонируем содержимое темплейта
    const templateElement = template.querySelector('.cards__item').cloneNode(true)
    // наполняем содержимым темплейт
    templateElement.querySelector('.cards__image').src = card.link
    templateElement.querySelector('.cards__title').textContent = card.name
    // отображаем на странице массив
    cardsElement.append(templateElement)
    // настраиваем кнопку лайк по тренажеру урока 8 тема 3
    templateElement.querySelector('.cards__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('cards__like_active');
    })
    // вписываем функцию удаления карточки
    deleteCard(templateElement);
})

// настраиваем кнопку удаления карточки
function deleteCard(card) {
    const trashButton = card.querySelector('.cards__trash')
    trashButton.addEventListener('click', trashCard)
}
function trashCard(evt) {
    const trashCardItem = evt.target.closest('.cards__item');
    trashCardItem.remove();
}





