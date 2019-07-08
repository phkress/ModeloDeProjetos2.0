export default class Formulario {

  constructor(
    numeroDoProjeto='',
    nomeDoProjeto='',
    data='',
    solicitante='',
    solicitanteOutros='',
    responsavelDemanda='',
    responsavelAlteracao='',
    tituloDemanda='',
    checkbox='',
    descricaoDaDemanda='',
    imageSrc=null,
    prioridade='',
    prioridadeData='',
    capex=[],
    precificacao={},
    ittotal=0,
    popSaida='',
    popPassagem='',
    equipsPop='',
    equipsCliente='',
    ip='',
    mask='',
    gateway='',
    entregasSeremDefinidas='',
    areasEnvolvidas=["Implantação"],
    popAUtilizar='',
    pendencias='',
    contatos='',
    parecer='',
    impacto='',
    cet='',
    status='Aberto'

  ){
    this.numeroDoProjeto = numeroDoProjeto;
    this.nomeDoProjeto = nomeDoProjeto;
    this.data = data;
    this.solicitante = solicitante;
    this.solicitanteOutros = solicitanteOutros;
    this.responsavelDemanda = responsavelDemanda;
    this.responsavelAlteracao = responsavelAlteracao;
    this.tituloDemanda = tituloDemanda;
    this.checkbox = checkbox;
    this.descricaoDaDemanda = descricaoDaDemanda;
    this.imageSrc = imageSrc;
    this.prioridade = prioridade;
    this.impacto = impacto;
    this.prioridadeData = prioridadeData;
    this.capex = capex;
    this.precificacao = precificacao;
    this.ittotal = ittotal;
    this.popSaida = popSaida;
    this.popPassagem = popPassagem;
    this.equipsPop = equipsPop;
    this.equipsCliente = equipsCliente;
    this.ip = ip;
    this.mask = mask;
    this.gateway = gateway;
    this.entregasSeremDefinidas = entregasSeremDefinidas;
    this.areasEnvolvidas = areasEnvolvidas;
    this.popAUtilizar = popAUtilizar;
    this.pendencias = pendencias;
    this.contatos = contatos;
    this.parecer = parecer;
    this.cet = cet;
    this.status= status;
  }
}
