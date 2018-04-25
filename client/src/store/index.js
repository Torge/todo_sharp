import Vue from 'vue'
import Vuex from 'vuex'

import strapi from './strapi'
import flask from './flask'
const api = process.env.VUE_APP_API_VERSION === 'strapi' ? strapi : flask

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    accessToken: null,

    isAuthenticatePending: false,
    isLogoutPending: false,

    errorOnAuthenticate: null,
    errorOnLogout: null,
    user: null
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    api
  }
})
