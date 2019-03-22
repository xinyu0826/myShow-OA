import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'
import login from '@/views/login'
import home from '@/views/Home'
import user from '@/views/user'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',
      component: layout,
      children: [
        { path: '', component: home },
        { path: '/users', component: user }
      ]
    },
    { path: '/login', component: login }
  ]
})
