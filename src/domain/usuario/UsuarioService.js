export default class UsuarioService {
  constructor(resource) {
    this._resource = resource('v1/usuario{/id}');
  }
  listaUsuario(){
    return this._resource
    .query()
    .then(res => res.json(), err=>{
      console.log(err);
      throw new Error('Não foi possivel obter a lista de Usuario');
    });
  }
  mostrarUsuario(){
    return this._resource
    // .query()
    .get({'id': true})
    .then(res => res.json(), err=>{
      console.log(err);
      throw new Error('Não foi possivel obter o Usuario');
    });
  }
  cadastra(usuario) {
      if(usuario._id) {
          return this._resource
              .update({ id: usuario._id}, usuario);
      } else {
          return this._resource
              .save(usuario);
      }
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
