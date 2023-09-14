const baseUrl = 'https://api.wecto.nomoredomainsicu.ru';

function sendRequest(endpoint, method, headers, body) {
    const options = {
        method,
        headers,
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    return fetch(`${baseUrl}${endpoint}`, options)
        .then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Error: ${res.status} - ${res.statusText}.`);
        });
}

function getProfileInfo(token) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    return sendRequest('/users/me', 'GET', headers);
}

function patchProfileInfo(token, profile) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const body = {
        name: `${profile.name}`,
        about: `${profile.about}`
    };

    return sendRequest('/users/me', 'PATCH', headers, body);
}

function patchProfileAvatar(token, link) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const body = {
        avatar: link
    };

    return sendRequest('/users/me/avatar', 'PATCH', headers, body);
}

function getInitialCards(token) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    return sendRequest('/cards', 'GET', headers);
}

function postNewCard(token, card) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    const body = {
        name: `${card.name}`,
        link: `${card.link}`
    };

    return sendRequest('/cards', 'POST', headers, body);
}

function deleteCard(token, _id) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    return sendRequest(`/cards/${_id}`, 'DELETE', headers);
}

function putLike(token, _id) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    return sendRequest(`/cards/${_id}/likes`, 'PUT', headers);
}

function deleteLike(token, _id) {
    const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    };

    return sendRequest(`/cards/${_id}/likes`, 'DELETE', headers);
}

function errorMessege(err) {
    console.log(err);
    // this._handleError(err);
}

export {
    getProfileInfo,
    patchProfileInfo,
    patchProfileAvatar,
    getInitialCards,
    postNewCard,
    deleteCard,
    putLike,
    deleteLike,
    errorMessege,
}
