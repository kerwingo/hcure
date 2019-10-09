/**
 * author: Wang Hai Feng
 * createTime: 2019/10/7
 * describe: UserStore
 **/

export default {
  state: {
    userInfo: null,
    sicker:null,
  },
  getters: {
    GET_USER_INFO (state) {
      return state.userInfo
    },
    GET_SICKER (state) {
      return state.sicker
    }
  },
  mutations: {
    SET_USER_INFO (state, data) {
      state.userInfo = data
    },
    SET_SICKER (state, data) {
      state.sicker = data
    }
  },
  actions: {
    SET_USER_INFO ({ commit }, data) {
      commit('SET_USER_INFO', data)
    },
    SET_SICKER ({ commit }, data) {
      commit('SET_SICKER', data)
    }
  }
}
