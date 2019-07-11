module.exports = function(app) {

	var api = app.api.email;

	app.route('/v1/email')
		.get(api.lista)
		.post(api.adiciona);

	app.route('/v1/email/:id')
		 .put(api.atualiza);
};
