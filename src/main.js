import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant, { Lazyload } from 'vant'
import 'vant/lib/index.css'
import axios from 'axios'
import VideoPlayer from 'vue-video-player'
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import '@/assets/font/font.css'
import Index from '@/assets/index.js'
// import 'videojs-contrib-hls' 如果需要解析mu3文件npm install videojs-contrib-hls --save
Vue.use(VideoPlayer)

Vue.use(Lazyload)
console.log(App)

Vue.prototype.axios = axios.create({
  baseURL: 'http://localhost:8888'
})
Vue.prototype.Index = Index
// console.log(Vant)
Vue.use(Vant)
Vue.config.productionTip = false
Vue.component('my-component-name', {
  // eslint-disable-next-line space-before-function-paren
  create () {
    console.log(this
    )
  }
})
// 路由守卫
router.beforeEach((to, from, next) => {
  // 获取本地存储中的用户信息
  // JSON.parse这里要转化成对象，存在就是真 true  不存在就是false
  var islogin = JSON.parse(localStorage.getItem('userinfo'))

  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (islogin) { // 判断本地是否存在userinfo
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    next()
  }
  /* 如果输入的路由为/login */
  if (to.fullPath === '/login') {
    /* 如果本地 存在 token 则直接跳转到后台首页 */
    if (islogin) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
})

new Vue({
  // eslint-disable-next-line space-before-function-paren

  router,
  store,
  render: h => h(App)
}).$mount('#app')
