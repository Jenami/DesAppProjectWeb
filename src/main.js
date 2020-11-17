import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import VueRouter from 'vue-router';
import Toasted from 'vue-toasted';
import store from './store';
import ProjectCard from './components/ProjectCard.vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { domain, clientId } from "./auth_config.json";
import { Auth0Plugin } from "./auth";


Vue.use(VueRouter);
Vue.use(VueI18n);
Vue.use(Toasted);

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  onRedirectCallback: appState => {
    router.push(
      appState && appState.targetUrl
        ? appState.targetUrl
        : window.location.pathname
    );
  }
});

Vue.config.productionTip = false;

Vue.component('ProjectCard', ProjectCard);
Vue.component('Header', Header);
Vue.component('Footer', Footer);

//I 18 N
import messages from './translations.js';
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
});


//ROUTER
import routes from './routes.js'
const router = new VueRouter({
  mode: 'history',
  //base: __dirname,
  routes
});

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app');