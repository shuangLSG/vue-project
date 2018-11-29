// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Router from 'vue-router'

import {routerMode} from './config/env'
import routes from './router/index'
import store from './store/'
import './config/rem'
import FastClick from 'fastclick'   

// 去掉移动端点击300延迟（双击会缩放导致click判断延迟）
FastClick.attach(document.body);


Vue.config.productionTip = false

Vue.use(Router)
const router = new Router({
  routes,
  mode: routerMode
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store
})
