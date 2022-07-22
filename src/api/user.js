import request from '@/utils/request'
import store from '@/store'
/**
 *
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}
/**
 *
 * @param {String} mobile 手机号
 * @returns promise
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
}
/**
 *
 * @param 获取用户信息
 * @returns promise
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
/**
 *
 * @param 添加关注
 * @returns promise
 */
export const addFollow = (userId) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target: userId
    },
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
/**
 *
 * @param 删除关注
 * @returns promise
 */
export const delFollow = (userId) => {
  return request({
    url: `/v1_0/user/followings/${userId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
