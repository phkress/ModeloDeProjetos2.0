var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
app.use(cors())
app.options('*', cors())

app.set('secret', 'homemavestruz');
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('./public'));
// app.use(bodyParser.json());
app.use(bodyParser.json({limit: '50mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))
app.use(cors());

consign({cwd: 'app'})
    .include('models')
    .then('api')
	  // .then('routes/pdf.js')
	  .then('routes/auth.js')
    .then('routes')
    .then('services')
    .into(app);

module.exports = app;
