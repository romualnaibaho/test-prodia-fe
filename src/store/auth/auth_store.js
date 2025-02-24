/**
 * auth store is for saving auth process data
 */
import general from '@/helpers/General'

const getDefaultState = () => {
  return {
    basicInfo: [],
    loginData: null,
    accessToken: null
  }
}

const authStore = {
  namespaced: true,
  state: {
    basicInfo: [],
    loginData: JSON.parse(localStorage.getItem('loginData')),
    accessToken: general.getCookie('accessToken')
  },
  mutations: {
    setBasicInfo(state, value) {
      state.basicInfo = value
    },
    initLoginData(state, value) {
      // init state
      state.loginData = value.loginData
      state.accessToken = value.loginData.accessToken

      // put the object into local storage
      localStorage.setItem('loginData', JSON.stringify(value.loginData))

      // cookie initiation
      const time = new Date()
      const expirationTime = time.getTime() + (1000 * 60000)

      time.setTime(expirationTime)
      document.cookie = `accessToken=${state.accessToken}; expires=${time.toGMTString()}; path=/`
    },
    updateLoginData(state, value) {
      // Put the object into local storage
      localStorage.setItem('loginData', JSON.stringify(value))

      state.loginData = value
    },
    getDataFromLocalStorage(state) {
      state.loginData = JSON.parse(localStorage.getItem('loginData'))
      state.accessToken = general.getCookie('accessToken')
    },
    logout(state) {
      localStorage.removeItem('loginData')

      Object.assign(state, getDefaultState())
    }
  }
}

export default authStore