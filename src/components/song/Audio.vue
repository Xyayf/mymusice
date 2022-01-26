<template>
  <div class="audio">
    <MiddAudio :progress="progress"
               v-if="fullScreen"
               @changprogress='changprogress'
               :value='playing'
               @input="changplaying"
               :currentime="currentime"
               :duration="duration"
               @fangdou='fangdou'
               :ulyric='ulyric'
               @changlocathin='changlocathin'>
    </MiddAudio>
    <MinAudio :progress="progress"
              v-if="!fullScreen">
    </MinAudio>
    <audio :src="musicurl"
           id='audio'></audio>

  </div>

</template>
<script>
import MinAudio from '@/components/song/Minaudio.vue'
import MiddAudio from '@/components/song/Middaudio.vue'
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'Audio',
  components: {
    MinAudio,
    MiddAudio
  },
  data () {
    return {
      musicurl: '',
      currentime: 0,
      duration: 0,
      ulyric: []
    }
  },
  created () {
    this.getmusicurl(this.id)
    this.getLyric(this.id)
  },
  mounted () {
    this.audio = document.getElementById('audio')
    this.audio.addEventListener('canplay', () => {
      this.duration = this.audio.duration

      if (!this.playing) {
        this.audio.pause()
      } else { this.audio.play() }

      // this.$store.commit({
      //   type: 'play/changplayaction',
      //   playing: true
      // })
      // console.log('加载wanbi')
    })
    this.audio.addEventListener('timeupdate', this.timeupdate)// this.audio.currenTime 改变触发
    this.audio.addEventListener('ended', () => {
      this.Index.changcurrenindex(this, 1)
    })
  },
  methods: {
    async getmusicurl (id) {
      try {
        const { data: { data } } = await this.axios.get('/song/url?id=' + id)
        // if (this.data[0].url === null) {
        //   console.log('weikomg')
        //   this.$store.commit({
        //     type: 'play/changcurrenindex',
        //     code: 1
        // })
        // }
        this.musicurl = data[0].url
        // console.log(this.musicurl)
      } catch (erro) {
        console.log(erro)
      }
    },
    async getLyric (id) {
      const { data: { lrc: { lyric } } } = await this.axios.get('/lyric?id=' + id)
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
    timeupdate () {
      this.currentime = this.audio.currentTime
      console.log('ontimeupdata')
      // console.log(this.audio.currentTime)
      // console.log(this.progress)
    },
    changplaying (value) {
      this.$store.commit({
        type: 'play/changplayaction',
        playing: value
      })
    },
    fangdou () {
      this.audio.removeEventListener('timeupdate', this.timeupdate)
    },
    changprogress (progress, action) {
      this.currentime = progress * this.duration
      // console.log(action)
      if (action) { return }
      this.audio.currentTime = this.currentime

      this.audio.addEventListener('timeupdate', this.timeupdate)
      // console.log(1)
    },
    changlocathin (index) {
      this.audio.currentTime = this.ulyric[index].times
    }

  },
  computed: {
    ...mapGetters({
      currentsong: 'play/currentsong'
    }),
    ...mapState({
      playing: state => state.play.playing,
      currenindex: state => state.play.currenindex,
      fullScreen: state => state.play.fullScreen

    }),

    id () {
      return this.currentsong.id
    },
    progress () {
      return this.duration ? Math.floor(this.currentime / this.duration * 1000) / 1000 : 0
    }

  },
  watch: {
    playing (newval) {
      if (newval === true) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    id (newval) {
      // console.log(newval)
      this.audio.load()
      this.getmusicurl(newval)
      this.getLyric(newval)

      this.audio.load()
      // this.$store.commit({
      //   type: 'play/changplayaction',
      //   playing: false
      // })

      // this.audio.pause()
    }
  }

}
</script>
