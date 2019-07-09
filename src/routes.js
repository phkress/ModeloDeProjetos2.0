import Home from './components/home/Home.vue';
import Login from './components/login/Login.vue';
import Profile from './components/profile/Profile.vue';
import Configuracao from './components/configuracao/Configuracao.vue';
import FormularioProjeto from './components/formularioProjeto/FormularioProjeto.vue';

export const routes = [
  {path: '', name:'home', component: Home, titulo: 'Home', menu: true},
  {path: '/login', name:'Login', component: Login,  titulo: 'Login', menu: false},
  {path: '/profile', name:'Profile', component: Profile,  titulo: 'Profile', menu: false},
  {path: '/configuracao', name:'Configuracao', component: Configuracao,  titulo: 'Configuracao', menu: false},
  {path: '/formularioProjeto', name:'formularioProjeto', component: FormularioProjeto,  titulo: 'FormularioProjeto', menu: false},
  {path: '*', name:'homeGeral', component: Home, titulo: 'Home', menu: false},
];
