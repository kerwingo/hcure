/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */

import axios from 'axios'
import { Message } from 'element-ui'
const qs = require('qs')
if (process.env.NODE_ENV == 'production') { // 正式环境
//  axios.defaults.baseURL = 'http://192.168.1.254:8000/api/p/'
  axios.defaults.baseURL = window.location.protocol + '//' + window.location.host + ':8000/api/p/'
} else { // 生产环境
  axios.defaults.baseURL = 'http://192.168.1.240:8200/api/d/'
  // axios.defaults.baseURL = 'http://192.168.1.90:8200/api/d/'
}
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; 是否为from表单提交的传输对象 默认application/json
axios.defaults.headers.common['Accept'] = 'application/json, */*'
axios.interceptors.request.use(config => {
  let token = window.sessionStorage.getItem('token') // token的获取
  if (config.method === 'post' && config.headers['Content-Type'] != 'multipart/form-data') {
    // config.data = qs.stringify(config.data);  表单提交json转字符串
  }
  if (token) { // 统一header传送tonken
    config.headers.common['Access-Token'] = token
  }
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => { // 报错统一处理
  if (response.data.code !== 200) {
    Message({
      message: response.data.message,
      type: 'warning'
    })
  }
  return response
}, error => {
  if (error.response.status == 401) { // 401 的处理
    Message({
      type: 'error',
      message: '账号已失效；为了安全请重新登录',
      center: true
    })
    sessionStorage.removeItem('token')
    return new Promise(() => {}) // pending的promise，中止promise链
  } else {
    Message({
      type: 'error',
      message: error.response.data.error,
      center: true
    })
  }
  return Promise.reject(error)
})
export default axios
