module.exports = function(app){

  var api = app.api.usuario;

  app.route('/v1/usuario')
     .get(api.usuario)
  app.route('/v1/usuario/:id')
     .put(api.atualiza)
};
