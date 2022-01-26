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
const copon = Vue.component('my-component-name', {
  // eslint-disable-next-line space-before-function-paren
  create() {
    console.log(this
    )
  }
})
console.log(copon)
console.log(router)
router.beforeEach((to, from, next) => {
  var isLogin = localStorage.getItem('userinfo')
  if (isLogin) {
    next()
  } else {
    next({
      path: '/login'
    })
  }

  if (to.fullPath === '/login') {
    /* 如果本地 存在 token 则直接跳转到后台首页 */
    if (isLogin) {
      next({
        path: '/home'
      })
    } else {
      next()
    }
  }
})
console.log(router)

console.log(new Vue({
  // eslint-disable-next-line space-before-function-paren

  router,
  store,
  render: h => h(App)
}).$mount('#app'))
