import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import store from './store/store';

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.http.options.root = 'http://localhost:3005';

Vue.http.interceptors.push(function(request, next) {
  request.headers.set('x-access-token', store.token);
});

const router = new VueRouter({
  routes,
   mode: 'history'
 });

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
