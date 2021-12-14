<template>
  <div class="search">
    <div class="back"><van-icon name="arrow-left" @click="back" /></div>
    <div class="input">

        <van-icon name="search" />

      <input type="text" v-model="keywords" @input="onChange" ref="keydown">
      </div>
    <div class="song">
      <ul>
        <li v-for="(item,index) in searchList" :key='index' @click="toplay(item.id,item.artists[0].img1v1Url)">{{item.name}}</li>
      </ul>
    </div>

  </div>
</template>
<script>
export default {
  data () {
    return {
      keywords: '',
      searchList: [],
      timmer: null
    }
  },
  created () {
    this.getSearch('/search', {
      params: {
        keywords: this.$route.query.keyword
      }
    })
  },
  mounted () {
    const keydown = this.$refs.keydown
    keydown.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.getSearch('/search', {
          params: {
            keywords: this.keywords
          }
        })
      }
    })
  },
  methods: {
    async getSearch (url, params) {
      const { data: { result: { songs } } } = await this.axios.get(url, params)
      this.searchList = songs
      console.log(this.searchList)
    },
    back () {
      this.$router.go(-1)
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
    onChange (e) {
      clearTimeout(this.timmer)
      setTimeout(() => {
        this.getSearch('/search', {
          params: {
            keywords: this.keywords
          }
        })
      }, 1000)
    }

  }

}
</script>
<style lang="less" scoped>

.back{
  background-color: tomato;
}
.search{

 .input{
   margin-top: 10px;
   text-align: center;
   height: 40px;
   line-height: 40px;
   border: tomato 2px solid;

   input{
    width: 70%;
    height: 16px;
    line-height: 16px;
    padding-top: 8px;
    margin-left: 20px;
    border: 0;

  }
 }

}
.search/deep/ .van-icon{
  width: 28px;
  height: 28px;
  font-size: 28px;
//  padding-top: 1px;

  line-height: 40px;

}

</style>
