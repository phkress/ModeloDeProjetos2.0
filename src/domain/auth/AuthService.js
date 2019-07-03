
export default class AuthService {

  constructor(resource){
    this._resource = resource('autenticar');
  }
  login(user){
    return this._resource
    .save(user)
    .then(res => res, err => {
        console.log(err);
        throw new Error('Não foi possível validar credencial');
    });
  }
}
