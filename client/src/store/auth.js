import api from '@/api.js'

export default {
  namespaced: true,
  state: {
    accessToken: null,

    isAuthenticatePending: false,
    isLogoutPending: false,

    errorOnAuthenticate: null,
    errorOnLogout: null,
    user: null
  },
  getters: {},
  mutations: {
    setAccessToken (state, payload) {
      state.accessToken = payload
    },
    setUser (state, payload) {
      state.user = payload
    },

    setAuthenticatePending (state) {
      state.isAuthenticatePending = true
    },
    unsetAuthenticatePending (state) {
      state.isAuthenticatePending = false
    },
    setLogoutPending (state) {
      state.isLogoutPending = true
    },
    unsetLogoutPending (state) {
      state.isLogoutPending = false
    },

    setAuthenticateError (state, error) {
      state.errorOnAuthenticate = Object.assign({}, error)
    },
    clearAuthenticateError (state) {
      state.errorOnAuthenticate = null
    },
    setLogoutError (state, error) {
      state.errorOnLogout = Object.assign({}, error)
    },
    clearLogoutError (state) {
      state.errorOnLogout = null
    },

    logout (state) {
      state.accessToken = null
      if (state.user) {
        state.user = null
      }
    }
  },
  actions: {
    async authenticate ({ commit, state, dispatch }, accessToken) {
      commit('setAuthenticatePending')
      if (state.errorOnAuthenticate) {
        commit('clearAuthenticateError')
      }

      try {
        let loginResponse = await api.get('/auth/google/callback', {
          params: { access_token: accessToken }
        })
        const { jwt, user } = loginResponse.data
        localStorage.setItem('todo_sharp_jwt', jwt)
        commit('setAccessToken', jwt)
        commit('setUser', user)

        commit('unsetAuthenticatePending')
      } catch (error) {
        commit('setAuthenticateError', error)
        commit('unsetAuthenticatePending')
        return Promise.reject(error)
      }
    }
  },
  async logout ({ commit }) {
    commit('logout')
  }
}
