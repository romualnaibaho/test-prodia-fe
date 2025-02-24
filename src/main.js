import Vue from 'vue'
import App from './App.vue'

import General from '@/helpers/General'

import 'bootstrap/dist/css/bootstrap.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import style from '@/assets/scss/main.scss'

/** router */
import router from '@/router/router'

/** store */
import store from '@/store/store'

Vue.prototype.$general = General

Vue.config.productionTip = false

new Vue({
  style,
  router,
  store,
  render: h => h(App),
}).$mount('#app')