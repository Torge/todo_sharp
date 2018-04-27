import isObject from 'lodash.isobject'
import _cloneDeep from 'lodash.clonedeep'
import _merge from 'lodash.merge'
import api from '@/api.js'

export default function createServiceModule (servicePath) {
  return function setupStore (store) {
    store.registerModule(servicePath, {
      namespaced: true,
      state: {
        ids: [],
        keyedById: {},
        currentId: null,
        copy: null,
        idField: '_id',
        servicePath,
        autoRemove: true,
        pagination: {},

        isFindPending: false,
        isGetPending: false,
        isCreatePending: false,
        isPatchPending: false,
        isRemovePending: false,

        errorOnFind: null,
        errorOnGet: null,
        errorOnCreate: null,
        errorOnPatch: null,
        errorOnRemove: null
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
          const { idField } = state
          const idToBeRemoved = isObject(item) ? item[idField] : item
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
          const { idField } = state

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
            idsToRemove = items.map(item => item[idField])
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
          const { idField } = state
          let id
          let item
          if (isObject(itemOrId)) {
            id = itemOrId[idField]
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

        // Deep assigns current to copy
        rejectCopy (state) {
          let current = state.keyedById[state.currentId]
          _merge(state.copy, current)
        },

        // Deep assigns copy to current
        commitCopy (state) {
          let current = state.keyedById[state.currentId]
          _merge(current, state.copy)
        },

        // Stores pagination data on state.pagination based on the query identifier (qid)
        // The qid must be manually assigned to `params.qid`
        updatePaginationForQuery (state, { qid, response, query }) {
          const { data, limit, skip, total } = response
          const { idField } = state
          const ids = data.map(item => {
            return item[idField]
          })
          state.pagination = {
            ...state.pagination,
            [qid]: { limit, skip, total, ids, query }
          }
        },

        setFindPending (state) {
          state.isFindPending = true
        },
        unsetFindPending (state) {
          state.isFindPending = false
        },
        setGetPending (state) {
          state.isGetPending = true
        },
        unsetGetPending (state) {
          state.isGetPending = false
        },
        setCreatePending (state) {
          state.isCreatePending = true
        },
        unsetCreatePending (state) {
          state.isCreatePending = false
        },
        setPatchPending (state) {
          state.isPatchPending = true
        },
        unsetPatchPending (state) {
          state.isPatchPending = false
        },
        setRemovePending (state) {
          state.isRemovePending = true
        },
        unsetRemovePending (state) {
          state.isRemovePending = false
        },

        setFindError (state, payload) {
          state.errorOnFind = Object.assign({}, payload)
        },
        clearFindError (state) {
          state.errorOnFind = null
        },
        setGetError (state, payload) {
          state.errorOnGet = Object.assign({}, payload)
        },
        clearGetError (state) {
          state.errorOnGet = null
        },
        setCreateError (state, payload) {
          state.errorOnCreate = Object.assign({}, payload)
        },
        clearCreateError (state) {
          state.errorOnCreate = null
        },
        setPatchError (state, payload) {
          state.errorOnPatch = Object.assign({}, payload)
        },
        clearPatchError (state) {
          state.errorOnPatch = null
        },
        setRemoveError (state, payload) {
          state.errorOnRemove = Object.assign({}, payload)
        },
        clearRemoveError (state) {
          state.errorOnRemove = null
        }
      },
      actions: {
        async find ({ commit, dispatch, getters }, params = {}) {
          commit('setFindPending')
          try {
            const findResponse = await api.get(servicePath, { params })
            dispatch('addOrUpdateList', findResponse.data)
            commit('unsetFindPending')
            return findResponse.data
          } catch (error) {
            commit('setFindError', error)
            commit('unsetFindPending')
            return Promise.reject(error)
          }
        },

        // Two query syntaxes are supported, since actions only receive one argument.
        //   1. Just pass the id: `get(1)`
        //   2. Pass arguments as an array: `get([null, params])`
        async get ({ commit, dispatch }, args) {
          let id
          let params

          if (Array.isArray(args)) {
            id = args[0]
            params = args[1]
          } else {
            id = args
          }

          commit('setGetPending')

          try {
            const getResponse = await api.get(servicePath + '/' + id, {
              params
            })
            const item = getResponse.data
            dispatch('addOrUpdate', item)
            commit('setCurrent', item)
            commit('unsetGetPending')
            return item
          } catch (error) {
            commit('setGetError', error)
            commit('unsetGetPending')
            return Promise.reject(error)
          }
        },

        async create ({ commit, dispatch }, data) {
          commit('setCreatePending')
          try {
            const createResponse = await api.post(servicePath, { data })
            const item = createResponse.data
            dispatch('addOrUpdate', item)
            commit('setCurrent', item)
            commit('unsetCreatePending')
            return item
          } catch (error) {
            commit('setCreateError', error)
            commit('unsetCreatePending')
            return Promise.reject(error)
          }
        },
        async patch ({ commit, dispatch }, [id, data, params]) {
          commit('setPatchPending')
          try {
            const patchResponse = await api.put(servicePath + '/' + id, {
              data,
              params
            })
            const item = patchResponse.data
            dispatch('addOrUpdate', item)
            commit('unsetPatchPending')
            return item
          } catch (error) {
            commit('setPatchError', error)
            commit('unsetPatchPending')
            return Promise.reject(error)
          }
        },

        async remove ({ commit, dispatch }, id) {
          commit('setRemovePending')
          try {
            const removeResponse = await api.delete(servicePath + '/' + id)
            const item = removeResponse.data
            commit('removeItem', id)
            commit('unsetRemovePending')
            return item
          } catch (error) {
            commit('setRemoveError', error)
            commit('unsetRemovePending')
            return Promise.reject(error)
          }
        },
        addOrUpdateList ({ state, commit }, response) {
          const list = response.data || response
          const isPaginated = response.hasOwnProperty('total')
          const toAdd = []
          const toUpdate = []
          const toRemove = []
          const { idField, autoRemove } = state
    
          list.forEach(item => {
            let id = item[idField]
            let existingItem = state.keyedById[id]
    
            checkId(id, item)
    
            existingItem ? toUpdate.push(item) : toAdd.push(item)
          })
    
          if (!isPaginated && autoRemove) {
            // Find IDs from the state which are not in the list
            state.ids.forEach(id => {
              if (id !== state.currentId && !list.some(item => item[idField] === id)) {
                toRemove.push(state.keyedById[id])
              }
            })
            commit('removeItems', toRemove) // commit removal
          }
    
          commit('addItems', toAdd)
          commit('updateItems', toUpdate)
        },
        addOrUpdate ({ state, commit }, item) {
          const { idField } = state
          let id = item[idField]
          let existingItem = state.keyedById[id]
    
          checkId(id, item)
    
          existingItem ? commit('updateItem', item) : commit('addItem', item)
        }
      }
    })
  }
}
function addItem (state, item) {
  const { idField } = state
  let id = item[idField]

  if (!state.ids.includes(id)) {
    state.ids.push(id)
  }

  state.keyedById = {
    ...state.keyedById,
    [id]: item
  }
}
function updateItem (state, item) {
  const { idField } = state
  let id = item[idField]
  state.keyedById[id] = item
}
function checkId (id, item) {
  if (id === undefined) {
    throw new Error('No id found for item. Do you need to customize the `idField`?', item)
  }
}