import api from '@/api.js'

export default {
  namespaced: true,
  state: {
    accessToken: null,
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
    logout (state) {
      state.accessToken = null
      if (state.user) {
        state.user = null
      }
    }
  },
  actions: {
    async authenticate ({ commit, state, dispatch }, accessToken) {
      try {
        let loginResponse = await api.get('/auth/google/callback', {
          params: { access_token: accessToken }
        })
        const { jwt, user } = loginResponse.data
        localStorage.setItem('todo_sharp_jwt', jwt)
        commit('setAccessToken', jwt)
        commit('setUser', user)
      } catch (error) {
        return Promise.reject(error)
      }
    }
  },
  async logout ({ commit }) {
    commit('logout')
  }
}
