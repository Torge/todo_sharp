import axios from 'axios'
import { VueAuthenticate } from 'vue-authenticate'

const vueAuth = new VueAuthenticate(axios, {
  baseUrl: process.env.VUE_APP_API_URL,
  providers: {
    google: {
      clientId: '1027715718368-niq4gvn9hie8rr079ouv6p0osumdm4vb.apps.googleusercontent.com',
      redirectUri: 'http://localhost:8080/login',
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
    async login ({dispatch}, accessToken) {
      let loginRes = await axios({
        method: 'get',
        url: `${process.env.VUE_APP_API_URL}/auth/google/callback`,
        params: {'access_token': accessToken}
      })
      console.log(loginRes)
    },
    authenticate (context, accessToken) {
      console.log(`${process.env.VUE_APP_API_URL}/connect/google`)
    }
  }
}
