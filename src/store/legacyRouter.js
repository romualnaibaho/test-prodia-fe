const Env = require('@/helpers/Env')

const env = new Env()

const legacyRouterStore = {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {},
  getters: {
    /**
     * @param { determine keyword of the rotue you want to go } where
     * @param { wldcard of variable, must in object format tho } obj
     *
     * this getters will return the full path of legacy route
     */
    goTo: () => (where) => {
      let link = ''

      if (where === 'dashboard') {
        link = 'dashboard'
      }

      return `${env.getEnv('BASE_URL')}/${link}`
    }
  }
}

export default legacyRouterStore