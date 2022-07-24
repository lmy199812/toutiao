<template>
  <div>
    <div class="body" v-for="item in commentList" :key="item.com_id">
      <!-- 左侧图片  -->
      <div class="box-left">
        <div class="box-img">
          <img :src="item.aut_photo" style="width: 100%" alt="" />
        </div>
      </div>
      <div class="box-right">
        <!-- 用户 -->
        <div class="box-top">
          <div class="top-left">{{ item.aut_name }}</div>
          <div class="top-right">
            <van-icon
              name="good-job-o"
              color="#777"
              @click="onLike(item.com_id)"
              v-if="newsList.attitude !== 1 && newsList.attitude !== 0"
              >赞{{ item.like_count }}</van-icon
            ><van-icon
              name="good-job"
              color="#3296fa"
              @click="onLike(item.com_id)"
              v-else
              >已点赞{{ item.like_count }}</van-icon
            >
          </div>
        </div>
        <div class="box-middle">{{ item.content }}</div>
        <div class="box-foot">
          <div class="box-time">{{ dayjs(item) }}</div>
          <van-cell is-link @click="showPopup">回复0</van-cell>
          <van-popup
            v-model="show"
            closeable
            close-icon-position="top-left"
            position="bottom"
            :style="{ height: '100%' }"
          >
            <van-nav-bar title="暂无回复" />
            <div class="body" style="margin-top: 40px; padding: 0 10px">
              <div class="box-left">
                <div class="box-img">
                  <img :src="item.aut_photo" style="width: 100%" alt="" />
                </div>
              </div>
              <div class="box-right">
                <!-- 用户 -->
                <div class="box-top">
                  <div class="top-left">{{ item.aut_name }}</div>
                  <div class="top-right">
                    <van-icon
                      name="good-job-o"
                      color="#777"
                      @click="onLike(item.com_id)"
                      v-if="newsList.attitude !== 1 && newsList.attitude !== 0"
                      >赞{{ item.like_count }}</van-icon
                    ><van-icon
                      name="good-job"
                      color="#3296fa"
                      @click="onLike(item.com_id)"
                      v-else
                      >已点赞{{ item.like_count }}</van-icon
                    >
                  </div>
                </div>
                <div class="box-middle">{{ item.content }}</div>
                <div class="box-foot">
                  <div class="box-time">{{ dayjs(item) }}</div>
                  <van-cell is-link @click="showPopup">回复</van-cell>
                </div>
              </div>
            </div>
            <div style="font-size: 14px; margin: 20px 20px 0">全部回复</div>
            <p>没有更多了</p>
            <div class="foot">
              <van-cell is-link @click="showPopup1" class="comments"
                ><span
                  style="
                    font-size: 0.37333rem;
                    color: #000;
                    margin: 38px 120px 0;
                  "
                  >评论</span
                ></van-cell
              >
              <van-popup
                class="popup"
                v-model="show1"
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
          </van-popup>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from '@/utils/day'
import { addComLike, delComLike } from '@/api/comments'
export default {
  data() {
    return {
      show: false,
      show1: false,
      show2: false
    }
  },
  props: {
    commentList: {
      type: Array,
      require: true
    },
    newsList: {
      type: Object,
      require: true
    }
  },
  methods: {
    showPopup() {
      this.show = true
    },
    showPopup1() {
      this.show1 = true
    },
    // 添加点赞
    async onLike(id) {
      try {
        if (this.newsList.attitude !== 1) {
          await addComLike(id)
          console.log(this.newsList)
          console.log(11111)
          // this.newsList.attitude = 1
          this.$toast.success('点赞成功')
        } else if (
          this.newsList.attitude === 1 ||
          this.newsList.attitude === 0
        ) {
          await delComLike(id)
          // this.newsList.attitude = -1
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

    dayjs(item) {
      const time = dayjs(item.pubdate).fromNow()
      return `${time}`
    }
  }
}
</script>

<style lang="less" scoped>
.body {
  width: 94%;
  display: flex;
  border-bottom: 1px solid #eee;
}
.box-left {
  margin-top: 20px;
  width: 140px;
  height: 240px;
}
.box-img {
  width: 60%;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
}
.box-right {
  width: 80%;
  height: 240px;
}
.box-top {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
.top-left {
  font-size: 26px;
  color: #406599;
}
.top-right {
  font-size: 26px;
  color: #000;
}
.box-middle {
  height: 36px;
  line-height: 36px;
  margin: 40px 0;
  font-size: 32px;
  color: #222;
}
.box-foot {
  display: flex;
  height: 48px;
  line-height: 48px;
}
.box-time {
  width: 120px;
  height: 36px;
  font-size: 24px;
  color: #222;
}
:deep(.van-cell--clickable) {
  margin-left: 20px;
  height: 46px;
  width: 134px;
  line-height: 28px;
  border-radius: 23px;
  border: 1px solid #f5f6f7;
  overflow: upset;
}
.van-cell__value--alone {
  margin-top: -28px;
  width: 134px;
  height: 44px;
  font-size: 24px;
  color: #222;
  line-height: 60px;
  z-index: 20;
}
.van-cell__right-icon {
  display: none;
}
p {
  font-size: 28px;
  color: #969799;
  line-height: 1.33333rem;
  border-top: 1px solid #eee;
  text-align: center;
  margin-bottom: 80px;
}
.foot {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  background-color: #ff69b4;
  line-height: 90px;
}

.comments {
  width: 640px;
  height: 72px;
  margin-top: 10px;
  margin-left: 50px;
  border: 1px solid #eee;
  border-radius: 36px;
  background-color: #fff;
  text-align: center;
  .van-icon-arrow {
    display: none;
  }
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
</style>
