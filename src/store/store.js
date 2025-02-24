import Vue from 'vue'
import Vuex from 'vuex'

/** auth */
import auth from './auth/auth_store'
import legacyRouterStore from './legacyRouter'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    /** auth */
    auth,
    legacyRouterStore
  },
  state: {},
  mutations: {},
  actions: {}
})