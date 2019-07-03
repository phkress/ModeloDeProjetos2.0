const mongoose = require('mongoose');
const sha256 = require('js-sha256').sha256;
const jwt  = require('jsonwebtoken');

module.exports = function(app){
  let api = {};
  let model = mongoose.model('Usuario');

  api.usuario = (req,res) =>{
    let token = req.headers['x-access-token'];
    
    if (token) {
      console.log('Token recebido, decodificando...');
      jwt.verify(token, app.get('secret'), function(err, decoded) {
          if (err) {
              console.log('Token rejeitado');
              return res.sendStatus(401);
          } else {
             console.log('Token aceito')
             console.log("verificatoken: "+decoded.login)
             model.findOne({
               login: decoded.login
              })
              .then(function(usuario) {
                res.json({ _id: usuario._id,
                          login: usuario.login,
                          nome: usuario.nome,
                          sobreNome: usuario.sobreNome,
                          email: usuario.email,
                          role: usuario.role
                        });
              });
           }
      });
    }else{
      console.log('Nenhum token enviado');
      return res.sendStatus(401);
    }
  };
    api.atualiza = (req,res) =>{
      console.log(req.params.id, req.body)
    		model.findByIdAndUpdate(req.params.id, req.body)
    		.then(function(usuario) {
    			res.json(usuario);
    		}, function(error) {
    			console.log(error);
    			res.sendStatus(500);
    		})
    };

  return api;
};
