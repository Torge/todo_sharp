import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import service from './service'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth
  },
  plugins: [service('project'), service('ticket'), service('user')]
})
