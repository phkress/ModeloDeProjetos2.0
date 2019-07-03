const store = {
  _username: '',
  _token: '',
  isLogged() {
    return this.token;
  },
  set username (str) {
    this._username = str
    localStorage.setItem('username',str)
  },
  get username () {
    return this._username || localStorage.getItem('username')
  },

  set token (str) {
    this._token = str
    localStorage.setItem('token',str)
  },
  get token () {
    return this._token || localStorage.getItem('token')
  }

}
export default store;
