<template>
  <div id="profile">
    <b-container fluid>
      <b-row class="mt-3">
        <b-col lg="4">
          <card
            :nome="usuario.nome"
            :sobreNome="usuario.sobreNome"
            :role="usuario.role"
          ></card>
        </b-col>
        <b-col lg="8">
          <cardForm
           label="Suas Informações"
           :user='usuario'
          >
          </cardForm>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import CardProfile from '../shared/cardProfile/CardProfile.vue';
import CardProfileForm from '../shared/cardProfileForm/CardProfileForm.vue';
import Usuario from '../../domain/usuario/Usuario';
import UsuarioService from '../../domain/usuario/UsuarioService';
export default {
  name: "profile",
  components: {
    'card' : CardProfile,
    'cardForm' : CardProfileForm,
  },
  data: () => ({
    usuario: new Usuario(),
    id: null,
  }),
  created(){
    this.usuarioService = new UsuarioService(this.$resource);
    this.usuarioService.mostrarUsuario().then(usuario => {
      this.usuario = usuario
      if(usuario._id){
        this.id = usuario._id
      }
    }, err => {console.log(err)})
  }
}
</script>
<style lang="css" scoped>
</style>
