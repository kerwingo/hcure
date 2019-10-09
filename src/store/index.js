/**
 * author: Wang Hai Feng
 * createTime: 2019/10/7
 * describe: 全局的actions
 **/

import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import actions from './actions'
import mutations from './mutations'
import im from './modules/im'
import UserStore from './modules/UserStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    im,
    UserStore
  },
  getters,
  actions,
  mutations
})

export default store
