const mongoose = require('mongoose');

module.exports = function(app){
  let api = {};
  let model = mongoose.model('Pop');

  api.lista = (req,res)=>{
    model.find()
    .then(function(pop){
      res.json(pop)
    }, function(error){
      console.log(error);
      res.sendStatus(500);
    });
  },
  api.adiciona = (req,res)=>{
    model.create(req.body)
      .then(function(pop){
        res.json(pop);
      }, err=>{
        console.log(err);
        res.sendStatus(500);
      });
  }

  return api;
};
