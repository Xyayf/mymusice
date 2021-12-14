<template>
  <div class="Playmusic" >
    <van-icon name="arrow-left" @click="goBack" />
    <!-- 背景 -->
    <div class="background">
    <img id=background :src="$route.query.img" alt="">
    </div>
    <!-- 蒙层 -->
  <div class="background layer"></div>
  <!-- 头部 -->
  <div class="top">
    <img class='img Rotation puase' id="img" :src="$route.query.img" alt="">
  </div>
  <div class="lyric">
    <ul id="ulyric">
      <li v-for="(item,index) in ulyric" :key="index" :class="[currentIndex==index ?
      'red' : ''] ">
        <p>{{item.lyric4}}</p>
      </li>
    </ul>
  </div>
<!-- 音频 -->
<div class="audio">
  <audio
  :src="musicurl"
  controls
  id="song"
  />
</div>
<!-- 进度条 -->
<div class="jingdutiao">
  <div class="tiao"></div>
</div>
  </div>
</template>
<script>
export default {
  name: 'Playmusic',
  data () {
    return {
      ulyric: [],
      musicurl: '',
      timeDiplay: 0,
      currentIndex: 0
    }
  },
  methods: {
    async getLyric () {
      const { data: { lrc: { lyric } } } = await this.axios.get('/lyric?id=' + this.$route.query.id)
      const lyric1 = lyric.split('\n')
      const lyric2 = lyric1.map(item => {
        // console.log(this)
        const lyric3 = item.split(']')
        const lyric4 = lyric3.pop()
        let times = 0
        lyric3.forEach(item => {
          const time = item.substr(1, item.length - 1).split(':')
          times = time[0] * 60 + Math.floor(time[1])
        })
        return {
          times,
          lyric4
        }
      })
      this.ulyric = lyric2
      // console.log(this.ulyric)
    },
    async getmusicurl () {
      const { data: { data } } = await this.axios.get('/song/url?id=' + this.$route.query.id)
      this.musicurl = data[0].url
    },
    goBack () {
      this.$router.go(-1)
    }

  },
  created () {
    this.getLyric()
    this.getmusicurl()
  },
  watch: {
    // immediate: true,
    timeDiplay (newName) {
      // console.log(newName)
      this.ulyric.forEach((item, index) => {
        if (this.timeDiplay === item.times) {
          document.getElementById('ulyric').style.marginTop =
            -index * 32 + 'px'
          this.currentIndex = index
          console.log(index)
        }
      })
    }
  },
  mounted () {
    const that = this
    const song = document.getElementById('song')
    song.addEventListener('timeupdate', function () {
      // console.log(this.currentTime)
      const timeDiplay = Math.floor(this.currentTime)
      that.timeDiplay = timeDiplay
      // console.log(this.timeDiplay)
    })
    song.addEventListener('play', function () {
      // document.getElementById('img').classList.add('Rotation')
      document.getElementById('img').classList.toggle('puase')
    })
    song.addEventListener('pause', function () {
      document.getElementById('img').classList.add('puase')
    })
  }

}
</script>
<style lang="less" scoped>
.background{
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: -1;
  &.layer{
    background-color: #aaa;
    opacity: 0.3;
    filter: blur(20px);
  }

}

.Playmusic{
  height: 100%;
  width:100%;
  position: relative;
  text-align: center;
  // z-index: 1000;
  #background{
    // display: block;
    width:100%;
    height: 100%;
    filter: blur(20px);
  }
  .img{
    width: 150px;
    height: 150px;
    border-radius: 50%;
    margin-top: 54px;
  }
  .audio{
    position: absolute;
    bottom: 0;
    left: 50%;
    margin-left: -300/2px;
  }
  .lyric{
    margin: 30px;
    height: 310px;
    overflow: hidden;
    ul{
      height: 200vh;
      transition: all 2s linear;
      // transform: translateY(-173px);
      li{
        padding: 5px;
        transition: all 0.5s linear;
      }
    }
  }

}
@keyframes rotation
{
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
}
@-webkit-keyframes rotation /* Safari 与 Chrome */
{
  from{
    transform: rotate(0deg)
  }
  to{
    transform: rotate(360deg)
  }
}
.Rotation{
  animation: rotation 10s linear infinite ;
  -webkit-animation:rotation 10s linear infinite ; ;

}
.puase{
  animation-play-state:paused;
}
.red{
  color:red;
}
.van-icon{
  // text-align: left;
  // left: 0;
  position:absolute;
  left: 21px;
  top:22px;
}
</style>
