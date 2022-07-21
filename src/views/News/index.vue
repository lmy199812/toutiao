<template>
  <div>
    <header>
      <van-nav-bar
        class="header"
        title="标题"
        left-arrow
        @click-left="onClickLeft"
      />
    </header>
    <main>
      <div class="main-title">dsagsdgadgh</div>
      <div class="user-info" style="height: 45px">
        <div class="user-left" style="height: 35px; width: 35px">
          <img src="../../assets/mobile.png" alt="" />
        </div>
        <div class="user-name">
          <p>黑马程序员</p>
          <p>三年前</p>
        </div>
        <div class="user-right">
          <van-button round color="#3296fa" type="primary">
            <template #icon>
              <van-icon name="plus" />
            </template>
            关注</van-button
          >
        </div>
      </div>
    </main>
    <footer>asddfasg</footer>
  </div>
</template>

<script>
import { getNewsList } from '@/api'
export default {
  data() {
    return {
      newsList: []
    }
  },
  created() {
    this.getNewsList()
  },
  methods: {
    onClickLeft() {
      this.$router.back()
    },
    async getNewsList() {
      try {
        const res = getNewsList(this.id)
        console.log(res)
      } catch (error) {}
    }
  },
  computed: {}
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
    font-size: 24px;
  }
}
:deep(main) {
  padding: 0 16px;
  background-color: #fff;
  .main-title {
    height: 78px;
    line-height: 78px;
    font-weight: 700;
    color: #3a3a3a;
    background-color: #3296fa;
  }
  .user-info {
    margin-top: 10px;
    width: 100%;
    display: flex;
    .user-left {
      width: 35px;
      height: 35px;
      border: 1px solid red;
      border-radius: 100%;
      img {
        width: 100%;
      }
    }
    .user-name {
      width: 150px;
      margin-left: 15px;
      font-size: 12px;
      color: #3a3a3a;
    }
    .user-right {
      width: 85px;
      margin-right: 10px;
    }
  }
}
footer {
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
}
</style>
