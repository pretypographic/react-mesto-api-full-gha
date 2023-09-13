const baseUrl = 'https://api.wecto.nomoredomainsicu.ru';

function register({ email, password }) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            };
            return Promise.reject(`Error: ${res.status} - ${res.statusText}.`);
        })
};

function authorize({ email, password }) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then((res) => {
            if (res.ok) {
                return res.json();
            };
            return Promise.reject(`Error: ${res.status} - ${res.statusText}.`);
        })
};

function getContent(token) {
    console.log('getContent(1): ', token);
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        }
    })
        .then((res) => {
            console.log('getContent(2): ', res.ok);
            if (res.ok) {
                return res.json();
            };
            return Promise.reject(`Error: ${res.status} - ${res.statusText}.`);
        })
}

export { register, authorize, getContent }