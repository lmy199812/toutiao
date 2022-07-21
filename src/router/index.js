import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/views/Login'
Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login')
  },
  {
    path: '/',
    name: 'layout',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        name: 'home',
        component: () => import('@/views/Home')
      }, {
        path: '/qa',
        name: 'qa',
        component: () => import('@/views/Qa')
      }, {
        path: '/video',
        name: 'video',
        component: () => import('@/views/Video')
      }, {
        path: '/my',
        name: 'my',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/Search')
  },
  {
    path: '/news/:id',
    name: 'news',
    component: () => import('@/views/News')
  }
]

const router = new VueRouter({
  routes
})

export default router
