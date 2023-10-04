export default class UserInfo {
    constructor({nameEditInput, jobEditInput}) {
        this._nameEditInput = document.querySelector(nameEditInput)
        this._jobEditInput = document.querySelector(jobEditInput)
    }

    getUserInfo() {
        return {
            name: this._nameEditInput.textContent,
            job: this._jobEditInput.textContent
        }
    }

    setUserInfo(name, job) {
        this._nameEditInput.textContent = name;
        this._jobEditInput.textContent = job;
    }
}