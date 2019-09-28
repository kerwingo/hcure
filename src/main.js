// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import {store} from './store/store'
import moment from 'moment'
Vue.use(Vuex)
Vue.use(ElementUI)
/* eslint-disable no-new */
// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', function (el) {
  el.querySelector('input').focus()
})
Vue.prototype.$moment = moment // 赋值使用

new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})
