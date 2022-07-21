import request from '@/utils/request'
import store from '@/store'
export const getArticleList = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}
export const getNewsList = (articleId) => {
  return request({
    url: `/v1_0/articles/${articleId}`,
    params: {
      article_id: articleId
    },
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
