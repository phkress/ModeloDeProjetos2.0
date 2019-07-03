export default class FormularioService {

  constructor(resource){
    this._resource = resource('v1/formulario{/id}');
  }
  lista() {
      return this._resource
          .query()
          .then(res => res.json(), err => {
              console.log(err);
              throw new Error('Não foi possível obter os formularios');
          });
  }
  cadastra(form) {
      if(form._id) {

          return this._resource
              .update({ id: form._id}, form);

      } else {
          return this._resource
              .save(form);
      }

  }
  busca(id) {
      return this._resource
          .get({ id })
          .then(res => res.json());
  }
  apaga(id){
    return this._resource
        .delete({id})
        .then(null,err =>{
          console.log(err);
          throw new Error("Não foi possível excluir o formulario")
        })
  }
}
