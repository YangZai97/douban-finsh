import Vue from 'vue'
import Router from 'vue-router'
// import home from '@/components/home.vue'
// import detail from '@/components/detail.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: (resolve) => require(['@/components/home.vue'], resolve)
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: (resolve) => require(['@/components/detail.vue'], resolve)
    }
  ]
})
