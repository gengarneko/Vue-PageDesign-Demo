import Vue from 'vue'
import Router from 'vue-router'
// 引入入口文件
import pageDesign from './views/pageDesign'
import pageDesignIndex from './views/wireless/Index'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'pageDesignIndex',
      component: pageDesignIndex
    },
    {
      path: '/page',
      name: 'pageDesign',
      component: pageDesign
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach((to, from) => {
  NProgress.done()
})

export default router
