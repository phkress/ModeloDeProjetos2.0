<template>
  <div id="configuracao">
    <b-container fluid>
      <b-row class="mt-3">
        <b-col lg="6">

        </b-col>
        <b-col lg="6">
          <cardForm
           label="Novo Usuario"
           :user='usuario'
           password
           botao="Criar"
           color="success"
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
  name: "configuracao",
  components: {
    'card' : CardProfile,
    'cardForm' : CardProfileForm,
  },
  data: () => ({
    usuario: new Usuario(),
  }),
  created(){

  }
}
</script>
<style lang="css" scoped>
</style>
