export default class UserInfo {
    constructor({nameEditInput, jobEditInput}) {
        this._nameEditInput = document.querySelector(nameEditInput)
        this._jobEditInput = document.querySelector(jobEditInput)
    }

    getUserInfo() {
        return {
            profileEditTitle: this._nameEditInput.textContent,
            profileEditSubtitle: this._jobEditInput.textContent
        }
    }

    setUserInfo(profileEditTitle, profileEditSubtitle) {
        this._nameEditInput.textContent = profileEditTitle;
        this._jobEditInput.textContent = profileEditSubtitle;
    }
}