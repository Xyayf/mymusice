<template>
  <div class="login">
    <div class="logo">
    <div class="logopic"></div>
    </div>
      <router-link to="/index/1">
      <div class="phone ">手机登录</div>
      </router-link>
   <router-link to="/index/2">
   <div class="phone ">验证码登陆</div>
   </router-link>
  </div>
</template>

<script>
// @ is an alias to /src
// console.log(this)
// var q = 3
// console.log(q)
export default {
  name: 'Login'

}
</script>
<style scoped lang='less'>
@keyframes myfirst
{
  0%{
    transform: scale(1,1)
  }
   100%{
     transform: scale(1.1,1.1)
   }
}
@-webkit-keyframes myfirst /* Safari 与 Chrome */
{
      0%{
    transform: scale(1,1)
  }
   100%{
     transform: scale(1.5,1.5)
   }
}
.login{
width: 100%;
height: 100%;
background-image: linear-gradient(red,black);

.logo{
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  .logopic{
    width:100px;
    height: 100px;
    background:  url('/../../assets/img/wyy.png') center no-repeat;
    background-size: 100px 100px;
    animation:myfirst 2s infinite alternate;
    -webkit-animation:myfirst 2s infinite alternate;
  }

}
}
.phone{
    width: 300px;
    height: 30px;
    margin: 20px auto;
    color: red;
    font-size: 14px;
    text-align: center;
    line-height: 30px;
    background-color: white;
    border-radius: 15px 15px 15px 15px;

  }

</style>
