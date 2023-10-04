import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupSelector.querySelector('.popup__image')
        this._popupCaption = this._popupSelector.querySelector('.popup__caption')
    }

    open(img, title) {
        super.open();
        this._popupImage.src = img
        this._popupCaption.textContent = title
        this._popupImage.alt = title
    }
}