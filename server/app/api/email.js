const mongoose = require('mongoose');

module.exports = function(app){
  let api = {};
  let model = mongoose.model('Email');

  api.lista = (req,res)=>{
    model.find()
    .then(function(email){
      res.json(email)
    }, function(error){
      console.log(error);
      res.sendStatus(500);
    });
  },
  api.adiciona = (req,res)=>{
    model.create(req.body)
      .then(function(email){
        res.json(email);
      }, err=>{
        console.log(err);
        res.sendStatus(500);
      });
  },
  api.atualiza = (req,res) =>{
    console.log(req.params.id, req.body)
      model.findByIdAndUpdate(req.params.id, req.body)
      .then(function(email) {
        res.json(email);
      }, function(error) {
        console.log(error);
        res.sendStatus(500);
      })
  };

  return api;
};
