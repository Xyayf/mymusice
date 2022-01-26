
export default {
  namespaced: true,
  state: {
    // 是否全屏播放
    fullScreen: false,
    // 播放状态
    playing: false,
    // 当前播放列表，
    playlist: [],
    // 顺序播放列表
    sequencelist: [],
    // 播放模式
    mode: 0,
    // 当前播放歌曲索引
    currenindex: -1

  },
  getters: {
    // 当前播放的歌曲

    currentsong (store) {
      if (store.currenindex < 0 || store.currenindex > store.playing.lenght) {
        return {}
      } else {
        return store.playlist[store.currenindex]
      }
    }
  },
  mutations: {
    //  歌单点击后的处理函数
    // eslint-disable-next-line space-before-function-paren
    getindexlist (store, indexlist) {
      // JSON.parse(JSON.stringify(indexlist.songList))
      store.sequencelist = [...indexlist.songList]// 对象是引用所以要再拷贝一份
      store.currenindex = indexlist.index
      switch (store.mode) {
        case 0:
          store.playlist = store.sequencelist
          console.log(store.sequencelist)
          break
        case 1:
          var newArr = []
          for (var i = store.sequencelist.length + 1; i > 0;) {
            i--
            var rdm = Math.floor(Math.random() * store.sequencelist.length)

            if (!newArr.includes(store.sequencelist[rdm])) {
              newArr.push(store.sequencelist[rdm])
            } else {
              if (newArr.length === store.sequencelist.length) {
                break
              }
              i++
            }
          }
          store.playlist = newArr
          console.log(newArr)
          break
        default:
          store.playlist = store.sequencelist
      }
      // store.playing = true
      // console.log(store)
    },
    // 改变播放模式
    // eslint-disable-next-line space-before-function-paren
    changemode (store) {
      var changlistbeforeid = store.playlist[store.currenindex].id
      console.log(changlistbeforeid)
      store.mode = (store.mode + 1) % 3
      // 根据播放模式改变播放列表
      switch (store.mode) {
        case 0:
          store.playlist = store.sequencelist
          console.log(store.sequencelist)
          break
        case 1:
          var newArr = []
          for (var i = store.sequencelist.length + 1; i > 0;) {
            i--
            var rdm = Math.floor(Math.random() * store.sequencelist.length)

            if (!newArr.includes(store.sequencelist[rdm])) {
              newArr.push(store.sequencelist[rdm])
            } else {
              if (newArr.length === store.sequencelist.length) {
                break
              }
              i++
            }
          }
          store.playlist = newArr
          console.log(newArr)
          break
        default:
          store.playlist = store.sequencelist
      }
      // 播放模式改变后改变当前播放索引值为改变前的歌曲应该在的位置
      store.currenindex = store.playlist.findIndex((item) => {
        return item.id === changlistbeforeid
      })
    },
    // eslint-disable-next-line space-before-function-paren
    changplayaction (store, changplay) {
      store.playing = changplay.playing
    },
    // eslint-disable-next-line space-before-function-paren
    changcurrenindex (store, code) {
      if (store.currenindex + code.code < 0) {
        store.currenindex = 0
        return
      } else if (store.currenindex + code.code > store.sequencelist.length - 1) {
        store.currenindex = store.playlist.length - 1
        return
      }
      console.log(store.sequencelist.length)
      store.currenindex += code.code
      console.log(store.currenindex)
    },
    // eslint-disable-next-line space-before-function-paren
    changfullscreenaction (store) {
      store.fullScreen = !store.fullScreen
    }

  },
  action: {

  }
}
