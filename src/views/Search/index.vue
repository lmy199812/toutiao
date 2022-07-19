<template>
  <div>
    <!-- 头部搜索框 -->
    <form action="/">
      <van-search
        class="search"
        v-model="keywords"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="backToPage"
        @focus="visibleShowSearchSug"
        background="#3296fa"
      />
    </form>
    <!-- 搜索结果/历史/建议 -->
    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHis from './compotents/SearchHis.vue'
import SearchRes from './compotents/SearchRes.vue'
import SearchSug from './compotents/SearchSug.vue'
export default {
  components: {
    SearchHis,
    SearchRes,
    SearchSug
  },
  computed: {
    componentName() {
      if (this.keywords.trim() === '') {
        return 'SearchHis'
      }
      if (this.isShowSearchRes) {
        return 'SearchRes'
      }
      return 'SearchSug'
    }
  },
  data() {
    return {
      keywords: '',
      isShowSearchRes: false
    }
  },
  methods: {
    onSearch() {
      this.isShowSearchRes = true
    },
    backToPage() {
      this.$router.go(-1)
    },
    visibleShowSearchSug() {
      this.isShowSearchRes = false
    }
  }
}
</script>

<style scoped lang="less">
.search {
  [role='button'] {
    color: #fff;
  }
}
</style>
