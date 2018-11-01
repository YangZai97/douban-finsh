import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import jquery from 'jquery'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios'
Vue.prototype.$axios = axios
Vue.prototype.$ = jquery

// 简单配置进度条
NProgress.configure({ easing: 'ease', speed: 1000, showSpinner: false })
router.afterEach(() => {
  NProgress.done()
})

Vue.use(ElementUI)

Vue.config.productionTip = false

// 判断是否需要登录权限 以及是否登录
router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
