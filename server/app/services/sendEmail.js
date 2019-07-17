const q = require('q');
const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
const emailConfig =  require('../../config/email.js');

let model = mongoose.model('Email');

let sendEmail = {};
let to = [];
let assunto = "";
let text = "";

function getItensCapex(capexLista, compras){
  this.list = capexLista;
  let lista = "<ul>";
  for (var i = 0; i < list.length; i++) {
    lista+="<li> Item: "+list[i].descricao
    if(compras){
      lista+= "Valor: "+list[i].valor+" Parcelas: "+list[i].parcela;
    }
    lista+="</li>";
  }
  lista+="</ul>";
  return lista
}

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
  let msgText="";
  let lista="";
  switch(statusProjeto){
    case 'Aberto':
      text = "<p>Aberto novo Projeto! </p><p>Nome: "+  formulario.nomeDoProjeto+ "</p><p>Numero: "+ formulario.numeroDoProjeto +"</p>";
      break;
    case 'Pré-Viabilidade':
      text = "<p>Por favor viabilizar e informar lista de material do projeto "+formulario.nomeDoProjeto+"</p>"
      break;
    case 'Orçamento':
      msgText = "<p>Favor precificar com menor valor e encaminhar a aquisição.</p> <p>Projeto: "+ formulario.nomeDoProjeto+ "</p>";
      lista= getItensCapex(formulario.capex, false);
      text = msgText+lista;
      break;
    case 'Compras':
      msgText = "<p>Favor efetuar compra referente ao projeto "+ formulario.nomeDoProjeto+", informar data prevista</p>";
      lista= getItensCapex(formulario.capex, true);
      text = msgText+lista;
      break;
     case 'Engenharia':
      text = "<p>Favor avaliar demanda e informar dados para instalação conforme lista abaixo</p>";
      text += text + "<p> Pop Utilizado:</p>"+formulario.popAUtilizar;
      text += text + "<p> Pop Saida:</p>"+formulario.popSaida;
      text += text + "<p> Pop Passagem:</p>"+formulario.popPassagem;
      break;
    case 'Instalação':
      text = "<p>Favor agendar instalação do projeto "+formulario.nomeDoProjeto+" e informar ao comercial</p>";
      break;
   case 'Entregue':
      text = "<p>Finalizado Projeto! </p><p>Nome: "+  formulario.nomeDoProjeto+ "</p><p>Numero: "+ formulario.numeroDoProjeto +"</p>";
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
  assunto = "Nova tarefa!! ✔ - Ref: "+ statusProjeto + " - "+ formulario.nomeDoProjeto+ " -  "+ formulario.numeroDoProjeto;
  return assunto;
}
function createEmail(statusProjeto, formulario){
  var deferred = q.defer();
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
          return info;
        },err=>{
          throw new Error(err);
          console.log(err)
        })
        .then(info=>{
          // console.log(info)
          deferred.resolve(info)
        },err=>{
          deferred.reject(new Error(err));
          console.log(err)
        })
        return deferred.promise;
}

sendEmail.send = (statusProjeto, formulario)=>{
             var deferred = q.defer();
            createEmail(statusProjeto, formulario)
                .then(info=>{
                  deferred.resolve(info)
                },err=>{
                  deferred.reject(new Error(err));
                })
          // setTimeout(()=>{deferred.resolve('ok')},2000)
          return deferred.promise;
        }
module.exports = sendEmail;
