import request from '@/utils/request'
/**
 *
 * @param {*} type
 * @param {*} source
 * @returns promise
 * 获取评论或回复
 */
export const getComments = (type, source) => {
  return request({
    url: '/v1_0/comments',
    params: {
      type,
      source
    }
  })
}
/**
 *
 * @param {*} type
 * @param {*} source
 * @returns promise
 * 发布评论或回复
 */
export const sendComments = (target, content, artId) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data: {
      target,
      content,
      art_id: artId
    }
  })
}
/**
 *
 * @param {*} target
 * @returns 添加评论点赞
 */

export const addComLike = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
/**
 *
 * @param {*} target
 * @returns 取消评论点赞
 */
export const delComLike = (articleId) => {
  return request({
    url: `/v1_0/comment/likings/${articleId}`,
    method: 'DELETE'
  })
}
