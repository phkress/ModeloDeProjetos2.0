module.exports = function(app) {

	var api = app.api.formulario;

	app.route('/v1/formulario')
		// .get(api.lista)
		.get(api.listarNome)
		.post(api.adiciona);

	app.route('/v1/formulario/:id')
		.get(api.buscaPorId)
		.delete(api.removePorId)
		.put(api.atualiza);

 app.get('/v1/formulario/imprimir/:id', api.print);
};
