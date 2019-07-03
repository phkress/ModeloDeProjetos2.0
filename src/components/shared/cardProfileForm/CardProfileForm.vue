<template>
  <div id="cardProfileForm">
    <b-card bg-variant="light" v-on="loading()">
    <b-form-group
      label-cols-lg="3"
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
        <b-form-input id="nested-nome" v-model='usuario.nome'></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Sobrenome:"
        label-align-sm="right"
        label-for="nested-Sobrenome"
      >
        <b-form-input id="nested-Sobrenome" v-model='usuario.sobreNome'></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Email:"
        label-align-sm="right"
        label-for="nested-email"
      >
        <b-form-input id="nested-email" v-model='usuario.email'></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Setor:"
        label-align-sm="right"
        label-for="nested-setor"
      >
        <b-form-input id="nested-setor"
        disabled
        v-model='usuario.role'></b-form-input>
      </b-form-group>

      <b-form-group
        label-cols-sm="3"
        label="Login:"
        label-align-sm="right"
        label-for="nested-login"
      >
        <b-form-input id="nested-login" v-model='usuario.login'></b-form-input>
      </b-form-group>
    </b-form-group>
    <b-form-group>
      <b-button  variant="primary" class="right" @click="grava()">
          Salvar
      </b-button>
    </b-form-group>
  </b-card>
  </div>
</template>
<script>
import Usuario from '../../../domain/usuario/Usuario';
import UsuarioService from '../../../domain/usuario/UsuarioService';
export default {
  name: "cardProfileForm",
  props:{
    label: String,
    user: Object,
  },
  data: () => ({
    usuario: new Usuario()
  }),
  methods:{
    grava(){
      this.usuarioService
        .cadastra(this.usuario)
        .then(usuario => this.usuario = usuario, err => {
          // this.$router.push("login");
          console.log(err)
        });
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
