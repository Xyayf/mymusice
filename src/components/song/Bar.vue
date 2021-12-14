<template>
  <div class="Bar">
    <div class="text">{{currentime|time}}</div>
    <div class="bar" id='bar'>
      <span class="botten" id="botten"></span>
    </div>
   <div class="text">{{duration|time}}</div>
  </div>
</template>
<script>
export default {
  props: {
    progress: Number,
    currentime: Number,
    duration: Number

  },
  filters: {
    time (value) {
      let m = Math.floor(value / 60)
      let s = Math.floor(value % 60)
      m = m > 9 ? m : '0' + m
      s = s > 9 ? s : '0' + s
      return m + ':' + s
    }
  },
  mounted () {
    this.botten = document.getElementById('botten')
    this.bar = document.getElementById('bar')
    this.botten.addEventListener('touchstart', (e) => {
      this.fangdou()
      // this.changprogress(this.progress)
      const x = this.progress * this.bar.offsetWidth
      const startX = e.changedTouches[0].clientX
      let moveX
      const move = (e) => {
        moveX = e.changedTouches[0].clientX - startX + x
        if (moveX < 0) {
          moveX = 0
        }
        if (moveX > this.bar.offsetWidth) { moveX = this.bar.offsetWidth - this.botten.offsetWidth }
        this.botten.style.transform = 'translateX(' + moveX + 'px)'
        this.bar.style.backgroundImage = 'linear-gradient(to right, red ' + moveX / this.bar.offsetWidth * 100 + '%, yellow ' + moveX / this.bar.offsetWidth * 100 + '%)'
        const progress = moveX / this.bar.offsetWidth
        this.changprogress(progress, true)
      }
      const end = () => {
        const progress = moveX / this.bar.offsetWidth
        this.changprogress(progress, false)
        this.botten.removeEventListener('touchmove', move)
        this.botten.removeEventListener('touchend', end)
      }
      this.botten.addEventListener('touchmove', move)
      this.botten.addEventListener('touchend', end)
    })
    this.bar.addEventListener('click', e => {
      console.log(this.bar.offsetLeft)
      const moveX = e.clientX + this.bar.offsetLeft - 19
      const progress = moveX / this.bar.offsetWidth
      this.changprogress(progress)
      this.botten.style.transform = 'translateX(' + moveX + 'px)'
      this.bar.style.backgroundImage = 'linear-gradient(to right, red ' + moveX / this.bar.offsetWidth * 100 + '%, yellow ' + moveX / this.bar.offsetWidth * 100 + '%)'
    })
  },
  watch: {
    progress () {
      this.botten.style.transform = 'translateX(' + this.progress * this.bar.offsetWidth + 'px)'
      this.bar.style.backgroundImage = 'linear-gradient(to right, red ' + this.progress * this.bar.offsetWidth / this.bar.offsetWidth * 100 + '%, yellow ' + this.progress * this.bar.offsetWidth / this.bar.offsetWidth * 100 + '%)'
    }
  },
  methods: {
    changprogress (progress, action) {
      this.$emit('changprogress', progress, action)
    },
    fangdou () {
      this.$emit('fangdou')
    }
  }
}
</script>
<style lang="less" scoped>
.Bar{
  height: 20px;
  display: flex;
  align-items: center;
  justify-self:center;
  .text{
    font-size: 12px;
    width: 31px;

  }
  .bar{
  width: 100%;
  height: 4px;
  margin: 0 5px;
  border: #ccc 1px solid;
  border-radius: 2px;
  .botten{
    position: relative;
    display: block;
    margin-top: -3px;
    width: 5px;
    height: 5px;
    border-radius: 50%;
    border: white 3px solid;
    background-color: tomato;
    &::before{
      position: absolute;
      content:'';
      top:-10px;
      left: -10px;
      right: -10px;
      bottom: -10px;
    }
  }
  }
}
</style>
