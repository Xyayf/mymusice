<template>
  <div class="newMusic">
    <van-icon name="descending" >
      最新音乐
    </van-icon>
    <div class="list" style="margin-bottom: 30px">
      <ul >
        <li class="first-child" v-for="(item,index) in newMusicList" :key="index" @click="toPlaymusic(item.id,item.picUrl)">
          <img :src="item.picUrl" alt="">
        <p>{{item.name}}</p>
        </li>
      </ul>
    </div>
    <h4>hhhhhhhhh</h4>
  </div>
</template>
<script>
export default {
  name: 'NewMusic',
  data () {
    return {
      newMusicList: []
    }
  },
  created () {
    this.getnewMusic()
  },

  methods: {
    async getnewMusic () {
      try {
        const { data } = await this.axios.get('/personalized/newsong')
        if (data.code === 200) {
          this.newMusicList = data.result
        }
      } catch {
        console.log('errro')
      }
    },
    async toPlaymusic (id, img) {
      const { data } = await this.axios.get('/check/music?id=' + id)
      if (!data.success) {
        return this.$toast('暂无版权')
      }
      // console.log(data)
      this.$router.push({
        path: '/playmusic',
        query: {
          id,
          img

        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.newMusic{
  text-align: left;
  color: red;
  margin-left: 10px;

}
ul{
  // display: flex;

  li{
      border-top: 1px solid #ccc;
    img{
      display: inline-block;
      width:25px;
      height: 25px;
      padding: 10px;
      vertical-align:top;

    }
    p{
      display:inline-block;
      width: 100vw-25px;
      height: 25px;
      padding: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

    }

  }

}
</style>
