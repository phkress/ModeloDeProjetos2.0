<template>
  <div id="myNavBar">
    <div>
      <b-navbar toggleable="lg" type="dark" variant="dark" v-if="isLogged()">
        <b-navbar-brand href="#">{{titulo}}</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item v-for="rota in menu" v-bind:key="rota.titulo" :to="rota.path ? rota.path : '/'">
                {{rota.titulo}}
                <!-- <b-badge pill variant="danger">2</b-badge> -->
            </b-nav-item>
          </b-navbar-nav>

          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-text right>
              Olá, {{this.store.username}}
            </b-nav-text>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template slot="button-content"><em>Menu</em></template>
              <b-dropdown-item :to="'/profile'">Profile</b-dropdown-item>
              <b-dropdown-item :to="'/configuracao'" v-if="isAdmin()">Configuração</b-dropdown-item>
              <b-dropdown-item :to="'/login'">Sair</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
     </div>
  </div>
</template>
<script>
import store from '../../../store/store';
export default {
  name: "BarraDeMenu",
  props: {
    titulo:{
      required: true,
      type: String
    },
    menu:{
      required: true,
      type: Array
    }
  },
  data: () => ({
    store,
  }),
  methods:{
    isLogged(){
      if(this.store.token){
        return true;
      }else{
        return false;
      }
    },
    isAdmin(){
      if(this.store.role == "Projeto"){
        return true
      }else{
        return false
      }
    }
  },
  created() {
    //do something after creating vue instance
  }
}
</script>
<style scoped>
</style>
