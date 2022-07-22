<template>
  <div>
    <header>
      <van-nav-bar
        class="header"
        title="黑马头条"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <main>
      <!-- 文章名 -->
      <div class="main-title" style="font-size: 20px">{{ newsList.title }}</div>
      <!-- 用户信息 -->
      <div class="user-info" style="height: 45px">
        <div class="user-left" style="height: 35px; width: 35px">
          <img :src="newsList.aut_photo" alt="" />
        </div>
        <div class="user-name">
          <p>{{ newsList.aut_name }}</p>
          <p>{{ getDayJs }}</p>
        </div>
        <div class="user-right">
          <van-button
            round
            color="#3296fa"
            type="primary"
            style="height: 30px; margin-top: 8px"
            v-if="!newsList.is_followed"
            @click="addFollow"
            :loading="onloading"
          >
            <template #icon>
              <van-icon name="plus" class="right-name"></van-icon> </template
            >关注</van-button
          >
          <van-button
            round
            color="#3296fa"
            type="primary"
            style="height: 30px; margin-top: 8px"
            v-else
            @click="delFollow"
            :loading="onloading"
          >
            已关注</van-button
          >
        </div>
      </div>
      <!-- 内容 -->
      <article
        v-html="newsList.content"
        class="markdown-body"
        style="margin-top: 20px"
      ></article>
      <van-divider style="margin-bottom: 80px">正文结束</van-divider>
      <Comments></Comments>
    </main>
    <footer>
      <div class="foot-left">
        <van-cell is-link @click="showPopup" class="comments">写评论</van-cell>
        <van-popup
          class="popup"
          v-model="show"
          position="bottom"
          :style="{ height: '25%' }"
        >
          <van-field
            rows="2"
            autosize
            class="put-mes"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          ></van-field>
          <div class="send">发布</div>
        </van-popup>
      </div>
      <div class="foot-right">
        <span><van-icon name="chat-o" badge="0" /></span>
        <span
          ><van-icon
            name="star-o"
            color="#777"
            @click="addCollections"
            v-if="!newsList.is_collected" />
          <van-icon
            name="star"
            v-if="newsList.is_collected"
            color="#3296fa"
            @click="delCollections"
        /></span>
        <span><van-icon name="good-job-o" /></span
        ><span
          ><van-icon name="share" @click="showShare = true" />
          <van-share-sheet
            v-model="showShare"
            title="立即分享给好友"
            :options="options"
            @select="onSelect"
        /></span>
      </div>
    </footer>
  </div>
</template>

<script>
import { getNewsList } from '@/api'
import dayjs from 'dayjs'
import { addFollow, delFollow } from '@/api/user'
import { addCollections, delCollections } from '@/api/news'
import Comments from '@/views/Detail/compoent/Comments.vue'
export default {
  data() {
    return {
      newsList: {},
      show: false,
      isFollow: false,
      relativeTime: '',
      loading: false,
      onloading: false,
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  components: {
    Comments
  },
  created() {
    this.getNewsList()
  },
  methods: {
    // 返回
    onClickLeft() {
      this.$router.back()
    },
    // 展示弹窗
    showPopup() {
      this.show = true
    },
    // 获取文章信息
    async getNewsList() {
      try {
        const res = await getNewsList(this.$route.params.id)
        // console.log(res)
        this.newsList = res.data.data
        // console.log(this.newsList)
      } catch (error) {}
    },
    // 添加关注
    async addFollow() {
      this.onloading = true
      // const res = await addFollow(this.newsList.aut_id)
      // console.log(res)
      await addFollow(this.newsList.aut_id)
      this.getNewsList()
      this.onloading = false
    },
    // 删除关注
    async delFollow() {
      this.onloading = true
      await delFollow(this.newsList.aut_id)
      this.getNewsList()
      this.onloading = false
    },
    // 添加收藏
    async addCollections() {
      await addCollections(this.newsList.art_id)
      this.getNewsList()
      this.$toast.success('添加收藏成功')
    },
    // 删除收藏
    async delCollections() {
      await delCollections(this.newsList.art_id)
      this.getNewsList()
      this.$toast.fail('添加收藏失败')
    },
    // 分享
    onSelect(option) {
      this.$toast(option.name)
      this.showShare = false
    }
  },
  computed: {
    // 处理时间
    getDayJs() {
      const arr = this.newsList
      // console.log(arr)
      const time = dayjs(arr.pubdate)
      return `${time}`
    }
  }
}
</script>

<style scoped lang="less">
:deep(.header) {
  background-color: #3296fa;
  color: #fff;
  .van-nav-bar__arrow {
    color: #fff;
  }
  .van-nav-bar__title {
    color: #fff;
  }
}
:deep(main) {
  padding: 0 16px;
  background-color: #fff;
  .main-title {
    line-height: 100px;
    font-weight: 700;
    color: #3a3a3a;
  }
  .user-info {
    margin-top: 10px;
    width: 100%;
    display: flex;
    .user-left {
      width: 35px;
      height: 35px;
      margin-top: 10px;
      border: 1px solid #fff;
      border-radius: 100%;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .user-name {
      width: 65%;
      margin-left: 15px;
      font-size: 12px;
      color: #3a3a3a;
    }
  }
}
footer {
  width: 100%;
  height: 45px;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-sizing: border-box;
  height: 1.17333rem;
  border-top: 0.01333rem solid #d8d8d8;
  background-color: #fff;
  :deep(.comments) {
    width: 280px;
    height: 68px;
    line-height: 30px;
    border: 1px solid #eee;
    border-radius: 80px;
    .van-icon-arrow {
      display: none;
    }
  }
  :deep(.van-cell__value) {
    height: 68px;
    font-size: 32px;
    color: #999;
    text-align: center;
  }
  .foot-right {
    width: 400px;
    color: #999;
    display: flex;
    justify-content: space-around;
  }
  .popup {
    display: flex;
  }
  .put-mes {
    width: 560px;
    height: 280px;
    margin-top: 30px;
    margin-left: 20px;
    border: 1px solid #eee;
    background-color: #f5f7f9;
  }
  .send {
    width: 120px;
    height: 88px;
    margin-left: 50px;
    margin-top: 150px;
    font-size: 28px;
    color: #6ba3d8;
  }
}
</style>
