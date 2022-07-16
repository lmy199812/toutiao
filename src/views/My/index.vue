<template>
  <div class="my-container">
    <header>
      <div class="user-info header" v-if="isLogin">
        <van-row></van-row>
        <van-row class="row-2"
          ><van-col span="12"
            ><van-row type="flex" align="center" justify="space-around">
              <van-image
                round
                width="1.76rem"
                height="1.76rem"
                :src="userInfo.photo"
              ></van-image>
              <span class="mobile">{{ userInfo.name }}</span>
            </van-row></van-col
          >
          <van-col span="11">
            <van-row class="code-row" type="flex" align="center" justify="end">
              <van-button class="code-btn" size="mini" round
                >编辑资料</van-button
              ></van-row
            >
          </van-col></van-row
        >
        <van-row>
          <van-grid class="grid" :border="false">
            <van-grid-item text="头条">
              <template #icon> {{ userInfo.art_count }} </template>
            </van-grid-item>
            <van-grid-item text="粉丝">
              <template #icon> {{ userInfo.fans_count }} </template>
            </van-grid-item>
            <van-grid-item text="关注">
              <template #icon>{{ userInfo.follow_count }} </template>
            </van-grid-item>
            <van-grid-item text="获赞">
              <template #icon>{{ userInfo.like_count }} </template>
            </van-grid-item>
          </van-grid>
        </van-row>
      </div>
      <div class="header not-login" v-else>
        <div class="login-btn" @click="$router.push('/login')">
          <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
          <span class="text">登录/注册</span>
        </div>
      </div>
    </header>
    <main>
      <van-grid column-num="2" class="grid" clickable>
        <van-grid-item text="收藏"
          ><template #icon> <span class="toutiao tt-shoucang"></span> </template
        ></van-grid-item>
        <van-grid-item text="历史"
          ><template #icon> <span class="toutiao tt-lishi"></span> </template
        ></van-grid-item>
      </van-grid>
      <div class="link">
        <van-cell title="消息通知" is-link />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <van-button v-if="isLogin" block class="login-btn" @click="logout"
      >退出</van-button
    >
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    isLogin() {
      return !!this.$store.state.user.token
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号'
        })
        .then(() => {
          this.$store.commit('setUser', {})
        })
        .catch(() => {})
    },
    async getUserInfo() {
      if (this.isLogin) {
        try {
          const {
            data: { data }
          } = await getUserInfo()
          this.userInfo = data
        } catch (err) {
          this.$toast.fail('请重新登录')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  background-color: #f5f7f9;
  height: calc(100vh - 100px);
  .header {
    height: 361px;
    background: url('~@/assets/banner.png') no-repeat;
    background-size: cover;
  }
  .user-info {
    display: flex;
    flex-direction: column;
    > .van-row {
      flex: 1;
    }
    .row-2 {
      .van-col {
        height: 100%;
      }
    }
    .mobile {
      font-size: 0.4rem;
      color: #fff;
    }
    .code-btn {
      width: 1.53333rem;
      height: 0.42667rem;
      background: #fff;
      border-radius: 0.21333rem;
      font-size: 0.26667rem;
      color: #666;
      padding: 0;
    }

    .code-row {
      height: 100%;
    }
    .grid {
      :deep(.van-grid-item__content) {
        background-color: unset;
      }
    }
    .van-grid-item {
      color: #fff;
      :deep(.van-grid-item__text) {
        color: #fff;
      }
    }
  }
  // 主体区域
  main {
    .grid {
      color: #646566;
      // 字体图标
      .toutiao {
        font-size: 0.6rem;

        &.tt-lishi {
          color: #ffb31d;
        }
        &.tt-shoucang {
          color: #ed5253;
        }
      }
    }
    .link {
      margin: 10px 0;
    }
  }
  .login-btn {
    :deep(.van-button__text) {
      color: red;
    }
  }

  .not-login {
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
}
</style>
