export default class UserInfo {
    constructor({nameEditInput, jobEditInput, avatarEditProfile}) {
        this._nameEditInput = document.querySelector(nameEditInput)
        this._jobEditInput = document.querySelector(jobEditInput)
        this._avatar = document.querySelector(avatarEditProfile)
    }

    getUserInfo() {
        return {
            name: this._nameEditInput.textContent,
            about: this._jobEditInput.textContent
        }
    }

    setUserInfo(data) {//метод берет значения name и about, и записывает их в разметку
        this._nameEditInput.textContent = data.name;
        this._jobEditInput.textContent = data.about;
        this._avatar.src = data.avatar
    }
}