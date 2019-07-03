<template>
  <div id="listaFormularios" class="mt-3">
    <b-row>
     <b-col>
       <b-form class="right" inline>
         <label class="sr-only" for="inline-form-input-username">Nome</label>
          <b-input-group prepend="Pesquisa" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input id="inline-form-input-username" placeholder="Buscar pelo Numero" v-model='filtro'></b-input>
          </b-input-group>
       </b-form>
     </b-col>
     <b-col><h4 style="text-align:center">Formularios</h4></b-col>
     <b-col>
       <router-link :to='{name: "formularioProjeto"}'>
        <button type="button" class="btn btn-primary pull-right">Novo Formualario</button>
      </router-link>
     </b-col>
   </b-row>

   <table class="table table-striped mt-4">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Numero</th>
          <th scope="col">Nome</th>
          <th scope="col">Prioridade</th>
          <th scope="col">Data (aaaa-mm-dd)</th>
          <th scope="col" colspan="3">Ações</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="(form,index) of projetosComFiltro">
            <td scope="col">{{index}}</td>
            <td scope="col">{{form.numeroDoProjeto}}</td>
            <td scope="col">{{form.nomeDoProjeto}}</td>
            <td scope="col" class="text-uppercase" v-bind:class="getColor(form.prioridade)"><strong>{{form.prioridade}}</strong></td>
            <td scope="col">{{form.data}}</td>
            <td>
              <router-link :to="{ name : 'formularioProjeto', params: { id: form._id} }">
                <button type="button" class="btn btn-link">
                    <span class="glyphicon glyphicon-pencil"></span>
                    Editar
                </button>
              </router-link>
            </td>
            <td>
              <a :href='"http://localhost:3005/v1/formulario/imprimir/"+form._id'>
                <button type="button" class="btn btn-link">
                    <span class="glyphicon glyphicon-print"></span>
                    Imprimir
                </button>
              </a>
            </td>
            <td>
              <button type="button" class="btn btn-link" @click='remover(form,index)'>
                  <span class="glyphicon glyphicon-trash"></span>
                  Excluir
              </button>
            </td>
          </tr>
      </tbody>
    </table>

  </div>
</template>
<script>
import FormularioService from '../../../domain/formulario/FormularioService';
export default {
  name: "ListaDeFormularios",
  data: () => ({
      filtro: '',
      formularios: []
  }),
  computed: {
    projetosComFiltro(){
      if(this.formularios){
        let exp = new RegExp(this.filtro.trim(), 'i');
        return this.formularios.filter(formulario => exp.test(formulario.numeroDoProjeto));
      }else{
        return this.formularios;
      }
    }
  },
  methods:{
    getColor(info){
       let color = '';
       switch (info) {
         case 'Altíssima':
            color = 'deuRuim';
            break;
         case 'Alta':
            color = 'ruim';
            break;
         case 'Media':
            color = 'normal';
            break;
         case 'Normal':
            color = 'suave';
            break;
        default:
          color = '';
        break;
      }
       return color;
    },
    remover(form, index){
      // console.log('remover',form);
      this.service.apaga(form._id)
        .then(()=>{
          this.formularios.splice(index,1);
        }, err =>{

        });
    },

  },
  created() {
    this.service = new FormularioService(this.$resource);

    this.service
      .lista()
      .then(formularios => this.formularios = formularios, err => {
        // this.$router.push("login");
        console.log(err)
      });

  }
}
</script>
<style lang="css" scoped>
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
