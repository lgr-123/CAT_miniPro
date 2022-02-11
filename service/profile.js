import request from './network'

import {
  BASE_URL,
  H_config
} from './config'

export function baomin(data){
  return request({
    method:'POST',
    url:'/user/signUp',
    data
  })
}



// 登录
export function login(data) {
  return request({
    url: H_config.API_login_URL,
    method: 'post',
    data: data
  })
}

export const getCollege = () => {
  return request({
    url: H_config.API_college_URL,
    method: 'get'
  })
}

// 获取指定学院的专业
export const getMajor = (data) => {
  return request({
    url: H_config.API_major_URL,
    method: 'post',
    data
  })
}

// 提交报名表
export const stuFormSubmit = (data) => {
  return request({
    url: H_config.API_submitForm_URL,
    method: 'post',
    data: data
  })
}

// 更新用户信息
export const updateUserInfo = (data) => {
  return request({
    url: H_config.API_updateInfo,
    method: 'post',
    data
  })
}

// 获取用户信息
export const getUserInfo = () => {
  return request({
    url: H_config.API_getInfo_URL
   })
}

// 检查token是否过期
export const checkToken = () => {
  return request({
    url: H_config.API_checkToken_URL,
    method: 'post'
  })
}

// 更新用户token
export const updateToken = () => {
  return request({
    url: H_config.API_updateToken_URL,
    method: 'post'
  })
}

// 获取用户报名信息
export function getSignUpInfo(data) {
  return request({
    url: H_config.API_getSignUpInfo_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 检查是否报名
export function checkEnroll(data) {
  return request({
    url: H_config.API_checkEnroll_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取用户进度
export function getBriefInfo(data) {
  return request({
    url: H_config.API_getBriefInfo_URL,
    method: 'post',
    data: data,
    // header: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
  })
}

// 获取可预约时间
export function getAppointTime(data) {
  return request({
    url: H_config.API_getAppointTime_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 预约
export function appointTime(data) {
  return request({
    url: H_config.API_appointTime_URL,
    method: 'post',
    data: data,
    // header: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
  })
}

// 检查预约是否开启
export function appointCheck(data) {
  return request({
    url: H_config.API_appointCheck_URL,
    method: 'post',
    data: data,
    // header: {
    //   'content-type': 'application/x-www-form-urlencoded'
    // }
  })
}

// 获取用户已预约时间
export function selectUserAppoint(data) {
  return request({
    url: H_config.API_selectUserAppoint_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 取消预约
export function cancelAppoint(data) {
  return request({
    url: H_config.API_cancelAppoint_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 查看是否可签到
export const checkStatus = () => {
  return request({
    url: H_config.API_checkStatus_URL,
    method: 'post'
  })
}

// 获取通知列表
export function getNotice(data) {
  return request({
    url: H_config.API_getNotice_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 更改通知状态
export function checkNotice(data) {
  return request({
    url: H_config.API_checkNotice_URL,
    method: 'post',
    data: data,
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    }
  })
}

// 获取消息中心的消息
export function messagelist(data) {
  return request({
    url: H_config.API_messagelist_URL,
    method: 'post',
    // data: data
  })
}

// 确认已读
export function messageread(data) {
  return request({
    url: H_config.API_messageread_URL,
    method: 'post',
    data: data
  })
}

// 获取报名表信息
export function registerInfo(data) {
  return request({
    url: H_config.API_registerInfo_URL,
    method: 'post',
    data: data
  })
}

// 获取未读消息条数
export function messagecheck(data) {
  return request({
    url: H_config.API_messagecheck_URL,
    method: 'post',
    data: data
  })
}

// 
