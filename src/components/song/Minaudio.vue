<template>
  <div class="Minaudio" >
    <!-- 图片 -->
 <div :class="['img',playing?'playing':'playing puase']" @click="changfullscreen">
   <img :src="currentsong.al.picUrl" alt="">
 </div>
 <!-- 歌名 -->
 <div class="title">
   <h3 class="name">{{currentsong.name}}</h3>
   <p>{{currentsong.ar}}</p>
 </div>
 <!-- 播放控件 -->
 <div class="play">
   <!-- <i :class="['iconfont',playing?'icon-zanting1':'icon-bofang1']" ></i> -->
<!-- <Circles v-model="currentsong.playing" ></Circles> -->
<Circles :value='playing' @input="changplaying" :progress='progress'></Circles>
 </div>

 <div class="liebiao">
   <i class="iconfont icon-liebiao"></i>
 </div>
  </div>
</template>
<script>

import Circles from '@/components/song/Circle.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  components: {
    Circles
  },
  props: {
    progress: Number
  },
  computed: {
    ...mapGetters({
      currentsong: 'play/currentsong'
    }),
    ...mapState({
      playing: state => state.play.playing
    })
  },
  methods: {
    changplaying (value) {
      this.$store.commit({
        type: 'play/changplayaction',
        playing: value
      })
    },
    changfullscreen () {
      this.$store.commit({
        type: 'play/changfullscreenaction'
      })
    }
  }

}
</script>
<style lang="less" scoped>
.Minaudio{
  position:fixed;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  height:50px;
  width: 100%;
  background-color: blanchedalmond;
.img{
  width: 40px;
  height: 40px;
  margin-left: 32px;
  overflow: hidden;
  border-radius: 50%;

  img{
    width: 40px;
  height: 40px;

  }

  }
  .title{
    margin-left: 56px;
    // font-size: 12px;
    h3{
      font-size: 12px;
    }
    p{
      width: 100px;
      font-size: 10px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
.play ,.liebiao{
  margin-left: 30px;
}
}
.playing{
  animation: rotation 10s linear infinite;
  -webkit-animation: rotation 10s linear infinite;
}
.puase{
  animation-play-state:paused;
}
.iconfont{
  font-size: 35px;
}
@keyframes rotation {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
@-webkit-keyframes rotation{

  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
</style>
