var mongoose = require('mongoose');

var schema = mongoose.Schema({

  numeroDoProjeto: {
    type: String,
    required: false
  },
  nomeDoProjeto: {
    type: String,
    required: false
  },
  data: {
    type: String,
    required: false
  },
  solicitante: {
    type: String,
    required: false
  },
  solicitanteOutros: {
    type: String,
    required: false
  },
  responsavelDemanda: {
    type: String,
    required: false
  },
  responsavelAlteracao: {
    type: String,
    required: false
  },
  tituloDemanda: {
    type: String,
    required: false
  },
  checkbox: {
    type: String,
    required: false
  },
  descricaoDaDemanda: {
    type: String,
    required: false
  },
  imageSrc:{
    type: String,
    required: false
  },
  prioridade:{
    type: String,
    required: false
  },
  prioridadeData: {
    type: String,
    required: false
  },
  capex:{
    type: Array,
    required: false
  },
  precificacao:{
    type: Object,
    required: false
  },
  ittotal: {
    type: Number,
    required: false
  },
  popSaida: {
    type: String,
    required: false
  },
  popPassagem: {
    type: String,
    required: false
  },
  equipsPop: {
    type: String,
    required: false
  },
  equipsCliente: {
    type: String,
    required: false
  },
  ip: {
    type: String,
    required: false
  },
  mask: {
    type: String,
    required: false
  },
  gateway: {
    type: String,
    required: false
  },
  entregasSeremDefinidas: {
    type: String,
    required: false
  },
  areasEnvolvidas: {
    type: Array,
    required: false
  },
  popAUtilizar: {
    type: String,
    required: false
  },
  pendencias: {
    type: String,
    required: false
  },
  contatos: {
    type: String,
    required: false
  },
  parecer: {
    type: String,
    required: false
  },
  impacto: {
    type: String,
    required: false
  },
  cet: {
    type: String,
    required: false
  },
  status:{
    type: String,
    required: false
  },
  timer:{
    type: String
  }

});

mongoose.model('Formulario', schema);
