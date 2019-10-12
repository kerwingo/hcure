/**
 * author: Wang Hai Feng
 * createTime: 2019/10/7
 * describe: UserStore
 **/

export default {
  state: {
    userInfo: null,
    sicker: null,
    inquireid: ''
  },
  getters: {
    GET_USER_INFO (state) {
      return state.userInfo
    },
    GET_INQUIREID (state) {
      return state.inquireid
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
    },
    SET_INQUIREID (state, data) {
      state.inquireid = data
    }
  },
  actions: {
    SET_USER_INFO ({ commit }, data) {
      commit('SET_USER_INFO', data)
    },
    SET_SICKER ({ commit }, data) {
      commit('SET_SICKER', data)
    },
    SET_INQUIREID ({ commit }, data) {
      commit('SET_INQUIREID', data)
    }
  }
}
