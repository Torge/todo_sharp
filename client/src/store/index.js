import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import service from './service'

import socket from '@/socket.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    auth
  },
  plugins: [service('project'), service('ticket'), service('user')]
})

socket.onmessage = message => {
  const event = JSON.parse(message.data)
  if (event.action === 'remove') {
    store.commit(`${event.servicePath}/removeItem`, event._id)
  } else {
    store.dispatch(`${event.servicePath}/${event.action}`, event._id)
  }
}

export default store
