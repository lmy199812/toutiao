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
    <component
      :is="componentName"
      :keywords="keywords"
      @btnResults="btnResults"
      :results="results"
      :resultsArr="resultsArr"
      @btnSearch="btnSearch"
      @delAll="delAll"
      @delItem="delItem"
    ></component>
  </div>
</template>

<script>
import SearchHis from './compotents/SearchHis.vue'
import SearchRes from './compotents/SearchRes.vue'
import SearchSug from './compotents/SearchSug.vue'
import { getItemLIST, setItemLIST, removeItem } from '@/api'
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
      isShowSearchRes: false,
      results: '',
      resultsArr: getItemLIST() || []
    }
  },
  methods: {
    onSearch(val) {
      this.results = val
      this.isShowSearchRes = true
      if (val.trim() !== '' && this.resultsArr.indexOf(val) === -1) {
        this.resultsArr.unshift(val)
        setItemLIST(this.resultsArr)
      } else if (val.trim() !== '' && this.resultsArr.indexOf(val) !== -1) {
        const index = this.resultsArr.indexOf(val)
        this.resultsArr.splice(index, 1)
        this.resultsArr.unshift(val)
        setItemLIST(this.resultsArr)
      }
    },
    btnResults(a) {
      this.results = a
      // this.onSearch()
      this.isShowSearchRes = true
      this.keywords = this.results
      this.resultsArr.unshift(a)
      setItemLIST(this.resultsArr)
    },
    backToPage() {
      this.$router.go(-1)
    },
    visibleShowSearchSug() {
      this.isShowSearchRes = false
    },
    delItem(index) {
      this.resultsArr.splice(index, 1)
      setItemLIST(this.resultsArr)
    },
    delAll() {
      removeItem()
      this.resultsArr = getItemLIST() || []
    },
    btnSearch(val) {
      this.results = val
      this.isShowSearchRes = true
      this.keywords = this.results
      if (this.resultsArr.indexOf(val) === -1) {
        this.resultsArr.unshift(val)
        setItemLIST(this.resultsArr)
      } else {
        const index = this.resultsArr.indexOf(val)
        this.resultsArr.splice(index, 1)
        this.resultsArr.unshift(val)
        setItemLIST(this.resultsArr)
      }
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
