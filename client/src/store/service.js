import isObject from 'lodash.isobject'
import _cloneDeep from 'lodash.clonedeep'
import _merge from 'lodash.merge'
import api from '@/api.js'
import socket from '@/socket.js'

export default function createServiceModule (servicePath) {
  return function setupStore (store) {
    store.registerModule(servicePath, {
      namespaced: true,
      state: {
        ids: [],
        keyedById: {},
        currentId: null,
        copy: null,
        pagination: {}
      },
      getters: {
        list (state) {
          return state.ids.map(id => state.keyedById[id])
        },
        get: ({ keyedById }) => id => {
          return keyedById[id]
        },
        current (state) {
          return state.currentId ? state.keyedById[state.currentId] : null
        },
        getCopy (state) {
          return state.copy ? state.copy : null
        }
      },
      mutations: {
        addItem (state, item) {
          addItem(state, item)
        },
        addItems (state, items) {
          items.forEach(item => addItem(state, item))
        },
        updateItem (state, item) {
          updateItem(state, item)
        },
        updateItems (state, items) {
          if (!Array.isArray(items)) {
            throw new Error(
              'You must provide an array to the `removeItems` mutation.'
            )
          }
          items.forEach(item => updateItem(state, item))
        },

        removeItem (state, item) {
          const idToBeRemoved = isObject(item) ? item._id : item
          const keyedById = {}
          const { currentId } = state

          state.ids = state.ids.filter(id => {
            if (id === idToBeRemoved) {
              return false
            } else {
              keyedById[id] = state.keyedById[id]
              return true
            }
          })

          state.keyedById = keyedById

          if (currentId === idToBeRemoved) {
            state.currentId = null
            state.copy = null
          }
        },

        removeItems (state, items) {
          if (!Array.isArray(items)) {
            throw new Error(
              'You must provide an array to the `removeItems` mutation.'
            )
          }
          const containsObjects = items[0] && isObject(items[0])
          const keyedById = {}
          const currentId = state.currentId
          let idsToRemove = items
          const mapOfIdsToRemove = {}

          // If the array contains objects, create an array of ids. Assume all are the same.
          if (containsObjects) {
            idsToRemove = items.map(item => item._id)
          }

          // Make a hash map of the idsToRemove, so we don't have to iterate inside a loop
          idsToRemove.forEach(idToRemove => {
            mapOfIdsToRemove[idToRemove] = idToRemove
          })

          // Filter the ids to be those we're keeping. Also create new keyedById.
          state.ids = state.ids.filter(id => {
            if (mapOfIdsToRemove[id]) {
              return false
            } else {
              keyedById[id] = state.keyedById[id]
              return true
            }
          })

          state.keyedById = keyedById

          if (currentId && mapOfIdsToRemove[currentId]) {
            state.currentId = null
            state.copy = null
          }
        },

        clearAll (state) {
          state.ids = []
          state.currentId = null
          state.copy = null
          state.keyedById = {}
        },

        clearList (state) {
          let currentId = state.currentId
          let current = state.keyedById[currentId]

          if (currentId && current) {
            state.keyedById = {
              [currentId]: current
            }
            state.ids = [currentId]
          } else {
            state.keyedById = {}
            state.ids = []
          }
        },

        setCurrent (state, itemOrId) {
          let id
          let item
          if (isObject(itemOrId)) {
            id = itemOrId._id
            item = itemOrId
          } else {
            id = itemOrId
            item = state.keyedById[id]
          }
          state.currentId = id
          state.copy = _cloneDeep(item)
        },

        clearCurrent (state) {
          state.currentId = null
          state.copy = null
        },

        rejectCopy (state) {
          let current = state.keyedById[state.currentId]
          _merge(state.copy, current)
        },

        commitCopy (state) {
          let current = state.keyedById[state.currentId]
          _merge(current, state.copy)
        }
      },
      actions: {
        async find ({ commit, dispatch, getters }, params = {}) {
          try {
            const findResponse = await api.get(servicePath, {
              params
            })
            dispatch('addOrUpdateList', findResponse.data)
            return findResponse.data
          } catch (error) {
            return Promise.reject(error)
          }
        },
        async get ({ commit, dispatch }, args) {
          let id
          let params

          if (Array.isArray(args)) {
            id = args[0]
            params = args[1]
          } else {
            id = args
          }

          try {
            const getResponse = await api.get(servicePath + '/' + id, {
              params
            })
            const item = getResponse.data
            dispatch('addOrUpdate', item)
            commit('setCurrent', item)
            return item
          } catch (error) {
            return Promise.reject(error)
          }
        },

        async create ({ commit, dispatch }, data) {
          try {
            const createResponse = await api.post(servicePath, data)
            const item = createResponse.data
            dispatch('addOrUpdate', item)
            commit('setCurrent', item)
            socket.send(
              JSON.stringify({
                servicePath,
                action: 'get',
                _id: item._id
              })
            )
            return item
          } catch (error) {
            return Promise.reject(error)
          }
        },
        async patch ({ commit, dispatch }, [id, data, params]) {
          try {
            delete data._id
            await api.put(servicePath + '/' + id, data, params)
            const item = await dispatch('get', id)
            dispatch('addOrUpdate', item)
            socket.send(
              JSON.stringify({
                servicePath,
                action: 'get',
                _id: item._id
              })
            )
            return item
          } catch (error) {
            return Promise.reject(error)
          }
        },

        async remove ({ commit, dispatch }, id) {
          try {
            const removeResponse = await api.delete(servicePath + '/' + id)
            const item = removeResponse.data
            socket.send(
              JSON.stringify({
                servicePath,
                action: 'remove',
                _id: id
              })
            )
            commit('removeItem', id)
            return item
          } catch (error) {
            return Promise.reject(error)
          }
        },
        addOrUpdateList ({ state, commit }, response) {
          const list = response
          const toAdd = []
          const toUpdate = []
          const toRemove = []

          list.forEach(item => {
            let id = item._id
            let existingItem = state.keyedById[id]

            checkId(id, item)

            existingItem ? toUpdate.push(item) : toAdd.push(item)
          })
          state.ids.forEach(id => {
            if (id !== state.currentId && !list.some(item => item._id === id)) {
              toRemove.push(state.keyedById[id])
            }
          })

          commit('removeItems', toRemove)
          commit('addItems', toAdd)
          commit('updateItems', toUpdate)
        },
        addOrUpdate ({ state, commit }, item) {
          let id = item._id
          let existingItem = state.keyedById[id]

          checkId(id, item)

          existingItem ? commit('updateItem', item) : commit('addItem', item)
        }
      }
    })
  }
}

function addItem (state, item) {
  let id = item._id

  if (!state.ids.includes(id)) {
    state.ids.push(id)
  }

  state.keyedById = {
    ...state.keyedById,
    [id]: item
  }
}

function updateItem (state, item) {
  let id = item._id
  state.keyedById[id] = item
}

function checkId (id, item) {
  if (id === undefined) {
    throw new Error(
      'No id found for item. Do you need to customize the `idField`?',
      item
    )
  }
}
