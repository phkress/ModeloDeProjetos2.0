import Home from './components/home/Home.vue';
import Login from './components/login/Login.vue';
import Formulario from './components/formulario/Formulario.vue';
import FormularioProjeto from './components/formularioProjeto/FormularioProjeto.vue';
export const routes = [
  {path: '', name:'home', component: Home, titulo: 'Home', menu: true},
  {path: '/login', name:'Login', component: Login,  titulo: 'Login', menu: false},
  {path: '/formulario', name:'formulario', component: Formulario,  titulo: 'Formulario', menu: false},
  {path: '/formularioProjeto', name:'formularioProjeto', component: FormularioProjeto,  titulo: 'FormularioProjeto', menu: false},
  {path: '*', name:'homeGeral', component: Home, titulo: 'Home', menu: false},
];
