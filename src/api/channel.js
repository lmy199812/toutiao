import request from '@/utils/request'
import storage from '@/utils/storage'
export const getChannels = () => {
  return request({
    url: '/v1_0/user/channels'
  })
}
/** 获取所有用户频道
 * @param {string,Number} target 获取所有用户频道
 * @return Promise
 */
export const getAllChannels = () => {
  return request({
    url: '/v1_0/channels'
  })
}
/** 删除用户频道
 * @param {string,Number} target 删除用户频道id
 * @return Promise
 */
export const delMychannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method: 'DELETE'
  })
}
/** 添加我的频道
 * @param {Number} id 我的频道id
 * @param {Number} seq 我的频道seq
 * @return Promise
 */
export const addMyChanel = (id, seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{ id, seq }]
    }
  })
}

const HEIMA_TOUTIAO_CHANNELS = 'HEIMA_TOUTIAO_CHANNELS'
export const getMyChannelsByLocal = () => storage.get(HEIMA_TOUTIAO_CHANNELS)
export const setMyChannelToLocal = (channel) => storage.set(HEIMA_TOUTIAO_CHANNELS, channel)
