const mongoose = require('mongoose');
const sha256 = require('js-sha256').sha256;
const jwt  = require('jsonwebtoken');

module.exports = function(app) {
  let api = {};
  let model = mongoose.model('Usuario');

  api.autentica = function(req, res){

     model.findOne({
         login: req.body.login,
         senha: req.body.senha
     })
     .then(function(usuario) {
         if (!usuario) {
             console.log('Login/senha inválidos');
             res.sendStatus(401);
         } else {
            console.log(usuario.login)
             var token = jwt.sign({login: usuario.login, role: usuario.role}, app.get('secret'), {
                 expiresIn: 84600
             });
             console.log('Autenticado: token adicionado na resposta');
             res.set('x-access-token', token);
             res.status(200).send({token:token, role:usuario.role});
             res.end();
         }
     });
  }
  api.verificaToken = function(req, res, next) {

         var token = req.headers['x-access-token'];

         if (token) {
             console.log('Token recebido, decodificando');
             jwt.verify(token, app.get('secret'), function(err, decoded) {
                 if (err) {
                     console.log('Token rejeitado');
                     return res.sendStatus(401);
                 } else {
                     console.log('Token aceito')
                    console.log("verificatoken: "+decoded.login)
                     req.usuario = decoded;
                     next();
                  }
            });
        } else {
            console.log('Nenhum token enviado');
            return res.sendStatus(401);
          }
    }

  return api
};
