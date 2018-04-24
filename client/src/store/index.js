import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'

import strapi from './strapi'
import flask from './flask'
const api = process.env.VUE_APP_API_VERSION === 'strapi' ? strapi : flask

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    api,
    auth
  }
})
