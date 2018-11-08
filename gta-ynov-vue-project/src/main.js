import Vue from 'vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import App from './App.vue'
import router from './router'
import dataManager from './DataManager.js'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

new Vue({
  router,
  data : dataManager,
  render: h => h(App)
}).$mount('#app')
