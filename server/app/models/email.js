const mongoose = require('mongoose');

const schema = mongoose.Schema({
  lancado:{
    type:Array
  },
  aberto:{
    type:Array
  },
  preViabilidade:{
    type:Array
  },
  orcamento:{
    type:Array
  },
  compras:{
    type:Array
  },
  engenharia:{
    type:Array
  },
  instalacao:{
    type:Array
  },
  entregue:{
    type:Array
  }

});

mongoose.model('Email', schema);
