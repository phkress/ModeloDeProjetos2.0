<template>
  <div id="configuracao">
    <b-container fluid>
      <b-row class="mt-3">
        <b-col lg="7">
          <cardList
            :titens="itens"
            :tfields="fields"
            @excluir-usuario-lista="excluirItem"
          >
          </cardList>
        </b-col>
        <b-col lg="5">
          <cardForm
           label="Novo Usuario"
           :user='usuario'
           password
           botao="Novo Usuario"
           color="success"
           @atualiza-lista="lista"
          >
          </cardForm>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import CardProfileForm from '../shared/cardProfileForm/CardProfileForm.vue';
import CardListUsuario from '../shared/cardListUsuario/CardListUsuario.vue';
import UsuarioService from '../../domain/usuario/UsuarioService';
export default {
  name: "configuracao",
  components: {
    'cardForm' : CardProfileForm,
    'cardList' : CardListUsuario,
  },
  data: () => ({
    usuario:{},
    itens:[],
    fields:['login','nome','sobreNome','email','role','ação']
  }),
  methods:{
    excluirItem(usuario){
      this.usuarioService
          .apaga(usuario.id)
          .then(()=>{
              this.itens.splice(usuario.index,1);
          }, err =>{
            console.log(err);
          });
    },
    lista(){
      this.usuarioService
          .listaUsuario()
          .then(usuarios =>this.itens = usuarios, err=>{
            console.log(err);
          });
    },
  },
  created(){
      this.usuarioService = new UsuarioService(this.$resource);
      this.lista();
  }
}
</script>
<style lang="css" scoped>
</style>
