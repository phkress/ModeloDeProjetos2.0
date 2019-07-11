const mongoose = require('mongoose');

const schema = mongoose.Schema({
  projeto:{
    type:Array
  },
  compra:{
    type:Array
  },
  comercial:{
    type:Array
  },
  engenharia:{
    type:Array
  },
  financeiro:{
    type:Array
  }

});

mongoose.model('Email', schema);
