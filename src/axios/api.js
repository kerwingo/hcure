import axios from './http'
import { Message } from 'element-ui'
let baseDate = {
  'code': '1',
  'flag': '2',
  'access': '3'
}
export function alert (params, type = 'success') {
  Message({
    message: params,
    type: type
  })
}
/*
* 用户相关
*/
export function login (data = {}) { // 登录
  return axios({
    url: 'login/doctor',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function doctorInfo (data = {}) { // 获取医生基本信息
  return axios({
    url: 'doctorInfo',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function adeptInfo (data = {}) { // 医生擅长、简介、手写签名显示
  return axios({
    url: 'adeptInfo',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function doctorLabelAll (data = {}) { // 查询医生全部标签
  return axios({
    url: '/labelFindAll',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function labelInfo (data = {}) { // 查询所属医生标签
  return axios({
    url: '/labelInfo',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}

export function updateAdept (data) { // 修改医生擅长
  return axios({
    url: `updateAdept`,
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function updateintroduce (data) { // 修改医生个人简介
  return axios({
    url: 'introduce',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function rate (data) { // 获取登录医生的解答次数和好评率
  return axios({
    url: 'inquire/rate',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function sickInfo (data) { // 根据患者Id查询患者信息
  return axios({
    url: 'sick/info',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function address (data) { // 获取医生所属机构的地址
  return axios({
    url: 'org/address',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function imInfo (data) { // 获取登录医生用户的环信账号信息
  return axios({
    url: 'talk/info',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}

/*
线下问询
*/
export function saveRxs (data) { // 医生提交处方单
  return axios({
    url: 'inquiresRxs/saveRxs',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function inquires (data) { // 获取医生在线问询列表
  return axios({
    url: 'inquires/page',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function inquiresOpen (data) { // 医生开启问询
  return axios({
    url: 'inquires/open',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function inquiresClose (data) { // 医生结束问询
  return axios({
    url: 'inquires/close',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
/*
数据查询相关
*/
export function getDiagdescs (data) { // 获取临床诊断
  return axios({
    url: 'diagdescs/page',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function diagdescsNum (data) { // 选择一项临床诊断后,对该诊断的使用次数 + 1
  return axios({
    url: 'diagdescs/num',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function itemsPage (data) { // 获取本机构检查项目列表
  return axios({
    url: 'items/page',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function scriptsPage (data) { // 获取本机构药方列表
  return axios({
    url: 'scripts/page',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function drugsList (data) { // 根据药方ID获取本机构中药药品列表
  return axios({
    url: 'drugs/list',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function drugsPage (data) { // 搜索本机构药品
  return axios({
    url: 'drugs/page',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
export function drugsInfo (data) { // 根据ID获取药品信息
  return axios({
    url: 'drugs/info',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
/*
线下收入
*/
export function offlineinterrogation (data = {}) { // 查询医生线下收入
  return axios({
    url: 'offlineinterrogation',
    method: 'post',
    data: {...baseDate, 'data': data}
  })
}
