// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
// axios请求
import axios from 'axios'
Vue.prototype.$axios = axios

// ui框架
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'
Vue.use(YDUI);

// 引入Vuex状态管理
import store from './store'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
