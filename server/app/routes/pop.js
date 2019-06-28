module.exports = function(app) {

	var api = app.api.pop;

	app.route('/v1/pop')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/v1/pop/:id')
		// .get(api.buscaPorId)
		// .delete(api.removePorId)
		// .put(api.atualiza);
};
