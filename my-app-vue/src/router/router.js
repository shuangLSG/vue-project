import App from '../App'
import Vue from 'vue'
import VueRouter from 'vue-router'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
const incereseList = r => require.ensure([], () => r(require('../page/incereseList/incereseList')), 'incereseList')
const market = r => require.ensure([], () => r(require('../page/market/market')), 'market')
const login = r => require.ensure([], () => r(require('../page/login/login')), 'login')
const order = r => require.ensure([], () => r(require('../page/order/order')), 'order')
const coupon = r => require.ensure([], () => r(require('../page/coupon/coupon')), 'coupon')


Vue.use(VueRouter)

export default new VueRouter({
  routes: [{
    path: '/',
    component: App, //顶层路由，对应index.html
    children: [{
      path: '',
      component: home
    }, {
      path: '/home',
      component: home
    },{ 
      path:'/incereseList',
      component:incereseList
    },{
      path:'/market',
      component:market
    },{
      path:'/login',
      component:login
    },{
      path:'/order',
      component:order,
      meta: { keepAlive: true }
    },{
      path:'/coupon',
      component:coupon
    }]
  }]
})
