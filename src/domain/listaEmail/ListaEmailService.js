export default class ListaEmailService {

  constructor(resource){
    this._resource = resource('v1/email{/id}');
  }
  lista() {
      return this._resource
          .query()
          .then(res => res.json(), err => {
              console.log(err);
              throw new Error('Não foi possível obter a lsitagem de email');
          });
  }
  cadastra(listEmail) {
      if(listEmail._id) {
          return this._resource
              .update({ id: listEmail._id}, listEmail);
      } else {
          return this._resource
              .save(listEmail);
      }

  }
}
