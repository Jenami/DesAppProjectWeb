import Vue from 'vue';
import VueI18n from 'vue-i18n';
import App from './App.vue';
import VueRouter from 'vue-router'
import {store} from './store';

Vue.use(VueRouter)
Vue.use(VueI18n)

//I 18 N
import messages from './translations.js';
const i18n = new VueI18n({
  locale: 'en', // set locale
  messages // set locale messages
})


//ROUTER
import routes from './routes.js'
const router = new VueRouter({
  mode: 'history',
  //base: __dirname,
  routes
})

new Vue({
  router,
  i18n,
  store,
  render: h => h(App)
}).$mount('#app')
