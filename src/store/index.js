import Vue from 'vue'
import Vuex from 'vuex'
import play from '@/store/modules/play.js'

Vue.use(Vuex)// 把方法绑定到this上了

export default new Vuex.Store({

  modules: {
    play
  }
})
