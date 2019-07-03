const mongoose = require('mongoose');
const sha256 = require('js-sha256').sha256;
const jwt  = require('jsonwebtoken');
const pdfMake = require('pdfmake/build/pdfmake.js');
const pdfFonts = require('pdfmake/build/vfs_fonts.js');
pdfMake.vfs = pdfFonts.pdfMake.vfs;

module.exports = function(app) {
  let api = {};
  let model = mongoose.model('Usuario');
  let model2 = mongoose.model('Formulario');

  api.test = (req,res) =>{

  };
  api.log = (req,res) =>{
    console.log(req.body);
  };

  api.lista = (req,res) =>{
    console.log('ok');
    model.find()
		.then(function(usuario) {
			res.json(usuario);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
  }
  api.listaForm = (req,res) =>{
    model2.find()
		.then(function(form) {
			res.json(form);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
  }
  api.listaNome = (req,res) =>{
    let resposta = [];
    model2.find()
		.then(function(formularioNome) {
      for (var i = 0; i < formularioNome.length; i++) {
        resposta.push({ _id:formularioNome[i]._id, numeroDoProjeto:formularioNome[i].numeroDoProjeto});
      }
      console.log(resposta);
      res.json(resposta);
		}, function(error) {
			console.log(error);
			res.sendStatus(500);
		});
  }
  api.adiciona = function(req, res) {
    model.create({"login": "padrao", "senha": "123","nome": "pedro","sobreNome":"Kress","email":"pedro.kress@yipi.com.br","role":"Projeto"})
		.then(function(usuario) {
			res.json(usuario);
		}, function(error) {
			console.log('não conseguiu');
			console.log(error);
			res.sendStatus(500);
		});
  }
  api.print = (req,res)=>{
    model2.findById(req.params.id)
    .then(function(formulario) {
      if (!formulario) throw new Error('Formulario não encontrada');

      // console.log(formulario);
      const color = ['#42EE86','#E9E800','#ECA900','#C82F24','#CCCCCC'];
      let x=[];
      for (var i = 0; 29 > i; i++) {
        	if(i == formulario.impacto){
        		x[i] = 'X';
        	}else{
        		x[i] = ' ';
        	}
        }
      const header =function(){
        return{
      			style: 'tableExample',
      			color: '#444',
      			table: {
      				widths: ['20%','40%','40%'],
      				headerRows: 2,
      				// keepWithHeaderRows: 1,
      				body: [
      				    [ {rowSpan:2, image: 'logo', width:'100'}, {text: 'PMO_IMPLANTAÇÃO', alignment: 'center'},{text: 'Data: XX/XX/XXXX', style: 'tableHeader', alignment: 'center'}],
                          [ '', {text:formulario.numeroDoProjeto,style: 'tableHeader', alignment: 'center'},{text: 'Versão 1.0', alignment: 'left'}]
      				]
      			}
      		}
        }
        function listaDeCompras(){
          let lista = [];
          let novaLinha = []
          let titulo = {text: 'CAPEX / LISTA DE AQUISIÇÕES', colSpan:4,style:'tableTitle',alignment:'center'};
          novaLinha.push(titulo,{},{},{})
          lista.push(novaLinha)
          for(var i=0; formulario.capex.length > i; i++){
            let novaLinha = [];
            let descricao = {text:formulario.capex[i].descricao, alignment:'center'};
            let parcela = formulario.capex[i].parcela;
            let valor = formulario.capex[i].valor;
            novaLinha.push(i,descricao, parcela, valor);
            lista.push(novaLinha);
          }
          let footerLinha = []
          let footer = {text: 'PREVISÃO ORÇAMENTÁRIA DO PROJETO:',border: [true, true, false, true], colSpan:3,style:'tableTitle',alignment:'right'};
    footerLinha.push(footer,{},{},{text:formulario.ittotal,border: [false, true, true, true],style:'tableTitle',alignment:'left'})
          lista.push(footerLinha)
          return lista
        }


      var dd ={
              footer: function(currentPage, pageCount) {
                  if(currentPage ==  1){
                      return
                  }
                  // return currentPage.toString() + ' of ' + pageCount;
                  return {
                      margin:[15,0,15,0],
      			    fontSize: 10,
                      table: {
                          widths:['40%','40%','20%'],
                          body:[
                              [
                                {text:'Nome do Arquivo:'+formulario.numeroDoProjeto},
                                {text:'Aprovação:'+formulario.responsavelDemanda},currentPage.toString() + ' of ' + pageCount]
                          ]
                      }
                  }
              },
            content: [
            {
        	    image: 'logo',
          		width: 300,
          		margin:[220,80,0,0]
          	},
      		{
      			text: 'Caderno de Projetos',
      			style: 'headerCapa'
      		},
      		{
      			text: formulario.numeroDoProjeto,
      			style: 'subheaderCapa',
                  pageBreak: 'after'
      		},
      		header(),
      		{
      		    margin:[0,30,0,0],
      		    style:'sumario',
      		    text:'SUMÁRIO'
      		},
          {
      	    margin:[0,90,0,0],
            pageBreak: 'after',
      	    ul:[
      	        'NUMERO DO PROJETO',
                    'DATA DA SOLICITAÇÃO DO PROJETO',
                    'SOLICITANTE',
                    'INFORMAÇÕES RESPONSAVEIS PELA DEMANDA',
                    'TÍTULO DA DEMANDA',
                    'TIPO DE DEMANDA',
                    'DESCRIÇÃO DA DEMANDA',
                    'VIABILIDADE DA DEMANDA',
                    'PRIORIDADE/PRAZO',
                    'IMPACTO',
                    'CAPEX / LISTA DE AQUISIÇÕES',
                    'CAPEX / EVOLUÇÃO FINANCEIRA',
                    'DIAGRAMA',
                    'RECOMENDAÇÕES',
                    'ENTREGAS A SEREM DEFINIDAS',
                    'AREAS DA EMPRESA A SEREM ENVOLVIDAS',
                    'PONTOS DE PRESENÇA A SEREM UTILIZADOS',
                    'PENDENCIAS',
                    'CONTATOS (PMO)',
                    'PARECER FINAL DA GESTÃO DE PROJETOS'
      	       ]
      	},
        header(),
    		{
    		    table:{
    		        widths:['30%','70%'],
    		        body:[
    		            [{text:"Número do Projeto: ",style:'tableTitle'},{text:formulario.numeroDoProjeto}],
    		            [{text:"Data de Solicitação: ",style:'tableTitle'},{text:formulario.data}],
    		            [{text:"Solicitante: ",style:'tableTitle'},{text:formulario.solicitante}],
                    [{text:"INFORMAÇÕES RESPONSAVEIS PELA DEMANDA",style:'tableTitle',alignment:'center', colSpan:2},''],
    		            [{text:"Responsável pela demanda: "+formulario.responsavelDemanda,style:'tableHeader',alignment:'left', colSpan:2},''],
    		            [{text:"Responsável pela alteração: "+formulario.responsavelAlteracao,style:'tableHeader',alignment:'left', colSpan:2},''],
                    [{text:"TÍTULO DA DEMANDA",style:'tableTitle',alignment:'center', colSpan:2},''],
                    [{text:formulario.tituloDemanda,style:'tableHeader',alignment:'center', colSpan:2},''],
                    [{text:"TIPO DA DEMANDA",style:'tableTitle',alignment:'center', colSpan:2},''],
                    [{text:formulario.checkbox,style:'tableHeader',alignment:'center', colSpan:2},''],
                    [{text:"DESCRIÇÃO DA DEMANDA",style:'tableTitle',alignment:'center', colSpan:2},''],
                    [{text:formulario.descricaoDaDemanda,style:'tableHeader',alignment:'justify', colSpan:2},''],
                    [{text:"VIABILIDADE DA DEMANDA",style:'tableTitle',alignment:'center', colSpan:2},''],
                    [{image:'viabilidade',width:505, colSpan:2},''],
    		        ]
    		    }
    		},
        {
          pageBreak: 'after',
          table:{
              widths:['40%','40%','20%'],
              body:[
                [
                  {text:"PRIORIDADE / PRAZO",style:'tableTitle',alignment:'center'},
                  {text:formulario.prioridade,style:'tableHeader',alignment:'left'},
                  {text:formulario.prioridadeData,alignment:'left'}
                ]
              ]
            }
        },
        header(),
        {
    		    table:{
    		        widths:['*','16,6%','16,6%','16,6%','16,6%','16,6%'],
    		        body:[
    		            [{text:'Urgência / Impacto', alignment:'center',fontSize: 10},{text:'1',fillColor:color[4], alignment:'center'},{text:'2',fillColor:color[4], alignment:'center'},{text:'3',fillColor:color[4], alignment:'center'},{text:'4',fillColor:color[4], alignment:'center'},{text:'5',fillColor:color[4], alignment:'center'},],
    		            [{text:'1',fillColor:color[4], alignment:'center'},{text:x[0], alignment:'center',fillColor:color[0]},{text:x[1], alignment:'center',fillColor:color[0]},{text:x[2], alignment:'center',fillColor:color[1]},{text:x[3], alignment:'center',fillColor:color[1]},{text:x[4], alignment:'center',fillColor:color[1]},],
    		            [{text:'2',fillColor:color[4], alignment:'center'},{text:x[5], alignment:'center',fillColor:color[0]},{text:x[6], alignment:'center',fillColor:color[0]},{text:x[7], alignment:'center',fillColor:color[1]},{text:x[8], alignment:'center',fillColor:color[1]},{text:x[9], alignment:'center',fillColor:color[2]},],
    		            [{text:'3',fillColor:color[4], alignment:'center'},{text:x[10], alignment:'center',fillColor:color[1]},{text:x[11], alignment:'center',fillColor:color[1]},{text:x[12], alignment:'center',fillColor:color[1]},{text:x[13], alignment:'center',fillColor:color[2]},{text:x[14], alignment:'center',fillColor:color[2]},],
    		            [{text:'4',fillColor:color[4], alignment:'center'},{text:x[15], alignment:'center',fillColor:color[1]},{text:x[16], alignment:'center',fillColor:color[1]},{text:x[17], alignment:'center',fillColor:color[2]},{text:x[18], alignment:'center',fillColor:color[3]},{text:x[19], alignment:'center',fillColor:color[3]},],
    		            [{text:'5',fillColor:color[4], alignment:'center'},{text:x[20], alignment:'center',fillColor:color[1]},{text:x[21], alignment:'center',fillColor:color[2]},{text:x[22], alignment:'center',fillColor:color[2]},{text:x[23], alignment:'center',fillColor:color[3]},{text:x[24], alignment:'center',fillColor:color[3]},],
    		            ]
    		    }
    		},
        {
          pageBreak: 'after',
  		    margin:[0,10,0,0],
  		    table:{
  		        widths:['5%','65%','10%','20%'],
  		        body:listaDeCompras()
  		    }
    		},
        header(),
        {
          table:{
            widths:['16%','30%','4%','20%','30%'],
            body:[
                [{text:'CAPEX / EVOLUÇÃO FINANCEIRA',colSpan:5,style:'tableTitle',alignment:'center'},{},{},{},{}],
                [{text:'',border: [false, false, false, false]},{text:'',border: [false, false, false, false]},{text:'',border: [false, false, false, false]},{text:'',border: [false, false, false, false]},{text:'',border: [false, false, false, false]}],
                ['Qtde Mb',formulario.precificacao.qtdeMb,{text:'',border: [false, false, false, false]},'Valor Sugerido',{text:'R$:'+formulario.precificacao.precoSugerido}],
                ['Valor Mb',{text:'R$:'+formulario.precificacao.valorMb},{text:'',border: [false, false, false, false]},'Valor Cobrado',{text:'R$:'+formulario.precificacao.valorCobrado}],
                ['Valor Instal',{text:'R$:'+formulario.precificacao.valorInstalacao},{text:'',border: [false, false, false, false]},'CET','CADE?'],
                ['Parcelas',formulario.precificacao.parcelas,{text:'',border: [false, false, false, false]},'Pay Back',{text:formulario.precificacao.payback+' Mês'}],
                ['Mark_Up',{text:formulario.precificacao.markUP+'%'},{text:'',border: [false, false, false, false]},{text:'',border: [false, false, false, false]},{text:'',border: [false, false, false, false]}]
            ]
          }
        },
       {
        pageBreak: 'after',
         margin:[0,10,0,0],
         table:{
           widths:['30%','70%'],
            body:[
                [{text:'INFORMAÇÕES DO LINK',style:'tableTitle',alignment:'center',colSpan:2},{}],
                [{text:'BANDA'},{text:formulario.precificacao.valorMb+'MB'}],
                [{text:'POP SAIDA'},{text:formulario.popSaida}],
                [{text:'POP PASSAGEM'},{text:formulario.popPassagem}],
                [{text:'IP'},{text:formulario.ip}],
                [{text:'MASCARA'},{text:formulario.mask}],
                [{text:'GATEWAY'},{text:formulario.gateway}],
                [{text:'EQUIP POP'},{text:formulario.equipsPop}],
                [{text:'EQUIP CLIENTE'},{text:formulario.equipsCliente}],
                [{text:'ENTREGAS A SEREM DEFINIDAS',style:'tableTitle',alignment:'center',colSpan:2},{}],
                [{text:formulario.entregasSeremDefinidas,alignment:'justify',colSpan:2},{}],
                [{text:'POP A SER UTILIZADO',style:'tableTitle',alignment:'center',colSpan:2},{}],
                [{text:formulario.popAUtilizar,alignment:'center',colSpan:2},{}],
                [{text:'PENDENCIAS',style:'tableTitle',alignment:'center',colSpan:2},{}],
                [{text:formulario.pendencias,alignment:'justify',colSpan:2},{}],
                ]
        }
      },
      header(),
      {
        margin:[0,0,0,20],
        table:{
          widths:['30%','70%'],
           body:[
               [{text:'AREAS DA EMPRESA A SEREM ENVOLVIDA',style:'tableTitle',alignment:'center'},{text:'VISTO',style:'tableTitle',alignment:'center'}],
               [{text:formulario.areasEnvolvidas},{text:'\n'}],
               ]
       }
     },
      {
       margin:[0,0,0,0],
       table:{
          widths:['100%'],
           body:[
               [{text:'CONTATOS (PMO)',style:'tableTitle',alignment:'center'}],
               [{text:formulario.contatos,alignment:'center'}],
               [{text:'PARECER',style:'tableTitle',alignment:'center'}],
               [{text:formulario.parecer,alignment:'center'}],
               ]
       }
     },
            ],
            styles:{
          		headerCapa: {
          		  margin:[0,200,0,0],
          		  alignment: 'right',
          			fontSize: 36,
          			bold: true
          		},
          		subheaderCapa: {
          		    margin:[0,20,0,0],
          			fontSize: 20,
          			alignment: 'right',
          		},
          		tableExample: {
          			margin: [0, 5, 0, 15]
          		},
          		tableHeader: {
          			bold: true,
          			fontSize: 12,
          			color: 'black'
          		},
            	sumario:{
            	    fontSize:24,
            	    alignment:'center'
            	},
          		tableTitle: {
          			bold: true,
          			fontSize: 12,
          			color: 'black',
          			fillColor:'#CCCCCC'
          		},
            },
            images:{
              viabilidade:formulario.imageSrc,
              logo: 'data:image/png;base64,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'
            }
        };
    const pdfDoc = pdfMake.createPdf(dd);
    pdfDoc.getBase64((data)=>{
        res.writeHead(200,
        {
            'Content-Type': 'application/pdf',
            'Content-Disposition':'attachment;filename="filename.pdf"'
        });

        const download = Buffer.from(data.toString('utf-8'), 'base64');
        res.end(download);
    });
      console.log('chegou');
  }, function(error) {
    console.log(error);
    res.sendStatus(500);
  });
  }

  return api
};
