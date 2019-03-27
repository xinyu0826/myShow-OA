<template>
  <div class="app-login">
    <div class="login-container">
      <el-form label-position="left" label-width="80px" :model="loginForm" :rules="loginFormRules" ref="loginFormEl">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn" type="primary" @click.enter="onSubmit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api'
import { setItem } from '@/utils/auth'

export default {
  name: 'login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async onSubmit () {
      this.$refs['loginFormEl'].validate((valid) => {
        if (valid) {
          this.login()
        } else {
          return false
        }
      })
    },

    async login () {
      const { meta, data } = await login(this.loginForm)
      if (meta.status === 200) {
        this.$message({
          message: '登陆成功',
          type: 'success'
        })
        // 将登陆成功的账号和密码存储到本地中，用以其他地方使用
        // window.localStorage.setItem('token', data.token)
        setItem(data.token)
        this.$router.replace('/')
      } else {
        this.$message.error(`登录失败：${meta.msg}`)
      }
    }
  }
}
</script>

<style scoped>
  .app-login {
    height: 100%;
    background-color: #2f4050;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .login-container {
    width: 500px;
    height: 200px;
    padding: 50px;
    background-color: #fff;
    border-radius: 10px;
  }
  .login-btn {
    width: 100%;
  }
</style>
