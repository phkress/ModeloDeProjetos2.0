<template>
  <div id="FormularioProjeto" class="mt-3">
    <b-container class="FormularioProjetoTextLeft">
      <b-form @submit.prevent="grava()">

      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-1"
            label="Numero do Projeto"
            label-for="input-1"
            description="Indentificação do projeto"
          >
            <b-form-input
              id="input-1"
              v-model="formulario.numeroDoProjeto"
              type="text"
              required
              placeholder="Numero do Projeto"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-2"
            label="Nome do Projeto"
            label-for="input-2"
            description="Nome do Projeto"
          >
            <b-form-input
              id="input-2"
              v-model="formulario.nomeDoProjeto"
              type="text"
              required
              placeholder="Nome do Projeto"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-3"
            label="Date do Projeto"
            label-for="input-3"
            description="Click na seta e escolha a data do projeto"
          >
            <b-form-input
              id="input-3"
              v-model="formulario.data"
              type="date"
              required
              placeholder="Date do Projeto"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>

        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-4"
            label="Solicitante do Projeto"
            label-for="input-4"
            description="Informe o solicitante do Projeto"
          >
          <b-form-select
          id="input-4"
          v-model="formulario.solicitante"
          :options="solicitantes"
          required
          ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            v-if="formulario.solicitante == 'Outros'"
            id="input-group-5"
            label="Outro Solicitante do Projeto"
            label-for="input-5"
            description="Informe o solicitante do Projeto"
          >
          <b-form-input
            id="input-3"
            v-model="formulario.solicitanteOutros"
            type="text"
            required
          ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-6"
            label="Responsavel pela Projeto"
            label-for="input-6"
            description="Quem e o responsavel pelo projeto"
          >
            <b-form-input
              id="input-6"
              v-model="formulario.responsavelDemanda"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-7"
            label="Responsavel pela Alteração"
            label-for="input-7"
            description="Quem e o responsavel pela demanda"
          >
            <b-form-input
              id="input-7"
              v-model="formulario.responsavelAlteracao"
              type="text"

            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-8"
            label="Titulo da Demanda"
            label-for="input-8"
          >
            <b-form-input
              id="input-8"
              v-model="formulario.tituloDemanda"
              type="text"
              projeto
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-form-group label="Tipo da Demanda">
         <b-form-radio-group
           id="radio-group-1"
           v-model="formulario.checkbox"
           :options="options"
           name="radio-options"
         ></b-form-radio-group>
       </b-form-group>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group
            id="textarea-group-1"
            label="Descrição da Demanda"
            label-for="textarea-1"
          >
          <b-form-textarea
            id="textarea-1"
            v-model="formulario.descricaoDaDemanda"
            placeholder="De uma rapida explicação sobre o que se deve ser feito..."
            rows="4"
            max-rows="6"
          ></b-form-textarea>

          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row class="my-4">
        <b-col>
          <b-form-file
            :file-name-formatter="uploadImage"
            placeholder="Foto da Viabilidade"
            drop-placeholder="Drop file here..."
            accept=".jpg, .png, .gif"
          ></b-form-file>
        <b-card bg-variant="light"
          class="mt-4"
          label-cols-lg="3"
          title="Viabilidade:" v-if="formulario.imageSrc">

          <img :src="formulario.imageSrc" class="imageFormulario">
        </b-card>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-card bg-variant="light" class="mx-auto">
          <b-form-group
           label-cols-lg="3"
           label="Tabela de criticidade do projeto"
           label-size="lg"
           label-class="font-weight-bold pt-0"
           class="mb-0"
         >
        <b-col>
          <b-form-group
            id="input-group-10"
            label="Nivel de Prioridade"
            label-for="input-10"
          >
            <b-form-input
              id="input-10"
              :value="formulario.prioridade"
              type="text"
              readonly
              v-on="getPrioridade()"

            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="input-group-11"
            label="Prazo pra conclusão"
            label-for="input-11"
          >
            <b-form-input
              id="input-11"
              v-model="formulario.prioridadeData"
              type="date"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>

                <b-form-row >
                  <b-form-group
                  label-align-sm="center"
                  label="NIVEL DE IMPACTO">
                    <table  class="table table-bordered">
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
                          <th class="text-uppercase text-center suave"><b-form-radio v-model="formulario.impacto" value="1"></b-form-radio></th>
                          <th class="text-uppercase text-center suave"><b-form-radio v-model="formulario.impacto" value="2"></b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="3"></b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="4"></b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="5"></b-form-radio></th>
                        </tr>
                        <tr>
                          <th class="text-uppercase text-center">2</b-form-radio></th>
                          <th class="text-uppercase text-center suave"><b-form-radio v-model="formulario.impacto" value="6"></b-form-radio></th>
                          <th class="text-uppercase text-center suave"><b-form-radio v-model="formulario.impacto" value="7"></b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="8"></b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="9"></b-form-radio></th>
                          <th class="text-uppercase text-center ruim"><b-form-radio v-model="formulario.impacto" value="10"></b-form-radio></th>
                        </tr>
                        <tr>
                          <th class="text-uppercase text-center">3</b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="11"></b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="12"></b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="13"></b-form-radio></th>
                          <th class="text-uppercase text-center ruim"><b-form-radio v-model="formulario.impacto" value="14"></b-form-radio></th>
                          <th class="text-uppercase text-center ruim"><b-form-radio v-model="formulario.impacto" value="15"></b-form-radio></th>
                        </tr>
                        <tr>
                          <th class="text-uppercase text-center">4</b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="16"></b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="17"></b-form-radio></th>
                          <th class="text-uppercase text-center ruim"><b-form-radio v-model="formulario.impacto" value="18"></b-form-radio></th>
                          <th class="text-uppercase text-center deuRuim"><b-form-radio v-model="formulario.impacto" value="19"></b-form-radio></th>
                          <th class="text-uppercase text-center deuRuim"><b-form-radio v-model="formulario.impacto" value="20"></b-form-radio></th>
                        </tr>
                        <tr>
                          <th class="text-uppercase text-center">5</b-form-radio></th>
                          <th class="text-uppercase text-center normal"><b-form-radio v-model="formulario.impacto" value="21"></b-form-radio></th>
                          <th class="text-uppercase text-center ruim"><b-form-radio v-model="formulario.impacto" value="22"></b-form-radio></th>
                          <th class="text-uppercase text-center ruim"><b-form-radio v-model="formulario.impacto" value="23"></b-form-radio></th>
                          <th class="text-uppercase text-center deuRuim"><b-form-radio v-model="formulario.impacto" value="24"></b-form-radio></th>
                          <th class="text-uppercase text-center deuRuim"><b-form-radio v-model="formulario.impacto" value="25"></b-form-radio></th>
                        </tr>
                      </tbody>
                    </table>
                  </b-form-group>
                </b-form-row>

        </b-col>
        </b-form-group>
      </b-card>

      </b-form-row>

      <div class="m-4 w-100"></div>
      <hr>
      <h4>CAPEX / LISTA DE AQUISIÇÕES</h4>
      <b-form-row>
        <b-form inline>
        <b-col>
          <b-form-group
            id="input-group-12"
            label="Descrição do Item"
            label-for="input-12"
            description="Nome do item a ser usado"
          >
            <b-form-input
              id="input-12"
              v-model="itlist.descricao"
              type="text"

              placeholder="Cisco 1800"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-13"
            label="Preço do Item"
            label-for="input-13"
            description="Preço do item a ser usado"
          >
            <b-form-input
              id="input-13"
              v-model="itlist.valor"
              type="text"
              placeholder="2000.00"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-14"
            label="Parcelamento do Item"
            label-for="input-14"
            description="Numero de parcelas que esse produto vai ter"
          >
            <b-form-input
              id="input-14"
              v-model="itlist.parcela"
              type="text"
              placeholder="4"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-button variant="info"  @click='addlist()'>Adicionar a Lista</b-button>
        </b-col>
      </b-form >
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-table striped hover :items="formulario.capex" :fields="fields">
            <template slot="item" slot-scope="row">
              {{row.index}}
            </template>
            <template slot="ação" slot-scope="row">
              <b-button size="sm" @click="removelist(row.index, row.item.valor)">
                Excluir
              </b-button>
            </template>
          </b-table>
        </b-col>
      </b-form-row>
      <hr>
      <b-form-row class="mb-5">
        <b-col cols="8" md="8" lg="8">
          <p>PREVISÃO ORÇAMENTÁRIA DO PROJETO </p>
        </b-col>
        <b-col cols="4" md="4" lg="4">
          <p>Total R$: {{ formulario.ittotal }}</p>
        </b-col>
      </b-form-row>

      <b-form-row >
        <b-col col md="6" lg='6'>
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
        </b-col>
        <b-col cols="12" md="auto" lg="6">
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
        </b-col>
      </b-form-row>
      <b-form-row>
        <b-col>
          <b-form-group
            id="input-group-15"
            label="POP de Saida"
            label-for="input-15"
            description="Informe POP de Saida"
          >
          <b-form-select
          id="input-15"
          v-if="formulario.popSaida != 'Outros'"
          v-model="formulario.popSaida"
          :options="popLista"

          ></b-form-select>
          <b-form v-else>
            <b-col>
              <b-form-input
                id="input-15"
                class="mb-1"
                v-model="pop.name"
                type="text"
                placeholder="Novo Pop"
              ></b-form-input>
              <b-button variant="info" @click='addNovoPop(1)'>Adicionar</b-button>
              <b-button variant="danger" @click='formulario.popSaida = "Selecione um..."'>Cancelar</b-button>
            </b-col>
          </b-form>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-16"
            label="POP de Passagem"
            label-for="input-16"
            description="Informe POP de Passagem"
          >
          <b-form-select
          id="input-16"
          v-if="formulario.popPassagem != 'Outros'"
          v-model="formulario.popPassagem"
          :options="popLista"

          ></b-form-select>
          <b-form v-else>
            <b-col>
              <b-form-input
                id="input-16"
                class="mb-1"
                v-model="pop.name"
                type="text"
                placeholder="Novo Pop"
              ></b-form-input>
              <b-button variant="info" @click='addNovoPop(2)'>Adicionar</b-button>
              <b-button variant="danger" @click='formulario.popPassagem = "Selecione um..."'>Cancelar</b-button>
            </b-col>
          </b-form>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-17"
            label="POP A SER UTILIZADO"
            label-for="input-17"
            description="Informe POP A SER UTILIZADO"
          >
          <b-form-select
          id="input-17"
          v-if="formulario.popAUtilizar != 'Outros'"
          v-model="formulario.popAUtilizar"
          :options="popLista"

          ></b-form-select>
          <b-form v-else>
            <b-col>
              <b-form-input
                id="input-16"
                class="mb-1"
                v-model="pop.name"
                type="text"
                placeholder="Novo Pop"
              ></b-form-input>
              <b-button variant="info" @click='addNovoPop(3)'>Adicionar</b-button>
              <b-button variant="danger" @click='formulario.popAUtilizar = "Selecione um..."'>Cancelar</b-button>
            </b-col>
          </b-form>
          </b-form-group>
        </b-col>
      </b-form-row>

      <b-form-row>
        <b-col>
          <b-form-group
            id="textarea-group-2"
            label="Equips no POP"
            label-for="textarea-2"
          >
          <b-form-textarea
            id="textarea-2"
            v-model="formulario.equipsPop"
            placeholder="De uma rapida explicação sobre os Equips no POP"
            rows="4"
            max-rows="6"
          ></b-form-textarea>

          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="textarea-group-3"
            label="Equips no Cliente"
            label-for="textarea-3"
          >
          <b-form-textarea
            id="textarea-3"
            v-model="formulario.equipsCliente"
            placeholder="De uma rapida explicação sobre os Equips no Cliente"
            rows="4"
            max-rows="6"
          ></b-form-textarea>

          </b-form-group>
        </b-col>
      </b-form-row>
      <b-form-row>

        <b-col>
          <b-form-group
            id="input-group-18"
            label="Numero do IP"
            label-for="input-18"
            description="Indentificação do IP"
          >
            <b-form-input
              id="input-18"
              v-model="formulario.ip"
              type="text"
              placeholder="186.216.192.118"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-19"
            label="Mascara de Rede"
            label-for="input-19"
            description="Indentificação da mascara de subrede"
          >
            <b-form-input
              id="input-19"
              v-model="formulario.mask"
              type="text"
              placeholder="/24 ou 255.255.255.0"
            ></b-form-input>
          </b-form-group>
        </b-col>
        <b-col>
          <b-form-group
            id="input-group-20"
            label="Gateway"
            label-for="input-20"
            description="Gateway"
          >
            <b-form-input
              id="input-20"
              v-model="formulario.gateway"
              type="text"

              placeholder="186.216.192.117"
            ></b-form-input>
          </b-form-group>
        </b-col>
    </b-form-row>
    <b-form-row>
      <b-col>
        <b-form-group
          id="textarea-group-4"
          label="ENTREGAS A SEREM DEFINIDAS"
          label-for="textarea-4"
        >
        <b-form-textarea
          id="textarea-4"
          v-model="formulario.entregasSeremDefinidas"
          rows="4"
          max-rows="6"
        ></b-form-textarea>

        </b-form-group>

      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col>
        <b-form-group
          id="input-group-21"
          label="AREAS DA EMPRESA A SEREM ENVOLVIDA"
          label-for="input-21"
          description="Informe as areas da empresa a serem envolvidas nesse Projeto"
        >
        <b-form-select
        id="input-21"
        v-model="listaAreasEnvolvidas"
        :options="areasEnvolvidasSelect"
        ></b-form-select>
        <b-button  variant="info" md="12" lg='12' class="mt-1 w-100" @click='addAreasEnvolvidas()'>
            Adicionar a Lista
        </b-button>
        </b-form-group>
      </b-col>
      <b-col>
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
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col>
        <b-form-group
          id="textarea-group-5"
          label="PENDENCIAS"
          label-for="textarea-5"
        >
        <b-form-textarea
          id="textarea-5"
          v-model="formulario.pendencias"
          rows="4"
          max-rows="6"
        ></b-form-textarea>

        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col>
        <b-form-group
          id="textarea-group-6"
          label="CONTATOS (PMO)"
          label-for="textarea-6"
        >
        <b-form-textarea
          id="textarea-6"
          v-model="formulario.contatos"
          rows="4"
          max-rows="6"
        ></b-form-textarea>

        </b-form-group>
      </b-col>
    </b-form-row>

    <b-form-row>
      <b-col>
        <b-form-group
          id="textarea-group-7"
          label="PARECER FINAL DA GESTÃO DE PROJETOS"
          label-for="textarea-7"
        >
        <b-form-textarea
          id="textarea-7"
          v-model="formulario.parecer"
          rows="4"
          max-rows="6"
        ></b-form-textarea>

        </b-form-group>
      </b-col>
    </b-form-row>
    <b-form-row class="mb-2">
      <b-col>
      <b-button type="submit" variant="primary">
          Salvar
      </b-button>
      </b-col>
      <b-col>
      <b-button  variant="danger" :to="{ name: 'home', params: {} }"  class="right">
          Cancelar
      </b-button>
      </b-col>
    </b-form-row>
    </b-form>
    </b-container>
  </div>
</template>
<script>
import Formulario from "../../domain/formulario/Formulario";
import FormularioService from '../../domain/formulario/FormularioService';
import Pop from "../../domain/pop/Pop";
import PopService from '../../domain/pop/PopService';
export default {
  name: "FormularioProjeto",
  data() {
        return {
          formulario: new Formulario(),
          file:null,
          solicitantes:[{ text: 'Escolha um...', value: null },{ text: 'Comercial', value: 'Comercial' },"Diretoria Operações","Operação","Outros"],
          options:[
          { text: 'UP GRADE LINK RÁDIO', value: 'UP GRADE LINK RÁDIO' },
          { text: 'UP GRADE LINK FIBRA', value: 'UP GRADE LINK FIBRA' },
          { text: 'INSTALL LINK RÁDIO', value: 'INSTALL LINK RÁDIO' },
          { text: 'INSTALL LINK FIBRA', value: 'INSTALL LINK FIBRA' },
          { text: 'MELHORIAS', value: 'MELHORIAS' },
          { text: 'OUTROS', value: 'OUTROS' },
        ],
          fields: ['item','descricao', 'parcela', 'valor','ação'],
          areasEnvolvidasSelect:["Diretoria Operações", "Implantação","Operação","Manutencação","Comercial","Engenharia","Financeiro","Compras","Juridico"],
          show: true,
          foto:null,
          pop: new Pop(),
          popLista: ['Outros'],
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
  methods: {
    addlist(){
        this.formulario.capex.push(this.itlist);
        this.itlist.valor = this.itlist.valor.replace(',','.');
        this.formulario.ittotal+=parseFloat(this.itlist.valor);
        this.formulario.ittotal = parseFloat(this.formulario.ittotal.toFixed(2));
        this.itlist = {}
    },
    removelist(index,valor){
      this.formulario.capex.splice(index, 1);
      this.formulario.ittotal = this.formulario.ittotal - parseFloat(valor);
      this.formulario.ittotal = parseFloat(this.formulario.ittotal.toFixed(2));
    },
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
          this.popLista.push(this.pop.name)
          this.pop = new Pop();
        }, err=>{
          console.log(err);
        });
    },
    uploadImage(file) {
      var foto = file[0]
      var promise = (foto)=>{
        return new Promise((resolve)=>{
          var reader = new FileReader();

          reader.onload = function(event){
            var fileToAttach = event.target.result;
            resolve(fileToAttach);
          }
          reader.readAsDataURL(foto);
        });
      }
      promise(foto).then(foto => {
        this.fileToAttach = foto;
        this.formulario.imageSrc = foto;
      })
      if (file.length === 1) {
          return file[0].name
        } else {
          return `${file.length} Arquivos Selecionados`
        }
    },
    outputValorCet(){
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
        // console.log(count);
        count ++
      }
    },
    grava(){
      this.service
        .cadastra(this.formulario)
        .then(() => {
          if(this.id) this.$router.push({ name: 'home' });
          this.formulario = new Formulario();
          this.$router.push({ name: 'home' });
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
    .then(pop => {
      for (var i in pop) {
        this.popLista.push(pop[i].name);
      }
    }, err => {
      console.log(err);
    });
  }

}
</script>
<style lang="css" scoped>
.FormularioProjetoTextLeft{
  text-align: left;
}
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
.right{
  float:right
}
.suave{
  background-color: #8EDB35;
}
.normal{
  background-color: #E8D200;
}
.deuRuim{
  background-color: #DF0000;
}
</style>
