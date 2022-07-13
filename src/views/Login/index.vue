<template>
  <div>
    <van-nav-bar title="标题" />
    <van-form @submit="onSubmit">
      <van-field v-model="username" name="手机号" placeholder="请输入手机号" />
      <van-field
        v-model="password"
        type="password"
        name="验证码"
        placeholder="请输入验证码"
        ><van-button size="small" type="primary"
          >发送验证码</van-button
        ></van-field
      >
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        name: ''
      }
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    }
  }
}
</script>

<style></style>
