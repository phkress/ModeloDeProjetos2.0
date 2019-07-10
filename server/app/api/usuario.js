const mongoose = require('mongoose');
const sha256 = require('js-sha256').sha256;
const jwt  = require('jsonwebtoken');

module.exports = function(app){
  let api = {};
  let model = mongoose.model('Usuario');

  api.usuario = (req,res) =>{

    let token = req.headers['x-access-token'];
    if(!req.params.id){
      console.log('Nenhum token enviado');
      return res.sendStatus(403);
    }
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
    api.adiciona = (req,res)=>{
      model.create(req.body)
        .then(function(usuario){
          res.json(usuario);
        }, err=>{
          console.log(err);
          res.sendStatus(500);
        });
    };
    api.listaUsuario = (req,res)=>{
      let user = [];
      model.find()
  		.then(function(usuarios) {
        for (var i = 0; i < usuarios.length; i++) {
          user.push({
            login: usuarios[i].login,
            nome: usuarios[i].nome,
            sobreNome: usuarios[i].sobreNome,
            email: usuarios[i].email,
            role: usuarios[i].role,
            _id: usuarios[i]._id
          })
        }
        res.json(user);
  		}, function(error) {
  			console.log(error);
  			res.sendStatus(500);
  		});
    }
    api.removePorId = function(req, res) {

  		model.remove({'_id' : req.params.id})
  		.then(function() {
  			res.sendStatus(200);
  		}, function(error) {
  			console.log(error);
  			res.sendStatus(500);
  		});

  	};
  return api;
};
