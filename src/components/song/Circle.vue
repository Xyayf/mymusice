<template>
  <div class="circle">
     <canvas width="50px" height="50px" ref="canvas"></canvas>
    <p :class="['iconfont',  value?'icon-zanting1':'icon-bofang1']" @click="changplay"></p>
  </div>
</template>
<script>
export default {
  props: {
    value: Boolean,
    progress: Number
  },
  data () {
    return {
      ctx: {}
    }
  },
  mounted () {
    this.ctx = this.$refs.canvas.getContext('2d')
    this.draw(this.ctx)
  },
  methods: {
    changplay () {
      this.$emit('input', !this.value)
    },
    draw (ctx) {
      ctx.clearRect(0, 0, 50, 50)
      ctx.save()
      ctx.beginPath()
      ctx.lineWidth = 5
      ctx.arc(25, 25, 17.5, (Math.PI / 180 * -90), ((Math.PI * 2) + (Math.PI / 180 * -90)))
      ctx.strokeStyle = 'rgba(212,68,57,0.3)'
      ctx.stroke()
      ctx.beginPath()
      ctx.lineWidth = 5
      // console.log(this.progress)
      ctx.arc(25, 25, 17.5, (Math.PI / 180 * -90), ((Math.PI * 2 * this.progress) + (Math.PI / 180 * -90)))
      ctx.strokeStyle = 'rgba(212,68,57,1)'
      ctx.stroke()
      ctx.restore()
    }
  },
  watch: {
    progress () {
      this.draw(this.ctx)
    }
  }

}
</script>
<style lang="less" scoped>
.circle{
  width: 50px;
  height: 50px;
  position: relative;
  .iconfont{
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
  }
  canvas{
   position:absolute;
   top:0;
   left: 0;
  }
}
</style>
