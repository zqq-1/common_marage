import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './ElementUi.js'
import '@/api/mock.js'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created(){
    store.commit('addMenu',router)
  },
  render: h => h(App)
}).$mount('#app')
