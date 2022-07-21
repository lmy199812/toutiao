<template>
  <div style="padding: 0 10px">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoadToPage"
      :error.sync="error"
      error-text="请求失败，请重新加载"
      :offset="300"
    >
      <div
        class="every-item"
        style="font-size: 14px"
        v-for="(item, index) in resultsArr"
        :key="index"
      >
        {{ item.title }}
      </div>
    </van-list>
  </div>
</template>

<script>
import { getSearchRes } from '@/api'
export default {
  name: 'SearchRes',
  data() {
    return {
      resultsArr: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },
  props: {
    results: {
      type: String,
      require: true
    }
  },
  created() {
    this.getSearchRes()
  },
  methods: {
    async getSearchRes() {
      try {
        const res = await getSearchRes(this.results)
        // console.log(res)
        this.resultsArr = res.data.data.results
        // console.log(this.resultsArr)
      } catch (error) {
        const status = error.response.status
        if (status === 400) {
          throw new Error(error.response.data.message)
        } else if (status === 507) {
          throw new Error(error.response.data.message)
        } else if (status === 401) {
          throw new Error(error.response.data.message)
        } else {
          this.$toast.fail('请刷新重试!')
        }
      }
    },
    async onLoadToPage() {
      try {
        this.page++
        const {
          data: { data }
        } = await getSearchRes(this.results, this.page)
        if (data.results.length === 0) {
          this.finished = true
        }
        this.resultsArr.push(...data.results)
      } catch (error) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
:deep(.every-item) {
  line-height: 50px;
  border-bottom: 1px solid #eee;
  color: #323233;
  z-index: 30;
}
</style>
