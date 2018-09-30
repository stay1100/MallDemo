<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack">
    </van-nav-bar>
    <div class="login-panel">
      <van-field
        v-model="userName"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        @click-icon="userName=''"
        :error-message="usernameErrorMsg"
        required />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :error-message="passwordErrorMsg"
        required />
      <div class="login-button">
        <van-button type="primary" size="large" @click="loginAction" :loading="openLoading">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
export default {
  name: 'Login',
  data () {
    return {
      userName: '',
      password: '',
      openLoading: false,
      usernameErrorMsg:'',
      passwordErrorMsg:''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    loginAction () {
      // 使用&&代替if写法
      this.checkForm() && this.loginSubmit()
    },
    checkForm () {
      let isOK = true
      if (this.userName.length < 5) {
        this.usernameErrorMsg = "用户名不能小于5位"
        isOK = false
      } else {
        // 避免重复提示
        this.usernameErrorMsg = ""
      }
      if (this.password.length < 6) {
        this.passwordErrorMsg = "密码不能小于6位"
        isOK = false
      } else {
        // 避免重复提示
        this.passwordErrorMsg = ""
      }
      return isOK
    },
    loginSubmit () {
      this.openLoading = true
      axios({
        url: url.loginUser,
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password
        }
      })
      .then(response => {
        // response.data.message返回为true则表示用户名密码均正确
        if (response.data.code === 200 && response.data.message) {
          new Promise((resolve, reject) => {
            // 保存登录状态
            localStorage.userInfo = {userName: this.userName}
            setTimeout(resolve,500)
          })
          .then(() => {
            this.$toast.success('登录成功')
            this.$router.push('/')
          })
          .catch(error => {
            this.$toast.fail("登录状态保存失败")
            console.log(error)
          })
          
        } else {
          this.$toast.fail('登录失败')
          this.openLoading=false
        }
        console.log(response)
      })
      .catch(error => {
        console.log(error)
        this.$toast.fail('登录失败')
        this.openLoading=false
      })
    }
  },
  created () {
    // 根据保存的登录状态，判断是否已经登录
    if (localStorage.userInfo) {
      this.$toast.success('您已经登录')
      this.$router.push('/')
    }
  }
}
</script>
<style lang="less" scoped>
  .login-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .login-button{
    padding-top:10px;
  }
</style>