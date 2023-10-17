export default class UserInfo {
    constructor({nameEditInput, jobEditInput}) {
        this._nameEditInput = document.querySelector(nameEditInput)
        this._jobEditInput = document.querySelector(jobEditInput)
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
    }
}