class Api {
  constructor({ baseUrl, headers, name, about }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._name = name;
    this._about = about;
  }

  getAppInfo() {
    // TODO call getUserInfo in this array
    return Promise.all([this.getInitialCards()]);
    return Promise.all([this.getUserInfo()]);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }

  editUserInfo({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Error: ${res.status}`);
    });
  }
}

export default Api;
