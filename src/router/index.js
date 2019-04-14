import Vue from 'vue'
import Router from 'vue-router'
import layout from '@/views/layout'
import login from '@/views/login'
import home from '@/views/Home'
import user from '@/views/user'
import rightsList from '@/views/rights' // 权限列表
import rolesList from '@/views/roles'
import { getItem } from '@/utils/auth'
import shopList from '@/views/shop'
import addShop from '@/views/addShop'
import categories from '@/views/categories'
import GoodsCategory from '@/views/GoodsCategory'
import order from '@/views/orders'
import reports from '@/views/reports'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/',
      component: layout,
      children: [
        { path: '', component: home },
        { path: '/users', component: user },
        { path: '/rights', component: rightsList }, // 权限列表
        { path: '/roles', component: rolesList }, // 角色列表
        { path: '/goods', component: shopList }, // 商品列表
        { path: '/addShop', component: addShop }, // 添加商品
        { path: '/params', component: categories }, // 商品管理的分类参数
        { path: '/categories', component: GoodsCategory }, // 商品管理的商品分类
        { path: '/orders', component: order }, // 订单数据列表
        { path: '/reports', component: reports } // 数据统计表
      ]
    },
    { path: '/login', component: login }
  ]
})
  /* to 去哪儿
  * from 来自哪儿
  * next 执行规则
  */
  router.beforeEach((to, from, next) => {
    console.log('1. 先进入路由导航，校验是否有 token')
  //如果路由路径是 /login 则直接通过
    if (to.path === '/login') {
      return next()
    }
  //否则验证登陆状态,获取用getItem，设置用setItem(设置必须是两个参数)
    // const token = window.localStorage.getItem('token')
    const token = getItem()
  //如果没有登陆，就跳转到登陆页
    if (!token) {
      return next('/login')
    }
  //如果登陆了，就通过
    next()
  })

export default router
