<template>
  <div id="configuracao">
    <b-container fluid>
      <b-row class="mt-3">
        <b-col cols="12" sm="12" lg="7">
          <cardList
            :lItens="lItens"
            :lFields="lFields"
            @excluir-usuario-lista="excluirItem"
          >
          </cardList>
        </b-col>
        <b-col cols="12" sm="12" lg="5">
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
        <b-col sm="12" cols="12">
          <cardEmail
              :eItens="eItens"
              :eFields="eFields"
              :listaEmail="elistaEmail"
              @salvar-listaDeEmail="salvarListaEmail"
              @reload-listaDeEmail="reload"
          >
          <b-alert v-model="showDismissibleAlert" :variant='alertColor' dismissible>
            {{msg}}
          </b-alert>
        </cardEmail>
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
    eFields:["email",'Lançando','Aberto','Pré-Viabilidade','Orçamento','Compras','Engenharia','Instalação','Entregue'],
    options: ["Projeto","Compra","Comercial","Engenharia","Financeiro"],
    elistaEmail: new ListaEmail(),
    showDismissibleAlert: false,
    alertColor:'danger',
    msg:'Erro!',
  }),
  methods:{
    showAlert(status,variante,text){
      this.showDismissibleAlert= status;
      this.msg = text
      this.alertColor = variante
    },
    reload(){
      this.carregarListaEmail();
      this.showAlert(true,'warning','Lista Atualizada com sucesso!');

    },
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
          .then(listaEmail => {
            this.elistaEmail = listaEmail
            this.showAlert(true,'success','Lista salva com sucesso!');
          }, err =>{
            console.log(err);
            this.showAlert(false,'danger','Erro!')
          });
          this.carregarListaEmail();
    },
    carregarListaEmail(){
      this.listaEmailService
        .lista()
        .then(listaEmail =>{
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
