export const BASE_URL = 'http://localhost:3001';
// export const BASE_URL = 'https://auth.nomoreparties.co';

function checkResponse(res) {
  if (res.ok) {
    return res.json()
  }
  return Promise.reject(`${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
  .then(checkResponse)
}

export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
  .then(checkResponse)
  .then((data) => {
    if (data.token) {
      localStorage.setItem("jwt", data.token)
      return data
    }
    console.log(data.token)
    console.log(localStorage)
  })
}

export const getContent = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
    }
  })
  .then(checkResponse)
}

export const logout = () => {
  console.log('ext')
  return fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    credentials: 'include'
  }).then(res =>
    res.ok ? res.json() : Promise.reject(`Ошибка удаления токена ${res.status} - ${res.statusText}`)
  );
};
