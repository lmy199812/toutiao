import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/assets/iconfont/iconfont.css'
import showdown from 'showdown'
import hljs from 'highlight.js'
import './assets/github-markdown(1).css'
// 引入vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入flexible
import 'amfe-flexible/index.min.js'
import dayjs from 'dayjs'
console.log(dayjs().format('YYYY/MM/DD HH:mm:ss'))
Vue.use(Vant)
Vue.use(showdown)
Vue.use(hljs)
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
