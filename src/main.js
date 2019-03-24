import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { sync } from 'vuex-router-sync'
import validator from './util/validator'
import toast from './common/toast/toast.js'
// 引入 iview 组件
import iView from 'iview'
import 'iview/dist/styles/iview.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(validator)
Vue.use(toast)
Vue.use(iView)

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
