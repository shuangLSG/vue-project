// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import App from './App'
import Vue from 'vue'
import {routerMode} from './config/env'
import router from './router/router'
import store from './store/'
import './config/rem'
import FastClick from 'fastclick'   

// 去掉移动端点击300延迟（双击会缩放导致click判断延迟）
FastClick.attach(document.body);


Vue.config.productionTip = false



/* eslint-disable no-new */
new Vue({
  router,
  store
}).$mount('#app')
