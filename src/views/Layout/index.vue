<template>
  <div class="layout-container">
    <van-tabbar route class="layout-tabbar">
      <van-tabbar-item to="/ ">
        <i slot="icon" class="toutiao tt-shouji"> </i>
        <span class="text">首页</span></van-tabbar-item
      >
      <van-tabbar-item to="/qa"
        ><i slot="icon" class="toutiao tt-wenda"> </i>
        <span class="text">问答</span></van-tabbar-item
      >
      <van-tabbar-item to="/video"
        ><i slot="icon" class="toutiao tt-shipin"> </i>
        <span class="text">视频</span></van-tabbar-item
      >
      <van-tabbar-item to="/my"
        ><i slot="icon" class="toutiao tt-wode"> </i>
        <span class="text">{{$store.state.user.token?'我的':'未登录'}}</span></van-tabbar-item
      >
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    i.toutiao {
      font-size: 40px;
    }
  }
}
</style>
