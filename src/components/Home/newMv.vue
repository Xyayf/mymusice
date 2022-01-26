<template>
  <div class="newMV">
<div class="title">
<van-icon name="wap-nav" />
最新MV
</div>
<div class="mvContaint">
<ul>
  <li v-for="(item,index) in NewMvList" :key="index" @click="onClick(item.id,item.cover)">
      <img :src="item.cover" alt="">
      <van-icon name="play" >{{item.playCount}}万</van-icon>
      <p>{{item.artistName}}</p>

  </li>
</ul>
</div>
  </div>
</template>
<script>

export default {
  name: 'NewMv',
  created () {
    this.getNewMv()
  },
  data () {
    return ({
      NewMvList: []
    })
  },
  methods: {
    async getNewMv () {
      const { data } = await this.axios.get('mv/first?limit=10')
      // .then(res => {
      //   console.log(res)
      //   const { data } = res
      // })
      if (data.code === 200) {
        this.NewMvList = data.data
      }
    },
    onClick (id, img) {
      this.$router.push({
        path: '/transition_detail',
        query: {
          id,
          img,
          r: 1080
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.title{
  text-align: left;
  color:red;
  font-weight: bold;
  margin-top:10px;

}
.mvContaint{
  overflow: hidden;
}
ul{
  width: 240vw;

  // flex-wrap: wrap;
  // align-items: center;
  // justify-content: center;
  padding-left:10px;
  overflow: hidden;

  li {
    float: left;
    box-sizing: border-box;
    width: 20%;
      padding: 10px;
      position: relative;
   .van-icon{
    position: absolute;
    top:14px;
    right: 17px;
    color:white;
   }
    p {
      text-align: left;
    }
    img{
      // display: block;
      //
      width: 100%;
      height: 100px;
    }

}
}

</style>
