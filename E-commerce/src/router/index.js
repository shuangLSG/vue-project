import Vue from 'vue'
import Router from 'vue-router'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: App, //顶层路由，对应index.html
      children:[{
        path:"",
        component:home
      }, {
        path: '/home',
        component: home
      }]
    }
  ]
})
