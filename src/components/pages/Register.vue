<template>
  <div>
    <van-nav-bar
      title="用户注册"
      left-text="返回"
      left-arrow
      @click-left="goBack">
    </van-nav-bar>
    <div class="register-panel">
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
      <div class="register-button">
        <van-button type="primary" size="large" @click="registerAction" :loading="openLoading">马上注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import url from '@/serviceAPI.config.js'
export default {
  name: 'Register',
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
    registerAction () {
      // 使用&&代替if写法
      this.checkForm() && this.registerSubmit()
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
    registerSubmit () {
      this.openLoading = true
      axios({
        url: url.registerUser,
        method: 'post',
        data: {
          userName: this.userName,
          password: this.password
        }
      })
      .then(response => {
        console.log(response)
        if (response.data.code === 200) {
          this.$toast.success(response.data.message)
          this.$router.push('/')
        } else {
          this.$toast.fail(response.data.message)
          this.openLoading=false
        }
        console.log(response.data.code)
      })
      .catch(error => {
        this.$toast.fail('注册失败')
        this.openLoading=false
      })
    }
  }
}
</script>
<style lang="less" scoped>
  .register-panel{
    width:96%;
    border-radius: 5px;
    margin:20px auto;
    padding-bottom:50px;
  }
  .register-button{
    padding-top:10px;
  }
</style>