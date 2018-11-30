import App from '../App'
import Vue from 'vue'
import VueRouter from 'vue-router'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')


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
    }]
  }]
})
