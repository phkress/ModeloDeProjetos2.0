module.exports = (app) =>{

  var api = app.api.teste;
  //app.get('/testeFind', api.lista);
  //app.get('/testeEmail', api.enviarEmail);
  app.get('/testeSetTo', api.setTo);
  // app.get('/testeFindForm', api.listaForm);
  // app.get('/testeFindFormName', api.listaNome);
  //app.get('/testeAdd', api.adiciona);
  // app.get('/v1/formulario/imprimir/:id', api.print);
  // app.post('/autenticar', api.log);
  // app.get('*',function (req, res) {
  //       res.redirect('/');
  //   });
};
