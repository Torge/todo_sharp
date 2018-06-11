import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth'
import service from './service'

import socket from '@/socket.js'

/**
 * In dem Store index wird der Store von Vuex eingereichtet und die Services als plugin eingebunden
 * Es werden hier auch auf die socket messages reagiert
*/

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
