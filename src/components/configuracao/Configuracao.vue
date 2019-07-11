<template>
  <div id="configuracao">
    <b-container fluid>
      <b-row class="mt-3">
        <b-col lg="7">
          <cardList
            :lItens="lItens"
            :lFields="lFields"
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
           :options="options"
           @atualiza-lista="listarUsuario"
          >
          </cardForm>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <cardEmail
              :eItens="eItens"
              :eFields="eFields"
              :listaEmail="elistaEmail"
              @salvar-listaDeEmail="salvarListaEmail"
          ></cardEmail>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import CardListEmail from '../shared/cardListEmail/CardListEmail.vue';
import CardProfileForm from '../shared/cardProfileForm/CardProfileForm.vue';
import CardListUsuario from '../shared/cardListUsuario/CardListUsuario.vue';
import ListaEmail from '../../domain/listaEmail/ListaEmail';
import UsuarioService from '../../domain/usuario/UsuarioService';
import ListaEmailService from '../../domain/listaEmail/ListaEmailService';
export default {
  name: "configuracao",
  components: {
    'cardForm' : CardProfileForm,
    'cardList' : CardListUsuario,
    'cardEmail': CardListEmail
  },
  data: () => ({
    usuario:{},
    lItens:[],
    eItens:[],
    lFields:['login','nome','sobreNome','email','role','ação'],
    eFields:["email","Projeto","Compra","Comercial","Engenharia","Financeiro"],
    options: ["Projeto","Compra","Comercial","Engenharia","Financeiro"],
    elistaEmail: new ListaEmail()
  }),
  methods:{
    listaEmail(){
      this.eItens = [];
      for (var i = 0; i < this.lItens.length; i++) {
        this.eItens.push({'email':this.lItens[i].email});
      }
    },
    excluirItem(usuario){
      this.usuarioService
          .apaga(usuario.id)
          .then(()=>{
              this.lItens.splice(usuario.index,1);
              this.listaEmail();
          }, err =>{
            console.log(err);
          });
    },
    listarUsuario(){
      this.usuarioService
          .listaUsuario()
          .then(usuarios =>{
            this.lItens = usuarios;
            this.listaEmail();
          }, err=>{
            console.log(err);
          });
    },
    salvarListaEmail(){
      this.listaEmailService
          .cadastra(this.elistaEmail)
          .then(listaEmail => this.elistaEmail = listaEmail, err =>{
            console.log(err);
          });
          this.carregarListaEmail();
    },
    carregarListaEmail(){
      this.listaEmailService
        .lista()
        .then(listaEmail =>{;
          if(listaEmail !== 'undefined' && listaEmail.length > 0){
            this.elistaEmail = listaEmail[0];
          }
        },err =>{
          console.log(err);
        })
    }
  },
  created(){
      this.usuarioService = new UsuarioService(this.$resource);
      this.listaEmailService = new ListaEmailService(this.$resource);
      this.listarUsuario();
      this.carregarListaEmail();
  }
}
</script>
<style lang="css" scoped>
</style>
