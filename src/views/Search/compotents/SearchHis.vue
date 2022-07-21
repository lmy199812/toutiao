<template>
  <div>
    <van-cell title="搜索历史">
      <van-icon
        name="delete-o"
        style="font-size: 15px"
        @click="show = true"
        v-if="!show"
      />
      <van-button v-if="show" @click="delAll">全部删除</van-button>
      <van-button v-if="show" @click="show = false">完成</van-button>
    </van-cell>
    <div>
      <van-cell
        v-for="(item, index) in resultsArr"
        :key="index"
        @click="btnSearch(item)"
      >
        <template #title>
          <span>{{ item }}</span>
        </template>
        <van-icon name="cross" v-show="show" @click.stop="delItem(index)" />
      </van-cell>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      history: []
    }
  },
  props: {
    resultsArr: {
      type: Array,
      required: true
    }
  },
  methods: {
    delItem(index) {
      this.$emit('delItem', index)
    },
    delAll() {
      this.$emit('delAll')
    },
    btnSearch(ele) {
      this.$emit('btnSearch', ele)
    }
  }
}
</script>

<style lang="less" scoped>
.van-button {
  border: unset;
  height: 10px;
  color: #969799;
}
.van-icon {
  font-size: 25px;
}
</style>
