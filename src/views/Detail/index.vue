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
      <div class="user-info">
        <div class="user-left" style="margin-top: 12px">
          <img :src="newsList.aut_photo" alt="" />
        </div>
        <div class="user-name" style="width: 240px; margin-top: 10px">
          <div class="boxx" style="color: #3a3a3a">{{ newsList.aut_name }}</div>
          <div class="boxx" style="color:margin-top: -10px">{{ getDayJs }}</div>
        </div>
        <!-- 关注 -->
        <div class="user-right" style="margin-top: 8px">
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
            color="#fff"
            type="primary"
            style="height: 30px; margin-top: 8px"
            v-else
            @click="delFollow"
            :loading="onloading"
          >
            <span style="color: #323233">已关注</span></van-button
          >
        </div>
      </div>
      <!-- 内容 -->
      <article
        v-html="newsList.content"
        class="markdown-body"
        style="margin-top: 50px"
      ></article>
      <van-divider style="margin-top: 60px">正文结束</van-divider>
      <!-- 评论组件 -->
      <Comments :commentList="commentList" :newsList="newsList"></Comments>
      <div class="more" style="margin-top: 50px">没有更多了</div>
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
            v-model="message"
            class="put-mes"
            type="textarea"
            maxlength="50"
            placeholder="请输入留言"
            show-word-limit
          ></van-field>
          <div class="send" @click="sendComments">发布</div>
        </van-popup>
      </div>
      <div class="foot-right">
        <span><van-icon name="chat-o" :badge="commentList.length" /></span>
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
        <span
          ><van-icon
            name="good-job-o"
            color="#777"
            @click="onLike(id)"
            v-if="
              newsList.attitude !== 1 && newsList.attitude !== 0
            " /><van-icon
            name="good-job"
            color="#3296fa"
            @click="onLike(id)"
            v-else /></span
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
import dayjs from '@/utils/day'
import { addFollow, delFollow } from '@/api/user'
import { addCollections, delCollections, addLike, delLike } from '@/api/news'
import Comments from '@/views/Detail/compoent/Comments.vue'
import { getComments, sendComments } from '@/api/comments'
export default {
  data() {
    return {
      newsList: {}, // 文章详情列表
      show: false,
      isFollow: false,
      loading: false,
      onloading: false,
      finished: false,
      showShare: false,
      commentList: [], // 评论列表
      message: '',
      id: this.$route.params.id,
      dayjs,
      obj: '', // 发布评论空对象
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
    this.getComments()
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
        console.log(this.newsList)
      } catch (error) {}
    },
    // 添加关注
    async addFollow() {
      this.onloading = true
      // const res = await addFollow(this.newsList.aut_id)
      // console.log(res)
      await addFollow(this.newsList.aut_id)
      this.getNewsList()
      this.$toast.success('关注成功')
      this.onloading = false
    },
    // 删除关注
    async delFollow() {
      this.onloading = true
      await delFollow(this.newsList.aut_id)
      this.getNewsList()
      this.$toast.fail('取消关注成功')
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
      this.$toast.fail('取消收藏成功')
    },
    // 添加点赞
    async onLike(id) {
      try {
        if (this.newsList.attitude !== 1) {
          await addLike(id)
          this.newsList.attitude = 1
          this.$toast.success('点赞成功')
        } else if (
          this.newsList.attitude === 1 ||
          this.newsList.attitude === 0
        ) {
          await delLike(id)
          this.newsList.attitude = -1
          this.$toast.success('取消点赞')
        }
      } catch (error) {
        console.log(error)
        const status = error.response.status
        const err = new Error(error.response.data.message)
        if (status === 400) {
          throw err
        } else if (status === 401) {
          throw err
        } else if (status === 404) {
          throw err
        } else if (status === 507) {
          throw err
        } else {
          this.$toast.fail('操作失败')
        }
      }
    },

    // 获取评论
    async getComments() {
      this.loading = true
      try {
        const res = await getComments('a', this.id)
        // console.log(res)
        this.commentList = res.data.data.results
        this.loading = false
        this.finished = true
      } catch (error) {
        this.loading = false
        this.finished = true
      }
    },
    // 发布评论
    async sendComments() {
      try {
        if (this.message.trim() === '') {
          this.$toast.fail('输入内容不能为空')
        } else {
          const res = await sendComments(this.id, this.message)
          this.obj = res.data.data.new_obj
          this.count++
          this.message = ''
          this.show = false
          this.getComments()
        }
      } catch (error) {
        const status = error.response.status
        const err = new Error(error.response.data.message)
        if (status === 400) {
          throw err
        } else if (status === 401) {
          throw err
        } else if (status === 507) {
          throw err
        } else {
          this.$toast.fail('请刷新试试')
        }
      }
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
      const time = dayjs(arr.pubdate).fromNow()
      return `${time}`
    }
  }
}
</script>

<style scoped lang="less">
@import '@/assets/github-markdown\(1\).css';
:deep(.header) {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
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
  margin-top: 80px;
  padding: 0 16px;
  background-color: #fff;
  .main-title {
    font-weight: 700;
    color: rgb(2, 2, 2);
    font-size: 0.53333rem;
    padding-top: 40px;
  }
  .user-info {
    width: 100%;
    height: 84px;
    margin-top: 80px;
    display: flex;
    // background-color: #3296fa;
  }
  .user-left {
    width: 70px;
    height: 70px;
    border: 1px solid #fff;
    border-radius: 100%;
    overflow: hidden;
    img {
      width: 100%;
    }
    .user-name {
      margin-left: 25px;
      font-size: 12px;
      color: #3a3a3a;
    }
  }
  .boxx {
    height: 42px;
    font-size: 24px;
    color: #969799;
    margin-left: 10px;
  }
  .more {
    font-size: 28px;
    color: #969799;
    line-height: 1.33333rem;
    border-top: 1px solid #eee;
    text-align: center;
    margin-bottom: 80px;
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
    height: 56px;
    line-height: 56px;
    border: 1px solid #eee;
    border-radius: 80px;
    background-color: #fff;
    .van-icon-arrow {
      display: none;
    }
  }
  .van-cell__value {
    margin-top: -18px;
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
