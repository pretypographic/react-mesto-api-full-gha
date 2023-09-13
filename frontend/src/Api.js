class Api {
    constructor({ baseUrl, headers, handleError }) {
        this.baseUrl = baseUrl;
        this.headers = headers;
        this._handleError = handleError;
    }

    _getJSON(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Error: ${res.status} - ${res.statusText}`);
    }

    getProfileInfo() {
        return fetch(`${this.baseUrl}/users/me`, { headers: this.headers })
            .then(this._getJSON);
    }

    patchProfileInfo(profile) {
        return fetch(`${this.baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: `${profile.name}`,
                about: `${profile.about}`
            })
        })
            .then(this._getJSON);
    }

    patchProfileAvatar(link) {
        return fetch(`${this.baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: link
            })
        })
            .then(this._getJSON);
    }

    getInitialCards() {
        return fetch(`${this.baseUrl}/cards`, {
            headers: this.headers
        })
            .then(this._getJSON);
    }

    postNewCard(card) {
        return fetch(`${this.baseUrl}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: `${card.name}`,
                link: `${card.link}`
            })
        })
            .then(this._getJSON);
    }

    deleteCard(_id) {
        return fetch(`${this.baseUrl}/cards/${_id}`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._getJSON);
    }

    putLike(_id) {
        return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
            method: 'PUT',
            headers: this.headers
        })
            .then(this._getJSON);
    }

    deleteLike(_id) {
        return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
            method: 'DELETE',
            headers: this.headers
        })
            .then(this._getJSON);
    }

    errorMessege(err) {
        console.log(err);
        // this._handleError(err);
    }
}

const api = new Api({
    baseUrl: 'https://api.wecto.nomoredomainsicu.ru',
    headers: {
        authorization: '534c8dff-99cf-47b7-8e1b-d4071b0c71b2',
        'Content-Type': 'application/json'
    },
    handleError: (err) => {
        console.log(err);
    }
});

export { api }