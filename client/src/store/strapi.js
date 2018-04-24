import axios from 'axios'
import { VueAuthenticate } from 'vue-authenticate'

const vueAuth = new VueAuthenticate(axios, {
  baseUrl: process.env.VUE_APP_API_URL,
  providers: {
    google: {
      clientId: '1027715718368-niq4gvn9hie8rr079ouv6p0osumdm4vb.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/auth/callback',
      url: '/auth/google/callback'
    }
  }
})

export default {
  state: {

  },
  getters: {
    isAuthenticated () {
      return vueAuth.isAuthenticated()
    }
  },
  mutations: {

  },
  actions: {
    login () {
      return vueAuth.authenticate('google').then(console.log)
    }
  }
}
