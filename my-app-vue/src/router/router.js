import App from '../App'

const home = r => require.ensure([], () => r(require('../page/home/home')), 'home')
// import home from '../page/home/home.vue'

export default [{
  path: '/',
  component: App, //顶层路由，对应index.html
  children: [ //二级路由。对应App.vue
    {
      redirect: home,
      path: ''
    },
    {
      component: home,
      path: '/home'
    }
  ]
}]
