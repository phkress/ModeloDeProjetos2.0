const q = require('q');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const emailConfig =  require('../../config/email.js');

let model = mongoose.model('Email');

let sendEmail = {};
let to = [];
let assunto = "Nova tarefa!! ✔ - ";
let text = "";

let testeForm = { capex: [],
  areasEnvolvidas: [ 'Implantação' ],
  _id: '5d2394ddf729933194e509bc',
  numeroDoProjeto: '0004/YIPI',
  nomeDoProjeto: 'teste',
  data: '2019-07-10',
  solicitante: 'Comercial',
  solicitanteOutros: '',
  responsavelDemanda: 'teste',
  responsavelAlteracao: 'teste',
  tituloDemanda: 'teste',
  checkbox: 'UP GRADE LINK RÁDIO',
  descricaoDaDemanda: 'tretreterte',
  imageSrc: null,
  prioridade: 'NaN',
  impacto: '',
  prioridadeData: '',
  precificacao: { valorStandard: 'NaN', precoSugerido: 'NaN', parcelas: 1 },
  ittotal: 0,
  popSaida: '',
  popPassagem: '',
  equipsPop: '',
  equipsCliente: '',
  ip: '',
  mask: '',
  gateway: '',
  entregasSeremDefinidas: '',
  popAUtilizar: '',
  pendencias: '',
  contatos: '',
  parecer: '',
  cet: 'NaN',
  status: 'Lançando',
  __v: 0 }


function getGrupoEmail(statusProjeto, emails){
  let emailList;
  switch(statusProjeto){
    case 'Aberto':
      emailList = emails.aberto;
      break;
    case 'Pré-Viabilidade':
      emailList = emails.preViabilidade;
      break;
    case 'Orçamento':
      emailList = emails.orcamento;
      break;
    case 'Compras':
      emailList = emails.compras;
      break;
     case 'Engenharia':
      emailList = emails.engenharia;
      break;
    case 'Instalação':
      emailList = emails.instalacao;
      break;
   case 'Entregue':
      emailList = emails.entregue;
      break;
  case 'Lançando':
     emailList = emails.lancado;
     break;
   default:
      emailList = [];
      break;
  }
  return emailList;
}
function setTo(statusProjeto){
      let deferred = q.defer();
          model.find()
          .then(function(emails){
            return emails[0];
          }, function(error){
            console.log(error);
            deferred.reject(new Error(err));
          }).then(email=>{
            let listaEmails = getGrupoEmail(statusProjeto,email);
            return listaEmails;
          },err=>{
            console.log(err);
            deferred.reject(new Error(err));
          }).then(listaEmails=>{
            to = [];
            for (var i = 0; i < listaEmails.length; i++) {
              to.push(listaEmails[i].email);
            }
            deferred.resolve(to);
          },err=>{
            console.log(err);
            deferred.reject(new Error(err));
            })
      return deferred.promise;
}
function setText(statusProjeto, formulario){
  text="";
  switch(statusProjeto){
    case 'Aberto':
      text = "";
      break;
    case 'Pré-Viabilidade':
      text = "";
      break;
    case 'Orçamento':
      text = "";
      break;
    case 'Compras':
      text = "";
      break;
     case 'Engenharia':
      text = "";
      break;
    case 'Instalação':
      text = "";
      break;
   case 'Entregue':
      text = "";
      break;
  case 'Lançando':
     text = "<p>Lançado novo Projeto! </p><p>Nome: "+  formulario.nomeDoProjeto+ "</p><p>Numero: "+ formulario.numeroDoProjeto +"</p>";
     break;
   default:
      text = "Erro!";
      break;
  }
  return text;
}
function setSubject(statusProjeto, formulario){
  assunto += statusProjeto + " - "+ formulario.nomeDoProjeto+ " -  "+ formulario.numeroDoProjeto;
  return assunto;
}
function createEmail(statusProjeto, formulario){
  let transporter = nodemailer.createTransport(emailConfig);
   setSubject(statusProjeto, formulario)
   setText(statusProjeto, formulario)
   setTo(statusProjeto)
        .then(to=>{
          return to;
        },err=>{
          throw new Error(err);
          console.log(err)
        })
        .then(to=>{
          let info = transporter.sendMail({
            from: '"Sistema de Projetos 👻" <no-reply@yipi.com>',
            to: to,
            subject: assunto,
            html: text
          });
          return (info)
        },err=>{
          throw new Error(err);
          console.log(err)
        })
        .then(info=>{
          console.log(info)
        },err=>{
          throw new Error(err);
          console.log(err)
        })

}
createEmail('Lançando', testeForm)
sendEmail.send = (statusProjeto, statusSolicitacao, formulario)=>{
            var deferred = q.defer();
            let transporter = nodemailer.createTransport(emailConfig);

            let info = transporter.sendMail({
              from: '"Sistema de Projetos 👻" <no-reply@yipi.com>',
              to: to,
              subject: assunto,
              html: text
            });
            deferred.resolve(info)
          return deferred.promise;
        }
module.exports = sendEmail;
