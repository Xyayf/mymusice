<template>
  <div class="Middaudio">
<!-- 底层 -->
  <div class="img">
    <img :src="currentsong.al.picUrl" alt="">
  </div>
  <div class="layer img">
  </div>
  <!-- 头部 -->
  <div class="top">
    <div class="left" @click="changfullscreen">
    <van-icon name="arrow-left" />
    </div>
    <van-tabs v-model="active" background='none' title-active-color='black' color='black' >
      <van-tab title="歌曲">
        <div class="imgs">
          <img :src="currentsong.al.picUrl" alt="">
        </div>
        <div class="midd">
        <div class="name">
          <h3>{{currentsong.name}}</h3>
          <p>{{currentsong.ar}}</p>
          </div>
          <div class="like">
         <van-icon name="like-o" />
        </div>

        </div>
        <div class="progress">

        </div>
        <div class="option">
          <div class="playmode">
            <i :class="['iconfont',playmodeclass]" @click="changemode"></i>
          </div>
          <div class="last" @click="changcurrenindex(-1)">
            <i class="iconfont  icon-shangyishoushangyige"></i>
          </div>
          <div class="play">
            <i :class="['iconfont',  playing?'icon-zanting1':'icon-bofang1']" @click="changplay"></i>
          </div>
          <div class="next" @click="changcurrenindex(1)">
            <i class="iconfont  icon-shangyishoushangyige1"></i>
          </div>
        </div>

      </van-tab>
      <van-tab title="歌词">
   <div class="lyric">
    <ul id="ulyric">
      <li v-for="(item,index) in ulyric" :key="index" :class="[currentIndex==index ?
      'red' : ''] " @click="changlocathin(index)">
        <p>{{item.lyric4}}</p>
      </li>
    </ul>
  </div>
  </van-tab>
    <Bar :progress="progress"
           @changprogress='changprogress'
          :currentime="currentime"
          :duration="duration"
          @fangdou='fangdou'></Bar>
    </van-tabs>

  </div>
  </div>
</template>
<script>
import Bar from '@/components/song/Bar.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    Bar
  },
  props: {
    progress: Number,
    value: Boolean,
    currentime: Number,
    duration: Number,
    ulyric: Array

  },
  data () {
    return {
      active: 0,
      currentIndex: 0

    }
  },
  created () {
    console.log(this.ulyric)
  },
  computed: {
    ...mapGetters({
      currentsong: 'play/currentsong'
    }),
    ...mapState({
      playing: state => state.play.playing,
      mode: state => state.play.mode
    }),
    // eslint-disable-next-line vue/return-in-computed-property
    playmodeclass () {
      switch (this.mode) {
        case 0 :return 'icon-shunxubofang'
        case 1: return 'icon-icon_luyinbofang_suijibofang'
        case 2: return 'icon-icon_danqubofang'
      }
    }
  },
  methods: {
    changfullscreen () {
      this.$store.commit({
        type: 'play/changfullscreenaction'
      })
    },
    changprogress (progress, action) {
      this.$emit('changprogress', progress, action)
    },
    changplay () {
      this.$emit('input', !this.value)
    },
    fangdou () {
      this.$emit('fangdou')
    },
    changemode () {
      this.$store.commit({
        type: 'play/changemode'
      })
    },
    changcurrenindex (code) {
      this.$store.commit({
        type: 'play/changcurrenindex',
        code
      })
    },
    changlocathin (index) {
      this.$emit('changlocathin', index)
    }

  },
  watch: {
    // immediate: true,
    currentime (newName) {
      // console.log(newName)
      if (document.getElementById('ulyric') === null) {
        return
      }
      this.$nextTick(() => {
        const timeDiplay = Math.floor(this.currentime)
        this.ulyric.forEach((item, index) => {
          if (timeDiplay === item.times) {
            document.getElementById('ulyric').style.transform = 'translateY(' + (-index * 30) + 'px)'
            this.currentIndex = index

          // console.log(index)
          }
        })
      })
    }
  }

}
</script>
<style lang="less" scoped>
.Middaudio{
  position: fixed;
  top:0;
  left: 0;
  background-color: blanchedalmond;
  width: 100vw;
  height: 100vh;
  z-index: 1000;

  // z-index: 10;
  .img{
    position: absolute;
    top:0;
    left: 0;
    width: 100%;
    height: 100%;
    filter: blur(14px);
    z-index:-1;

    img{
    width: 100%;
    height: 100%;
    opacity: 0.5;
    }
  }
  .layer{
    background-color: #aaa;
    opacity: 0.3;
    filter: blur(20px);

  }
  .top{
    height: 70px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .left{
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;

    }
    .van-tabs--line{
      width: 100px;
      height: 40px;
      margin-left: 90px;

    }

  }
}
.top/deep/ .van-tabs__content{
        width: 300px;
        margin-left: -95px;
        .imgs{
          width: 300px;
          height: 300px;

          border-radius: 10px;
          overflow: hidden;
          img{
            width: 100%;
          }

        }
        .midd{
          margin-top: 10px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .option{
          display: flex;
          height: 50px;
          justify-content: center;
          align-items: center;
          .last
          ,.play,
          .next{
            margin-left: 20px;
          }
        }
}
 .lyric{
    margin: 30px;
    height: 310px;
    overflow: hidden;
    ul{
      height: 200vh;
      transition: all 1s linear;
      // transform: translateY(-173px);
      li{
        height: 20px;
        padding: 5px;
        transition: all 0.5s linear;
      }
    }
  }
  .red{
  color:red;
    }
</style>
