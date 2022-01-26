/* eslint-disable no-cond-assign */
<template>
  <div class="index">
    <div class="part"
         v-if="id==1">
      <van-form @submit="onSubmit">
        <van-field v-model="username"
                   name="phone"
                   label="用户名"
                   placeholder="用户名" />
        <van-field v-model="password"
                   type="password"
                   name="password"
                   label="密码"
                   placeholder="密码" />
        <div style="margin: 16px;">
          <van-button round
                      block
                      type="info"
                      native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
    <div class="part"
         v-else>
      <van-form @submit="onSubmit">
        <van-field v-model="username"
                   name="username"
                   label="用户名"
                   placeholder="用户名" />
        <van-field v-model="code"
                   type="text"
                   name="code"
                   label="验证码"
                   placeholder="验证码" />
        <div style="margin: 16px;">
          <van-button round
                      block
                      type="info"
                      native-type="submit"
                      color='red'>登陆</van-button>
          <van-button native-type="button"
                      @click=onClick>发送验证码</van-button>
        </div>

      </van-form>

    </div>
  </div>

</template>
<script>
export default {
  name: 'Index',
  data () {
    return {
      id: this.$route.params.id,
      username: '',
      password: '',
      code: ''
    }
  },
  methods: {
    // async login (url, params) {
    //   // const that = this
    //   const res = await this.axios.post(url, params
    //   // {
    //   //   phone: that.username,
    //   //   password: that.password
    //   // }
    //   )
    //   console.log(res)
    // },
    onClick () {
      this.axios
        .get('captcha/sent?phone=13990822769')
    },

    onSubmit (values) {
      // eslint-disable-next-line eqeqeq
      if (this.id == 1) {
        if (!this.username) {
          this.$toast('手机号不能为空')
        } else if (!this.password) {
          this.$toast('请输入密码')
        } else {
          const that = this
          this.axios
            .post('login/cellphone', {
              phone: that.username,
              password: that.password

            })
            .then((res) => {
              if (res.data.code === 502) {
                this.$toast('密码输入错误')
                this.password = ''
              } else if (res.data.code === 200) {
                console.log(res.data.cookie)
                // document.cookie = 'cookie=' + res.data.cookie
                var obj = {
                  token: res.data.token,
                  id: res.data.account.id,
                  cookie: res.data.cookie

                }
                localStorage.setItem('userinfo', JSON.stringify(obj))

                console.log(document.cookie)
                this.$router.push({
                  path: '/home'
                })
              }
            })
        }
      } else {
        if (!this.username) {
          this.$toast('手机号不能为空')
        } else if (!this.code) {
          this.$toast('请输入验证码')
        } else {
          console.log(this.code)
          // const that = this
          this.axios
            .post('/captcha/verify', {
              phone: this.username,
              captcha: this.code
            })
            .then((res) => {
              console.log(res)
              if (res.data.code === 400) {
                this.$toast('验证码错误')
              } else if (res.data.code === 200) {
                this.$router.push({
                  path: '/home'
                })
              }
            })
        }
      }
    }

  }

}

</script>
<style scoped>
div .van-button--block {
  width: 200px;
  margin: 0 auto;
}
.part {
  height: 227px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.van-button--info {
  margin: 10px;
  background-color: red;
  border: 0
}
.van-form {
  width:100%
}
</style>
