<template>
  <div class="footor">
<van-tabbar v-model="active" active-color="red" route>
  <van-tabbar-item icon="like-o" replace to='/home'>发现</van-tabbar-item>
  <van-tabbar-item icon="fire-o" to="/transition">视频</van-tabbar-item>
  <van-tabbar-item icon="user-o" to='/user'>我的</van-tabbar-item>
</van-tabbar>

  </div>
</template>
<script>
export default {
  name: 'Footer',
  data () {
    return {
      active: 0
    }
  }

}
</script>
<style lang="less" scoped>
.footer{
 position: absolute;
 bottom: 0;
 left: 0;
}
</style>
