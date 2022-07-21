<template>
  <div @click="toNews">
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPage"
      success-text="刷新成功"
      ><van-list
        @load="loadNextPage"
        offset="1"
        v-model="loading"
        :error.sync="error"
        error-text="出错了，请重新加载"
        :finished="isFinished"
        finished-text="没有更多了"
      >
        <ArticleItem
          v-for="(item, index) in articles"
          :key="index"
          :articleInfo="item"
        >
        </ArticleItem> </van-list
    ></van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api'
import ArticleItem from './ArticleItem'
export default {
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  created() {
    this.getArticleList()
  },
  methods: {
    // 获取频道列表
    async getArticleList() {
      try {
        // 获取状态码
        const { data } = await getArticleList(this.id, +new Date())
        this.pre_timestamp = data.data.pre_timestamp
        this.articles = data.data.results
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('获取文章列表失败，请重新刷新')
        }
      }
    },
    // 加载下一页频道数据
    async loadNextPage() {
      try {
        if (Math.random() < 0.7) {
          throw new Error('错误了')
        }
        const { data } = await getArticleList(this.id, this.pre_timestamp)
        if (!data.data.pre_timestamp) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...data.data.results)
        } else {
          this.articles.push(...data.data.results)
        }
        // 将第n页的数据，放在articles
        this.articles.push(...data.data.results)
        // 更新页数
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.error = true
      } finally {
        // loading设定为false
        this.loading = false
        this.refreshLoading = false
      }
    },
    toNews(id) {
      this.$router.push(`/news/${id}`)
    }
  }
}
</script>

<style></style>
