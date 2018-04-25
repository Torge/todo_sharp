import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import GoogleAuth from 'vue-google-oauth'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(GoogleAuth, {client_id: '1027715718368-niq4gvn9hie8rr079ouv6p0osumdm4vb.apps.googleusercontent.com'})
Vue.googleAuth().load()
Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
