 <template lang="html">
  <div class="">
    <form role="Form" @submit.prevent="grava()">
      <div class="row">
        <div class="form-group col-md-6">
          <label for="InputNumeroProjeto">Numero do Projeto</label>
          <input type="text" class="form-control" id="InputNumeroProjeto" aria-describedby="emailHelp" v-model="formulario.numeroDoProjeto">
          <small id="NumeroProjetoHelp" class="form-text text-muted">Rapida explicação do campo</small>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
          <label for="InputNomeProjeto">Nome do Projeto</label>
          <input type="text" class="form-control" id="InputNomeProjeto" v-model="formulario.nomeDoProjeto">
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-2">
          <label for="example-date-input" class="col-form-label">Date</label>
          <input class="form-control" type="date"  v-model="formulario.data" id="example-date-input">
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-4">
          <label for="inlineFormCustomSelect">Solicitante</label>
            <select v-model="formulario.solicitante" class="form-control" id="inlineFormCustomSelect">
              <option selected>Selecione um...</option>
              <option>Diretoria Operações</option>
              <option>Operação</option>
              <option>Comercial</option>
              <option>Outros</option>
            </select>
        </div>
        <div v-if="formulario.solicitante == 'Outros'"class="form-group col-md-4">
          <label for="InputSolicitante">Outro Solicitante</label>
          <input type="text" v-model="formulario.solicitanteOutros" class="form-control" id="InputSolicitante" placeholder="Diretoria Operações">
          <small id="NumeroProjetoHelp" class="form-text text-muted">Rapida explicação do campo</small>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-4">
          <label for="InputRespDemanda">Responsavel pela Demanda</label>
          <input type="text" class="form-control" id="InputRespDemanda" v-model="formulario.responsavelDemanda">
          <small id="InputRespDemandaHelp" class="form-text text-muted">Rapida explicação do campo</small>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-4">
          <label for="InputRespAlteracao">Responsavel pela Alteração</label>
          <input type="text" class="form-control" id="InputRespAlteracao" v-model='formulario.responsavelAlteracao'>
          <small id="InputRespAlteracaoHelp" class="form-text text-muted">Rapida explicação do campo</small>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-4">
          <label for="InputTitulo">Titulo da Demanda</label>
          <input type="text" class="form-control" id="InputTitulo" v-model='formulario.tituloDemanda'>
          <small id="InputTituloHelp" class="form-text text-muted">Rapida explicação do campo</small>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-12">
          <label for="InputTiPO">Tipo da Demanda</label>
          <div class="form-group col-md-12">
            <label class="checkbox-inline col-md-2">
              <input type="checkbox" v-model="formulario.checkbox" value="UP GRADE LINK RÁDIO" id="inlineCheckbox1"> UP GRADE LINK RÁDIO
            </label>
            <label class="checkbox-inline col-md-2">
              <input type="checkbox" v-model="formulario.checkbox" value="INSTALL LINK RÁDIO" id="inlineCheckbox2"> INSTALL LINK RÁDIO
            </label>
            <label class="checkbox-inline col-md-2">
              <input type="checkbox" v-model="formulario.checkbox" value="UP GRADE LINK FIBRA" id="inlineCheckbox3"> UP GRADE LINK FIBRA
            </label>
            <label class="checkbox-inline col-md-2">
              <input type="checkbox" v-model="formulario.checkbox" value="INSTALL LINK FIBRA" id="inlineCheckbox4"> INSTALL LINK FIBRA
            </label>
            <label class="checkbox-inline col-md-2">
              <input type="checkbox" v-model="formulario.checkbox" value="MELHORIAS" id="inlineCheckbox5"> MELHORIAS
            </label>
            <label class="checkbox-inline col-md-2">
              <input type="checkbox" v-model="formulario.checkbox" value="OUTROS" id="inlineCheckbox6"> OUTROS
            </label>
          </div>
        </div>
      </div>
      <div class="form-group">
        <label for="exampleTextarea">Descrição da Demanda</label>
        <textarea class="form-control" id="exampleTextarea" rows="4" v-model="formulario.descricaoDaDemanda"></textarea>
      </div>
      <div class="form-group">
        <label for="InputImg">Foto da Viabilidade</label>
        <input @change="uploadImage()" type="file" name="photo" accept="image/*">
        <img :src="formulario.imageSrc" class="imageFormulario">
      </div>
      <div class="row">
        <div class="form-group col-md-4">
          <label for="inputPrioridade">Prioridade</label>
            <input type="text" v-on="getPrioridade()" class="form-control" :value="formulario.prioridade" readonly>
        </div>
        <div class="form-group col-md-4">
          <label for="inputPrioridadeData">Prazo</label>
          <input type="date" class="form-control"  v-model='formulario.prioridadeData'>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-12">
          <table  class="table table-bordered">
            <caption class="text-uppercase text-center">IMPACTO</caption>
            <thead>
              <tr>
                <th class="text-uppercase text-center">URGÊNCIA</th>
                <th class="text-uppercase text-center">1</th>
                <th class="text-uppercase text-center">2</th>
                <th class="text-uppercase text-center">3</th>
                <th class="text-uppercase text-center">4</th>
                <th class="text-uppercase text-center">5</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th class="text-uppercase text-center">1</th>
                <th class="text-uppercase text-center suave"><input type="radio" v-model="formulario.impacto" value="1"></th>
                <th class="text-uppercase text-center suave"><input type="radio" v-model="formulario.impacto" value="2"></th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="3"></th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="4"></th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="5"></th>
              </tr>
              <tr>
                <th class="text-uppercase text-center">2</th>
                <th class="text-uppercase text-center suave"><input type="radio" v-model="formulario.impacto" value="6"></th>
                <th class="text-uppercase text-center suave"><input type="radio" v-model="formulario.impacto" value="7"></th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="8"></th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="9"></th>
                <th class="text-uppercase text-center ruim"><input type="radio" v-model="formulario.impacto" value="10"></th>
              </tr>
              <tr>
                <th class="text-uppercase text-center">3</th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="11"></th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="12"></th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="13"></th>
                <th class="text-uppercase text-center ruim"><input type="radio" v-model="formulario.impacto" value="14"></th>
                <th class="text-uppercase text-center ruim"><input type="radio" v-model="formulario.impacto" value="15"></th>
              </tr>
              <tr>
                <th class="text-uppercase text-center">4</th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="16"></th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="17"></th>
                <th class="text-uppercase text-center ruim"><input type="radio" v-model="formulario.impacto" value="18"></th>
                <th class="text-uppercase text-center deuRuim"><input type="radio" v-model="formulario.impacto" value="19"></th>
                <th class="text-uppercase text-center deuRuim"><input type="radio" v-model="formulario.impacto" value="20"></th>
              </tr>
              <tr>
                <th class="text-uppercase text-center">5</th>
                <th class="text-uppercase text-center normal"><input type="radio" v-model="formulario.impacto" value="21"></th>
                <th class="text-uppercase text-center ruim"><input type="radio" v-model="formulario.impacto" value="22"></th>
                <th class="text-uppercase text-center ruim"><input type="radio" v-model="formulario.impacto" value="23"></th>
                <th class="text-uppercase text-center deuRuim"><input type="radio" v-model="formulario.impacto" value="24"></th>
                <th class="text-uppercase text-center deuRuim"><input type="radio" v-model="formulario.impacto" value="25"></th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="form-group col-md-12">
        <table class="table table-striped">
          <caption class="text-uppercase text-center">CAPEX / LISTA DE AQUISIÇÕES</caption>
          <thead class="">
            <tr>
              <th scope="col">Item</th>
              <th scope="col">Descrição</th>
              <th scope="col">Parcela</th>
              <th scope="col" colspan="2">Menor Valor Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">
                <button type="button" class="btn btn-info" @click='addlist()'>+</button>
              </th>
              <td><input v-model="itlist.descricao" type="text" class="form-control" ></td>
              <!-- <td><input v-model="itlist.und" type="text" class="form-control" ></td> -->
              <td><input v-model="itlist.parcela" type="number" class="form-control" ></td>
              <td  colspan="2"><input v-model="itlist.valor" type="text" class="form-control"></td>
            </tr>
            <tr  v-for="(item, index) in formulario.capex">
              <th scope="row">{{index}}</th>
              <td>{{item.descricao}}</td>
              <!-- <td>{{item.und}}</td> -->
              <td>{{item.parcela}}</td>
              <td>{{item.valor}}</td>
              <td>
                <button type="button" class="btn btn-link" name="button" @click='removelist(index, item.valor)'>
                  <span class="glyphicon glyphicon-trash"></span>
                  Excluir
                </button>
              </td>
            </tr>
            <tr>
              <th colspan='4'>PREVISÃO ORÇAMENTÁRIA DO PROJETO</th>
              <td colspan='2'>Total R$: {{ formulario.ittotal }}</td>
            </tr>
          </tbody>
        </table>

        <div class="row">
          <div class="center">
            <div class="col-md-5">
              <table class="table">
                <thead>
                  <tr>
                    <td colspan2>PARAMETROS DE PRECIFICAÇÃO</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Qtde Mb</th>
                    <td><input  onfocus="this.value='';" v-model="formulario.precificacao.qtdeMb" type="text" class="form-control" ></td>
                  </tr>
                  <tr>
                    <th>Valor Mb</th>
                    <td><input  onfocus="this.value='';" v-model="formulario.precificacao.valorMb" type="text" class="form-control" ></td>
                  </tr>
                  <tr>
                    <th>Custo Mb</th>
                    <td><input onfocus="this.value='';" v-model="formulario.precificacao.customMb" type="text" class="form-control" ></td>
                  </tr>
                  <tr>
                    <th>Valor Instalação</th>
                    <td><input onfocus="this.value='';" v-model="formulario.precificacao.valorInstalacao" type="text" class="form-control" ></td>
                  </tr>
                  <tr>
                    <th>Parcelas</th>
                    <td><input onfocus="this.value='';" v-model="formulario.precificacao.parcelas" type="text" class="form-control" ></td>
                  </tr>
                   <tr>
                    <th>Mark Up</th>
                    <td><input onfocus="this.value='';" v-model="formulario.precificacao.markUP" type="text" class="form-control" ></td>
                  </tr>
                  <tr>
                   <th>Valor Cobrado</th>
                   <td><input onfocus="this.value='';" v-model="formulario.precificacao.valorCobrado" type="text" class="form-control" ></td>
                 </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-5 col-md-offset-1">
              <table class="table">
                <thead>
                  <tr>
                    <td colspan2>PRECIFICAÇÃO | CET | PONTO DE EQUILIBRIO</td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Valor Sugerido</th>
                    <td v-on="outputValorSugerido()">{{formulario.precificacao.precoSugerido}}</td>
                  </tr>
                  <tr>
                    <th>Valor Standard</th>
                    <td v-on="outputValorStandard()">{{formulario.precificacao.valorStandard}}</td>
                  </tr>
                  <tr>
                    <th>Valor Cet</th>
                    <td v-on="outputValorCet()">{{cet.valor}}</td>
                  </tr>
                  <tr>
                    <th>Pay Back</th>
                    <td v-on="outputPayback()">{{formulario.precificacao.payback}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
          <label>POP Saida</label>
              <select  v-if="formulario.popSaida != 'Outros'" v-model="formulario.popSaida" class="form-control" id="inlineFormCustomSelect">
                <option selected>Selecione um...</option>
                <option v-for="itemPop in popLista">{{itemPop.name}}</option>
                <option>Outros</option>
              </select>
              <div v-else class="form-inline">
                <input v-model="pop.name" type="text" class="form-control">
                <button type="button" class="btn btn-info" @click='addNovoPop(1)'>Adicionar</button>
                <button type="button" class="btn btn-danger" @click='formulario.popSaida = "Selecione um..."'>Cancelar</button>
              </div>

        </div>
        <div class="form-group col-md-6">
          <label>POP Passagem</label>
          <!-- <input v-model="formulario.popPassagem"type="text" class="form-control"> -->
          <select  v-if="formulario.popPassagem != 'Outros'" v-model="formulario.popPassagem" class="form-control" id="inlineFormCustomSelect">
            <option selected>Selecione um...</option>
            <option v-for="itemPop in popLista">{{itemPop.name}}</option>
            <option>Outros</option>
          </select>
          <div v-else class="form-inline">
            <input v-model="pop.name" type="text" class="form-control">
            <button type="button" class="btn btn-info" @click='addNovoPop(2)'>Adicionar</button>
            <button type="button" class="btn btn-danger" @click='formulario.popPassagem = "Selecione um..."'>Cancelar</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
          <label>POP A SER UTILIZADO</label>
          <!-- <input v-model="formulario.popAUtilizar" type="text" class="form-control"> -->
          <select  v-if="formulario.popAUtilizar != 'Outros'" v-model="formulario.popAUtilizar" class="form-control" id="inlineFormCustomSelect">
            <option selected>Selecione um...</option>
            <option v-for="itemPop in popLista">{{itemPop.name}}</option>
            <option>Outros</option>
          </select>
          <div v-else class="form-inline">
            <input v-model="pop.name" type="text" class="form-control">
            <button type="button" class="btn btn-info" @click='addNovoPop(3)'>Adicionar</button>
            <button type="button" class="btn btn-danger" @click='formulario.popAUtilizar = "Selecione um..."'>Cancelar</button>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
          <label>Equips no POP</label>
          <textarea v-model="formulario.equipsPop" class="form-control" rows="6"></textarea>
        </div>
        <div class="form-group col-md-6">
          <label>Equips no Cliente</label>
          <textarea v-model="formulario.equipsCliente" class="form-control" rows="6"></textarea>
        </div>
      </div>
      <div class="row">
        <div class="form-group col-md-4">
          <label>IP</label>
          <input v-model="formulario.ip"type="text" class="form-control">
        </div>

        <div class="form-group col-md-4">
          <label>Mascara de Rede</label>
          <input v-model="formulario.mask" type="text" class="form-control">
        </div>

        <div class="form-group col-md-4">
          <label>Gateway</label>
          <input v-model="formulario.gateway" type="text" class="form-control">
        </div>
      </div>

      <div class="form-group">
        <label>ENTREGAS A SEREM DEFINIDAS</label>
        <textarea v-model="formulario.entregasSeremDefinidas" class="form-control" rows="4"></textarea>
      </div>
      <div class="row">
        <div class="form-group col-md-6">
          <label>AREAS DA EMPRESA A SEREM ENVOLVIDA</label>
          <!-- <input v-model="formulario.areasEnvolvidas" type="text" class="form-control"> -->
          <select v-model="listaAreasEnvolvidas" class="form-control">
            <option selected value="">Selecione um...</option>
            <option>Diretoria Operações</option>
            <option>Operação</option>
            <option>Implantação</option>
            <option>Manutencação</option>
            <option>Comercial</option>
            <option>Engenharia</option>
            <option>Financeiro</option>
            <option>Compras</option>
            <option>Juridico</option>
          </select><br>
          <button type="button" class="btn btn-primary col-md-12" @click='addAreasEnvolvidas()'>Adicionar a Lista</button>
        </div>
        <div class="form-group col-md-6">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th class="text-center">AREAS</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(area,index) in formulario.areasEnvolvidas">
                <td class="text-center">
                  {{area}}<button type="button" class="btn btn-link" name="button" @click='removeAreaEnvolvida(index)'>
                    <span class="glyphicon glyphicon-trash"></span>
                    Remover
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="form-group">
        <label>PENDENCIAS</label>
        <textarea v-model="formulario.pendencias" class="form-control" rows="4"></textarea>
      </div>
      <div class="form-group">
        <label>CONTATOS (PMO)</label>
        <textarea v-model="formulario.contatos" class="form-control" rows="4"></textarea>
      </div>
      <div class="form-group">
        <label>PARECER FINAL DA GESTÃO DE PROJETOS</label>
        <textarea v-model="formulario.parecer" class="form-control" rows="4"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">Salvar</button>
      <router-link :to="{ name: 'formularios', params: {} }">
        <button type="submit" class="btn btn-danger pull-right">Cancelar</button>
      </router-link>
    </form>
  </div>
</template>

<script>
import Formulario from "../../domain/formulario/Formulario";
import FormularioService from '../../domain/formulario/FormularioService';
import Pop from "../../domain/pop/Pop";
import PopService from '../../domain/pop/PopService';
export default {
  data(){
    return {
      pop: new Pop(),
      popLista: [],
      formulario: new Formulario(),
      id: this.$route.params.id,
      listaAreasEnvolvidas:[],
      itlist :{},
      cet:{
        valor:null,
        analiseDeRisco:0.16,
        impostos:0.03,
        pis:0,
        confins:0,
        cssl:0,
        irpj:0,
        comissoes:0
      }
    }
  },
  methods:{
    getPrioridade(){
      let prioridade = '';
      switch (parseInt(this.formulario.impacto)) {
        case 1: case 2: case 6: case 7:
          prioridade = 'Normal';
        break;
        case 3: case 4: case 5: case 8: case 9: case 11: case 12: case 13: case 16: case 17: case 21:
          prioridade = 'Media';
        break;
        case 10: case 14: case 15: case 18: case 22: case 23:
          prioridade = 'Alta';
        break;
        case 19: case 20: case 24: case 25:
          prioridade = 'Altíssima';
        break;
        default:
          prioridade = 'NaN';
      }
      this.formulario.prioridade = prioridade;
    },
    addAreasEnvolvidas(){
      if(this.listaAreasEnvolvidas != null && this.listaAreasEnvolvidas != ''){
        for (var i = 0; i < this.formulario.areasEnvolvidas.length; i++) {
          if(this.formulario.areasEnvolvidas[i] == this.listaAreasEnvolvidas){
            return alert("Área já foi adicionada!");
          }
        }
        this.formulario.areasEnvolvidas.push(this.listaAreasEnvolvidas);
      }
    },
    removeAreaEnvolvida(index){
      this.formulario.areasEnvolvidas.splice(index, 1);
    },
    addNovoPop(num){
      let msg= "Selecione um...";
      switch (num) {
        case 1:
          // this.formulario.popPassagem = this.pop.name;
          this.formulario.popSaida = msg;
          break;
        case 2:
          // this.formulario.popPassagem = this.pop.name;
          this.formulario.popPassagem= msg;
          break;
        case 3:
          // this.formulario.popAUtilizar = this.pop.name;
          this.formulario.popAUtilizar= msg
          break;
        default:
      }
      this.popService
        .cadastra(this.pop)
        .then(()=>{
          this.popLista.push({name:this.pop.name})
          this.pop = new Pop();
        }, err=>{
          console.log(err);
        });
    },
    addlist(){
        this.formulario.capex.push(this.itlist);
        this.itlist.valor = this.itlist.valor.replace(',','.');
        this.formulario.ittotal+=parseFloat(this.itlist.valor);
        this.formulario.ittotal = parseFloat(this.formulario.ittotal.toFixed(2));
        this.itlist = {}
    },
    removelist(index, valor){
      this.formulario.capex.splice(index, 1);
      this.formulario.ittotal = this.formulario.ittotal - parseFloat(valor);
      this.formulario.ittotal = parseFloat(this.formulario.ittotal.toFixed(2));
    },
    uploadImage() {
      let foto =null;
      var file = document
        .querySelector('input[type=file]')
        .files[0];
      var promise = (file)=>{
        return new Promise((resolve)=>{
          var reader = new FileReader();

          reader.onload = function(event){
            var fileToAttach = event.target.result;
            resolve(fileToAttach);
          }
          reader.readAsDataURL(file);
        });
      }
      promise(file).then(file => {
        this.fileToAttach = file;
        this.formulario.imageSrc = file;
        // this.imageSrc = file;
        // console.log(file);
      })
    },outputValorCet(){
      let valorLink;
      let valorCet;
      let cet;
      if(this.formulario.valorMb == null && this.formulario.valorMb == ''){
        return this.cet.valor = '';
      }
      if(this.formulario.precificacao.precoSugerido != null && this.formulario.precificacao.markUP != null && this.formulario.precificacao.customMb != null){
        this.formulario.precificacao.customMb = this.formulario.precificacao.customMb.replace(',','.');
        cet = (
        this.cet.analiseDeRisco+
        this.cet.impostos+
        this.cet.pis+
        this.cet.confins+
        this.cet.cssl+
        this.cet.irpj+
        this.cet.comissoes);
        valorCet = (cet*this.formulario.precificacao.precoSugerido)+(this.formulario.precificacao.qtdeMb * this.formulario.precificacao.customMb);
      }
      this.cet.valor = parseFloat(valorCet).toFixed(2);
      this.formulario.cet = this.cet.valor;
    },
    outputValorStandard(){
      let valorMb
      if(this.formulario.precificacao.valorMb == null && this.formulario.precificacao.valorMb == ''){
        valorMb = 0;
      }
      if(this.formulario.precificacao.valorMb != null){
        this.formulario.precificacao.valorMb = this.formulario.precificacao.valorMb.replace(',','.');
        valorMb = parseFloat(this.formulario.precificacao.valorMb).toFixed(2);
      }
      this.formulario.precificacao.valorStandard = parseFloat(this.formulario.precificacao.qtdeMb * valorMb).toFixed(2);
    },
    outputValorSugerido(){
      if(this.formulario.precificacao.customMb != null && this.formulario.precificacao.customMb != ''){
        this.formulario.precificacao.customMb = this.formulario.precificacao.customMb.replace(',','.');
      }
      if(this.formulario.precificacao.markUP != null){
        this.formulario.precificacao.markUP = this.formulario.precificacao.markUP.replace('%','');
        this.formulario.precificacao.markUP = this.formulario.precificacao.markUP.replace(',','');
        this.formulario.precificacao.markUP = this.formulario.precificacao.markUP.replace('.','');
      }
      if(this.formulario.precificacao.valorStandard != null){
        this.formulario.precificacao.precoSugerido = this.formulario.precificacao.valorStandard*(1+(
          +this.cet.analiseDeRisco
          +this.cet.impostos
          +this.cet.pis
          +this.cet.confins
          +this.cet.cssl
          +this.cet.irpj
          +this.cet.comissoes
          +(this.formulario.precificacao.markUP/100)
        ));
        this.formulario.precificacao.precoSugerido = parseFloat(this.formulario.precificacao.precoSugerido).toFixed(2);
      }
    },
    outputPayback(){
      //converção Inputs
      if(this.formulario.precificacao.valorInstalacao != null){
        this.formulario.precificacao.valorInstalacao = this.formulario.precificacao.valorInstalacao.replace(',','.');
      }
      if(this.formulario.precificacao.valorCobrado != null){
        this.formulario.precificacao.valorCobrado = this.formulario.precificacao.valorCobrado.replace(',','.');
      }
      if(this.formulario.precificacao.parcelas == null || this.formulario.precificacao.parcelas ==0){
        this.formulario.precificacao.parcelas = 1;
      }
      //var

      let capex = this.formulario.capex;
      let instalacao= (this.formulario.precificacao.valorInstalacao/this.formulario.precificacao.parcelas);
      let valorRecorrente = (this.formulario.precificacao.valorCobrado - this.cet.valor);
      let evolucaoFinanceira = 0;
      let acumulado = 0;
      let count = 1;

      let stop = true;
      while(stop){
         let rampUp = 0;
         for (var x = 0; x < capex.length; x++) {
             //Calcula RampUp do mes
             if (capex[x].parcela >= count) {
               rampUp += (capex[x].valor / capex[x].parcela);
             }
           }
         if(this.formulario.precificacao.parcelas >= count){
           evolucaoFinanceira = (instalacao+valorRecorrente)-rampUp
         }else{
           evolucaoFinanceira = valorRecorrente-rampUp
         }
         // evolucaoFinanceira = Math.abs(parseFloat(evolucaoFinanceira).toFixed(2));
         acumulado+=evolucaoFinanceira;
         // console.log("RampUp é",rampUp);
         // console.log("valorRecorrente é",valorRecorrente);
         // console.log("valorParcela é",instalacao);
         // console.log("evolucaoFinanceira é",evolucaoFinanceira);
         // console.log("acumulado é",acumulado);
         if(acumulado >= this.formulario.ittotal){
           stop = false;
           this.formulario.precificacao.payback = count;
         }
        //force break
        if (count >=100) {
          stop = false
        }
        // console.log(count);:
        count ++
      }
    },
    grava(){
      this.service
        .cadastra(this.formulario)
        .then(() => {
          if(this.id) this.$router.push({ name: 'formularios' });
          this.formulario = new Formulario();
        }, err => {
          // this.$router.push("login");
          console.log(err)
        });

    },
  },
  created() {
    this.popService = new PopService(this.$resource);
    this.service = new FormularioService(this.$resource);

    if(this.id){
      this.service
        .busca(this.id)
        .then(form => {
          form.precificacao ={
            customMb: form.precificacao.customMb,
            markUP: form.precificacao.markUP,
            parcelas: form.precificacao.parcelas,
            qtdeMb: form.precificacao.qtdeMb,
            valorCobrado: form.precificacao.valorCobrado,
            valorInstalacao: form.precificacao.valorInstalacao,
            valorMb: form.precificacao.valorMb
          };
          this.formulario = form
          this.outputValorStandard()
          this.outputValorCet()
          this.outputValorSugerido()
          this.outputPayback()
        }, err => {
          // this.$router.push("login");
          console.log(err)
        });
    };
    this.popService
    .lista()
    .then(pop => this.popLista = pop, err => {
      console.log(err);
    });
  }

}
</script>

<style lang="css" scoped>
.imageFormulario{
   width:100%;
   max-width: 800px;
   height: auto;
}
.imageFormulario img{
   width:100%;
   height:100%;
   max-width: 800px;
   max-height: 600px;
   min-height: auto;
   background-size:100%;
   background-repeat: no-repeat;
}
.center{
  width: 100%;
  margin: 0px 5%;
}
.suave{
  background-color: #8EDB35;
}
.normal{
  background-color: #E8D200;
}
.ruim{
  background-color: #F9720E;
}
.deuRuim{
  background-color: #DF0000;
}
</style>
