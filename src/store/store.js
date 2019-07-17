const store = {
  _username: '',
  _role:'',
  _token: '',
  isLogged() {
    return this.token;
  },
  set username (str) {
    this._username = str;
    localStorage.setItem('username',str);
  },
  get username () {
    return this._username || localStorage.getItem('username');
  },
  set token (str) {
    this._token = str;
    localStorage.setItem('token',str);
  },
  get token () {
    return this._token || localStorage.getItem('token');
  },
  set role (str) {
    this._role = str;
    localStorage.setItem('role',str);
  },
  get role () {
    return this._role || localStorage.getItem('role');
  },

}
export default store;
