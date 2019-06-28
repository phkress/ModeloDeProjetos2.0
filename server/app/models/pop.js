const mongoose = require('mongoose');

const schema = mongoose.Schema({

  name:{
    type: String,
    required: true
  }
});

mongoose.model('Pop', schema);
