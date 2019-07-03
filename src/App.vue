<template>
  <div id="app">
    <my-bar titulo="Controle de Projetos" :menu="routes" ></my-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import Bar from './components/shared/bar/Bar.vue';
import { routes } from './routes';
export default {
  name: 'App',
  components: {
    'my-bar' : Bar,
  },
  data () {
    return {
      routes : routes.filter(route => route.menu)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.right{
  float:right
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
