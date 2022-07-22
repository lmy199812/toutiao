import request from '@/utils/request'
/**
 *
 * @param 获得新闻列表
 * @returns promise
 */
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
/**
 *
 * @param 获得新闻详情
 * @returns promise
 */
export const getNewsList = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`
  })
}
/**
 *
 * @param 添加收藏
 * @returns promise
 */
export const addCollections = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 *
 * @param 取消收藏
 * @returns promise
 */

export const delCollections = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE'
  })
}
/**
 *
 * @param {*} target
 * @returns 添加点赞
 */

export const addLike = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 *
 * @param {*} target
 * @returns 取消点赞
 */
export const delLike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE'
  })
}
