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
// 引入 element 组件
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// 引入滚动条插件
import vuescroll from 'vuescroll'
import 'vuescroll/dist/vuescroll.css'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(validator)
Vue.use(toast)
Vue.use(iView)
// Vue.use(ElementUI)
Vue.use(vuescroll)
Vue.prototype.$vuescrollConfig = {
  bar: {
    background: '#eee'
  }
}

sync(store, router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
