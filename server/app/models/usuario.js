var mongoose = require('mongoose');

var schema = mongoose.Schema({

    login: {
        type: String,
        required: true
    },
    senha: {
        type: String,
        required: true
    },
    nome:{
      type: String,
      required:true
    },
    sobreNome:{
      type: String,
      required:true
    },
    email:{
      type: String,
      required:true
    },
    role:{
      type: String,
      required:true
    }
});

mongoose.model('Usuario', schema);
