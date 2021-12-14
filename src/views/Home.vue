<template>
  <div class="home">
    <van-sticky :offset-top="0">
   <van-search
  v-model="value"
  show-action
  :placeholder="key"
  @search="onSearch"
  @input="onInput"
  @clear='onClear'

>
  <template #action>
    <div class="search" @click="onSearch(value)">搜索</div>
  </template>
</van-search>

</van-sticky>

<van-swipe :autoplay="3000">
  <van-swipe-item v-for="(item, index) in banners" :key="index">
    <a :href="item.url">
    <img v-lazy="item.imageUrl" />
    </a>
  </van-swipe-item>
</van-swipe>
<div class="song" v-if="display">
      <ul>
        <li v-for="(item,index) in searchList" :key='index' @click="toplay(item.id,item.artists[0].img1v1Url)">{{item.name}}</li>
      </ul>
    </div>

  <div class="hot ">
    <ul ref="tochend">
      <li>
        <a href="">
          <img src="http://pay.91yunshi.com/share/html/userTextImg/home1.png" alt="mei">
        <p>每日推荐</p>
        </a>
        </li>
        <li>
        <a href="">
          <img src="http://pay.91yunshi.com/share/html/userTextImg/home1.png" alt="mei">
        <p>每日推荐</p>
        </a>
        </li>
        <li>
        <a href="">
          <img src="http://pay.91yunshi.com/share/html/userTextImg/home1.png" alt="mei">
        <p>每日推荐</p>
        </a>
        </li>
        <li>
        <a href="">
          <img src="http://pay.91yunshi.com/share/html/userTextImg/home1.png" alt="mei">
        <p>每日推荐</p>
        </a>
        </li>
    </ul>
  </div>
<NewMV />
<NewMusic />
<Footer />
  </div>
</template>

<script>
// @ is an alias to /src
// import { Toast } from 'vant'
import NewMV from '../components/Home/newMv.vue'
import NewMusic from '../components/Home/newMusic.vue'
import Footer from '../components/Home/footer.vue'
export default {
  name: 'Home',
  components: {
    NewMV,
    // eslint-disable-next-line vue/no-unused-components
    NewMusic,
    Footer
  },
  created () {
    this.getbanners()
    // console.log(1)
    this.getkey()
  },
  mounted () {
    // const tochend = this.$refs.tochend
    // tochend.addEventListener('touchend', function (e) {
    //   // console.log(moveX)
    //   // if (Math.abs(e.moveX) > 50) {
    //   //   if (moveX > 0) {
    //   //     tochend.style.transform = 'tanslateX(375px)'
    //   //   }
    //   // }
    // })
  },
  data () {
    return {
      value: '',
      banners: [],
      key: '',
      searchList: [],
      timmer: null,
      display: false
    }
  },
  methods: {
    onSearch (val) {
      let keyword
      if (!val) {
        keyword = this.key
      } else {
        keyword = this.value
      }
      // if(this,this.value){}
      this.$router.push({
        path: '/search',
        query: {
          keyword
        }
      })
    },

    async getbanners () {
      // console.log(2)
      const { data } = await this.axios.get('banner')// await 下面全是异步执行
      // console.log(data)
      if (data.code === 200) {
        this.banners = data.banners
        // console.log(this.banners)
      }
      // console.log(3)
    },
    async getkey () {
      const { data } = await this.axios.get('search/default')
      // console.log(data)
      if (data.code === 200) {
        // console.log(1)
        this.key = data.data.showKeyword
        // console.log(this.key)
      }
    },
    async getSearch (url, params) {
      const { data: { result: { songs } } } = await this.axios.get(url, params)
      this.searchList = songs
      // console.log(this.searchList)
    },
    // onFocus () {
    //   this.value = this.key
    // }
    onInput (e) {
      this.display = true
      // console.log(e)
      clearTimeout(this.timmer)
      this.timmer = setTimeout(() => {
        this.getSearch('/search', {
          params: {
            keywords: e
          }
        })
      }, 1000)
    },
    toplay (id, img) {
      this.$router.push({
        path: '/playmusic',
        query: {
          id,
          img

        }
      })
    },
    onClear () {
      // console.log('clear')
      this.display = false
    }
  }
}
</script>
<style lang="less" scoped>
.search{
  color:#ccc
}
.home .hot a{
  display:inline-block ;

  img{
    display: inline-block;
    width: 25px;
    height: 25px;

  }
  p{
    font-size: 12px;
  }
}

.hot {
  position: relative;
  overflow: hidden;

  ul{
  display: flex;
  border-bottom: 1px solid #ccc;
  // padding: 10px;

  li{
  flex: 1;
  border-right: 1px solid #ccc;

  }

}
}
img{
  width: 100vw;
  height: 100%;
}
.van-swipe{
  width: 100%;
  height: 145px;
}

</style>
