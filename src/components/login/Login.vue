<template lang="html">
  <form class="center-forme" @submit.prevent="logar()">
    <img src="dist/logo.png" alt="Logo Yipi" class="loginLogo">
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
    }
  },
  methods:{
    logar(){
      this.service.login(this.user)
      .then((res)=>{
        this.store.token = res.data.token;
        this.store.username = this.user.login;
        this.$router.push('home')
      }, err => {
          this.store.token = '';
          this.store.username = '';
          this.$router.push('login');
          console.log("token invalido");
      })
    },

  },
  created() {
    this.store.token = '';
    this.store.username = '';
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
