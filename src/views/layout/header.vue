<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <img src="./logo.png" alt="黑马程序员">
    </el-col>
    <el-col :span="16" class="el-dian">
      <h1>电商管理系统</h1>
    </el-col>
    <el-col :span="4" class="el-dian">
      <el-button type="primary" @click="hadleLogout">退出</el-button>
    </el-col>
  </el-row>
</template>

<script>
import { removeItem } from '@/utils/auth'

export default {
  name: 'AppHeader',
  data () {
    return {}
  },
  methods: {
    hadleLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 清空登陆状态 token
        // window.localStorage.removeItem('token')
        removeItem()
        // 跳转到登陆页，push()方法是可以返回上一页的，replace()则不能，所有用replace
        this.$router.replace('/login')
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style scoped>
.el-dian {
  text-align: center;
}

.el-dian a {
  line-height: 60px;
  text-decoration: none;
}
</style>
