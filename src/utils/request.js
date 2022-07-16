import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
// 拦截器
// 请求拦截器
// 每次请求都会执行的函数
// 响应拦截器
// 每次请求响应回来都会执行的函数
request.interceptors.request.use(
  // 发送请求前做什么
  // config 本次请求的配置
  // 必须返回出去
  (config) => {
    const token = store.state.user.token
    if (token) {
      config.headers.Authorization = `Bearer ${token} `
    }
    return config
  },
  // 请求错误时处理的方法
  (err) => {
    return Promise.reject(err)
  }
)

export default request
