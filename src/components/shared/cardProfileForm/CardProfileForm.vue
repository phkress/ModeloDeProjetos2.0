<template>
  <div id="cardProfileForm">
    <b-card bg-variant="light" v-on="loading()">
      <b-form @submit.prevent="grava()">
    <b-form-group
      label-cols-lg="2"
      :label=label
      label-size="lg"
      label-class="font-weight-bold pt-0"
      class="mb-0"
    >
      <b-form-group
        label-cols-sm="3"
        label="Nome:"
        label-align-sm="right"
        label-for="nested-nome"

      >
        <b-form-input
        id="nested-nome"
         v-model='usuario.nome'
         required
         ></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Sobrenome:"
        label-align-sm="right"
        label-for="nested-Sobrenome"
      >
        <b-form-input
        id="nested-Sobrenome"
        v-model='usuario.sobreNome'
        required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Email:"
        label-align-sm="right"
        label-for="nested-email"
      >
        <b-form-input
        id="nested-email"
        v-model='usuario.email'
        required
         ></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Setor:"
        label-align-sm="right"
        label-for="nested-setor"
      >
        <b-form-input id="nested-setor"
        disabled
        v-model='usuario.role'
        v-if="!password"
        ></b-form-input>
        <b-form-select v-model="usuario.role" :options="options" v-else></b-form-select>

      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Login:"
        label-align-sm="right"
        label-for="nested-login"
      >
        <b-form-input
        id="nested-login"
        v-model='usuario.login'
        required
        ></b-form-input>
      </b-form-group>
      <div id='password' v-if='password'>
      <b-form-group
        label-cols-sm="3"
        label="Senha:"
        label-align-sm="right"
        label-for="nested-senha"
      >
        <b-form-input type="password" id="nested-senha" v-model='usuario.senha'></b-form-input>
      </b-form-group>
      <b-form-group
        label-cols-sm="3"
        label="Confirmação:"
        label-align-sm="right"
        label-for="nested-confirmação"
      >
        <b-form-input type="password" id="nested-confirmação" v-model='usuario.confirmacao'></b-form-input>
      </b-form-group>
    </div>
    </b-form-group>

      <b-alert v-model="showDismissibleAlert" :variant='alertColor' dismissible>
        {{msg}}
      </b-alert>
    <b-form-group>
      <b-button type='submit' :variant="color" class="right" >
          {{botao}}
      </b-button>
    </b-form-group>
    </b-form>
  </b-card>
  </div>
</template>
<script>
import Usuario from '../../../domain/usuario/Usuario';
import UsuarioService from '../../../domain/usuario/UsuarioService';
export default {
  name: "cardProfileForm",
  props:{
    label: {
      type:String,
      default: 'Suas Informações'
    },
    options:{
      type:Array
    },
    user: Object,
    botao:{
      type:String,
      default:'Salvar'
    },
    password: {
      type: Boolean,
      default: false
    },
    color:{
      type: String,
      default: 'primary'
    }
  },
  data: () => ({
    usuario: new Usuario(),
    showDismissibleAlert: false,
    alertColor:'danger',
    msg:'Erro!',

  }),
  methods:{
    confirmarSenha(){
      if(this.usuario.confirmacao !== this.usuario.senha){
        this.showAlert(true,'danger','Senhas não coincidem!')
        return true;
      }else{
        this.showAlert(false,'danger','Erro!')
        return false;
      }

    },
    showAlert(status,variante,text){
      this.showDismissibleAlert= status;
      this.msg = text
      this.alertColor = variante
    },
    grava(){
      if(!this.usuario._id){
        if(this.confirmarSenha()){
          return;
        }
      }
      this.usuarioService
        .cadastra(this.usuario)
        .then(usuario => {
          this.usuario = usuario;
          this.showAlert(true,'success','Operação completa com exito!')
        }, err => {
          // this.$router.push("login");
          console.log(err)
        });
        if(this.usuario._id == undefined){
          this.usuario.nome = ""
          this.usuario.sobreNome = ""
          this.usuario.email = ""
          this.usuario.role = ""
          this.usuario.login = ""
          this.usuario.senha = ""
          this.usuario.confirmacao = ""
          this.$emit('atualiza-lista')
        }
    },
    loading(){
      this.usuario = this.$props.user;
    }
  },
  created(){
    this.usuarioService = new UsuarioService(this.$resource);
  }
}
</script>
<style lang="scss" scoped>
</style>
