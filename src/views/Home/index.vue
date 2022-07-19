<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button round> <van-icon name="search" />搜索 </van-button>
      </template>
    </van-nav-bar>
    <!-- tabs选项卡 -->
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <ArticleList :id="item.id"></ArticleList
      ></van-tab>
      <span class="toutiao tt-gengduo" @click="showPopup"></span>
    </van-tabs>
    <EditPopup
      ref="popup"
      :myChannels="myChannels"
      @del-mychanel="delMychannel"
      @change-active="changeActive"
      @add-mychannel="addMyChanel"
    ></EditPopup>
  </div>
</template>

<script>
import {
  getChannels,
  getMyChannelsByLocal,
  setMyChannelToLocal,
  delMychannel,
  addMyChanel
} from '@/api'
import ArticleList from './component/ArticleList.vue'
import EditPopup from './component/EditPopup.vue'
export default {
  data() {
    return {
      active: 0,
      myChannels: []
    }
  },
  components: {
    ArticleList,
    EditPopup
  },
  created() {
    this.getChannels()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  methods: {
    async getChannels() {
      try {
        // const { data } = await getChannels()
        // this.myChannels = data.data.channels
        if (!this.isLogin) {
          // 如果是离线
          // 本地有，直接用本地
          // 本地没有，发送请求获取默认
          const myChannels = getMyChannelsByLocal()
          if (myChannels) {
            this.myChannels = myChannels
          } else {
            const { data } = await getChannels()
            this.myChannels = data.data.channels
          }
        }
      } catch (error) {
        this.$toast.fail('请重新获取频道列表')
      }
    },
    showPopup() {
      this.$refs.popup.isShow = true
    },
    // 删除我的频道
    async delMychannel(id) {
      this.myChannels = this.myChannels.filter((item) => item.id !== id)
      // 如果是离线，存储本地
      if (!this.isLogin) {
        setMyChannelToLocal(this.myChannels)
      } else {
        // 如果是登录状态 发送接口 删除频道
        try {
          await delMychannel(id)
        } catch (error) {
          return this.$toast.fail('删除用户频道失败')
        }
      }
      this.$toast.success('删除用户频道成功')
    },
    changeActive(active) {
      this.active = active
    },
    // 添加我的频道
    async addMyChanel(channel) {
      this.myChannels.push(channel)
      // 如果是离线，存储本地
      if (!this.isLogin) {
        setMyChannelToLocal(this.myChannels)
      } else {
        // 如果是登录状态 发送接口 删除频道
        try {
          await addMyChanel(channel.id, this.myChannels.length)
        } catch (error) {
          return this.$toast.fail('添加频道失败')
        }
      }
      this.$toast.success('添加频道成功')
    }
  }
}
</script>

<style lang="less" scoped>
// 头部导航
.navbar {
  background-color: #3296fa;
  color: #fff;
  .van-button {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
  }
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }
  .van-button__text {
    color: #fff;
  }
  .van-icon-search {
    color: #fff;
  }
  .van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
//tabs选项卡
:deep(.van-tabs__wrap) {
  padding-right: 66px;

  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.tt-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;
  z-index: 99;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/gradient-gray-line.png');
  }
}
// 头部固定的样式
.navbar {
  position: sticky;
  top: 0;
  left: 0;
}
:deep(.van-tabs__wrap) {
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
}
.toutiao-gengduo {
  position: fixed;
  top: 92px;
}

:deep(.van-tabs__content) {
  max-height: calc(100vh - 92px - 82px - 100px);
  overflow: auto;
}
</style>
