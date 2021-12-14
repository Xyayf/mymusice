<template>
  <div class="transition">
    <van-tabs v-model="active" swipe-threshold @click="onClick">
      <van-tab  v-for="(item,index) in titleList" :key="index" :title="item.name" :name='item.id'>
       <ul>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh(item.id,offset)">
            <van-list
              v-model="loading"
              finished-text="没有更多了"
              @load="onLoad(item.id,offset,1)"
            >

         <li class="imgcontaint" v-for="(item,index) in videoList" :key="index" @click="toDetail(item.data.vid,item.data.coverUrl)">
           <img :src="item.data.coverUrl" alt="">
           <p>{{item.data.title}}</p>
           <van-icon name="play" />
         </li>
          </van-list>
         </van-pull-refresh>
       </ul>
      </van-tab>
    </van-tabs>
    <Footer />
</div>

</template>
<script>
import Footer from '../components/Home/footer.vue'
export default {
  name: 'Transiton',
  data () {
    return {
      active: 1,
      titleList: [],
      videoList: [],
      uid: 0,
      offset: 0,
      refreshing: false,
      loading: false

    }
  },
  components: {

    Footer
  },
  created () {
    this.getTitleList()
  },
  // beforeUpdate () {
  //   console.log(this.uid)
  //   this.getVideoList(this.uid)
  // },

  methods: {
    async getTitleList () {
      const cookie = JSON.parse(localStorage.getItem('userinfo')).cookie
      // console.log(cookie)
      const { data: { data } } = await this.axios.get('/video/category/list?cookie' + cookie)
      this.titleList = data
      // console.log(data)
      this.uid = this.titleList[this.active - 1].id
      // console.log(this.uid)
    },
    async getVideoList (...params) {
      const id = params[0]
      const cookie = JSON.parse(localStorage.getItem('userinfo')).cookie
      if (params.length < 2) {
        const { data: { datas } } = await this.axios.get('/video/group?id=' + id + '&&cookie' + cookie)
        this.videoList = datas
      } else {
        const offset = params[1]
        const { data: { datas } } = await this.axios.get('/video/group?id=' + id + '&&offset' + offset + '&&cookie' + cookie)
        if (params[2]) {
          this.videoList = [...this.videoList, ...datas]
          return
        }
        this.videoList = [...datas, ...this.videoList]
      }
    },
    onClick (id) {
      this.offset = 0
      this.getVideoList(id)
    },
    onRefresh (id, offset) {
      this.getVideoList(id, offset)
      this.offset++
      this.refreshing = false
    },
    onLoad (id, offset, load) {
      // console.log(offset)
      this.getVideoList(id, offset, load)
      this.offset++
      this.loading = false
    },
    toDetail (id, img) {
      this.$router.push({
        path: '/transition_detail',
        query: {
          id,
          img
        }
      })
    }
  },
  computed: {}

}
</script>
<style lang="less" scoped>
.van-tabs__wrap--scrollable .van-tab {
      padding: 9px 38px;
}
.imgcontaint{
  position: relative;
  height: 28vh;
  padding: 10px 20px;

  img{
    width: 100%;
    height:100%
  }
  p{
  width: 80vw;;
  position: absolute;
  bottom:15px;
  left: 30px;
  color:#ccc;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  }
  .van-icon{
    position: absolute;
    left: 50%;
    top:50%;
    width: 89px;
    height: 89px;
    transform: translate(-50%,-50%);
    font-size: 89px;
    color:#ccc;
    opacity: 0.54;
  }
}
.van-tabs--line/deep/ .van-tabs__wrap {
 height:54px ;
  position: fixed !important;
  top:0;
  left: 0;
  // color: red !important;
  z-index: 1;

}
.van-tabs--line/deep/ .van-tabs__content{
    margin-top: 50px;

  }
</style>
