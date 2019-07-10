module.exports = function(app){

  var api = app.api.usuario;

  app.route('/v1/usuario')
     .get(api.listaUsuario)
 		 .post(api.adiciona);

  app.route('/v1/usuario/:id')
     .get(api.usuario)
     .put(api.atualiza)
 		  .delete(api.removePorId)
};
