class Api {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getProfileFromServer() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(console.log(localStorage.getItem("jwt")))
      .then(res => this._getResponseData(res))
  }

  getCardsFromServer() {
    return fetch(`${this._baseUrl}/cards `, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res))
  }

  editProfile(userData) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: userData.name,
        about: userData.about
      })
    })
      .then(res => this._getResponseData(res))
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(cardData)
    })
      .then(res => this._getResponseData(res))
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res))
  }

  addLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res))
  }

  removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
    })
      .then(res => this._getResponseData(res))
  }

  updateUserAvatar(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: data.avatar
      }),
    })
      .then(res => this._getResponseData(res))
  }
}

const api = new Api(
  {
    //baseUrl: 'http://localhost:3001',
    baseUrl: 'http://mestob.schizovi.students.nomoredomainsrocks.ru',
    // headers: {
    //   authorization: `Bearer ${localStorage.getItem("jwt")}`,
    //   'Content-Type': 'application/json'
    // }
  })

  // const api = new Api(
  //   {
  //     baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  //     headers: {
  //       authorization: '1e197306-3c80-4dea-abe5-170206fcfc3b',
  //       'Content-Type': 'application/json'
  //     }
  //   })

export default api;
