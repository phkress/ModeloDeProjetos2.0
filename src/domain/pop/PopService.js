export default class ClassName {
  constructor(resource) {
    this._resource = resource('v1/pop{/id}');
  }
  lista(){
    return this._resource
    .query()
    .then(res => res.json(), err=>{
      console.log(err);
      throw new Error('Não foi possivel obter a lista de Pops')
    });
  }
  cadastra(pop) {
      if(pop._id) {

          return this._resource
              .update({ id: pop._id}, pop);

      } else {
          return this._resource
              .save(pop);
      }

  }
}
