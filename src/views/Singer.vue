<template>
  <div :class="['singer' ,currenindex?'haspadding':'',fullScreen?'overflow':'']">
    <ul class="list_containt">
      <li v-for="(item,index) in songList" :key="index" class='list' @click="giveindexlist(index)">
        <p class="index">{{index+1}}</p>
        <div class="context">
          <h3 class="name">{{item.name}}</h3>
          <p class="songer">
            <span>{{item.ar}}</span>
            <span>-</span>
            <span>{{item.al.name}}</span>
            </p>
        </div>
      </li>
    </ul>
    <div v-if="currenindex">
<Audio ></Audio>
</div>
</div>
</template>
<script>
import Audio from '@/components/song/Audio.vue'
import { mapState } from 'vuex'
export default {
  name: 'Singer',
  components: {
    Audio
  },
  data () {
    return {
      songList: []

    }
  },
  created () {
    this.getSongList()
  },
  methods: {
    async getSongList () {
      try {
        var { data } = await this.axios.get('/artists?id=6452')
      } catch (error) {
        console.log(error)
      }
      this.songList = data.hotSongs.map(item => ({
        id: item.id,
        name: item.name,
        ar: item.ar.map(item => (item.name)).join('/'),
        al: {
          name: item.al.name,
          picUrl: item.al.picUrl
        }
      }))
      // console.log(this.songList)
    },
    giveindexlist (index) {
      this.$store.commit({
        type: 'play/getindexlist',
        index,
        songList: this.songList

        // playing: true
      })
    }

  },
  computed: {
    ...mapState({
      playing: state => state.play.playing,
      currenindex: state => state.play.currenindex >= 0,
      fullScreen: state => state.play.fullScreen
    })
  }

}
</script>
<style lang="less" scoped>
.singer{

  overflow: hidden;
}
.list{
  width: 100%;
  height: 50px;
  display: flex;

  border-bottom: 1px solid black;
  .index{
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  }

  .context{
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    .songer{
      width: 300px;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
.haspadding{
  padding-bottom: 50px;
}
.overflow{
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
