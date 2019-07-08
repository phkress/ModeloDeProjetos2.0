<template lang="html">
  <form class="center-forme" @submit.prevent="logar()">

    <img src="dist/logo.png" alt="Logo Yipi" class="loginLogo">
    <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
       Usuario ou senha invalidos
    </b-alert>
    <div class="form-group">
      <label for="exampleInputEmail1">User</label>
      <input type="text" class="form-control" value='adm' v-model='user.login'>
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" value='123' v-model='user.senha'>
    </div>
    <button type="submit"  class="btn btn-primary">Entrar</button>
  </form>
</template>

<script>
import AuthService from '../../domain/auth/AuthService.js'
import Auth from '../../domain/auth/Auth.js'
import store from '../../store/store'
export default {
  data(){
    return {
      user: new Auth(),
      store,
      showDismissibleAlert: false
    }
  },
  methods:{
    logar(){
      this.service.login(this.user)
      .then((res)=>{
        this.store.token = res.data.token;
        this.store.username = this.user.login;
        this.store.role = res.data.role;
        this.$router.push('home')
      }, err => {
          //this.$router.push('login');
          this.showDismissibleAlert = true;
      })
    },

  },
  created() {
    localStorage.clear();
        this.store.token = '';
        this.store.username = '';
        this.store.role = '';
    this.service = new AuthService(this.$resource);
  }
}
</script>


<style lang="css" scoped>
.loginLogo{
  width: 400px;
  height: auto;
  margin-bottom: 50px;
}
.center-forme{
  width: 400px;
  margin: 5% auto;
}
</style>
