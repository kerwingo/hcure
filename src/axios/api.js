import axios from './http'
import { Message } from 'element-ui'
export function alert (params, type = 'success') {
  Message({
    message: params,
    type: type
  })
}
export function login (data = {}) { // 登录
  return axios({
    url: 'login/doctor',
    method: 'post',
    data
  })
}
export function doctorInfo () { // 获取医生基本信息
  return axios({
    url: 'doctorInfo',
    method: 'get'
  })
}
export function adeptInfo () { // 医生擅长、简介、手写签名显示
  return axios({
    url: 'adeptInfo',
    method: 'get'
  })
}
export function doctorLabelAll () { // 查询医生全部标签
  return axios({
    url: '/labelFindAll',
    method: 'get'
  })
}
export function labelInfo () { // 查询所属医生标签
  return axios({
    url: '/labelInfo',
    method: 'get'
  })
}
export function offlineinterrogation () { // 查询医生线下收入
  return axios({
    url: 'offlineinterrogation',
    method: 'get'
  })
}
export function updateAdept (data) { // 修改医生擅长
  return axios({
    url: `updateAdept`,
    method: 'post',
    data: data
  })
}
export function updateintroduce (data) { // 修改医生个人简介
  return axios({
    url: 'introduce',
    method: 'post',
    data
  })
}
