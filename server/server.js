var http = require('http');
var app = require('./config/express');
require('./config/database')('mongodb://localhost/modeloDeProjeto');

http.createServer(app)
.listen(3006, function() {
	console.log('Servidor iniciado');
});
