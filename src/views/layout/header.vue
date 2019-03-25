<template>
  <el-row :gutter="20">
    <el-col :span="4">
      <img src="./logo.png" alt="黑马程序员">
    </el-col>
    <el-col :span="16" class="el-dian">
      <h1>电商管理系统</h1>
    </el-col>
    <el-col :span="4" class="el-dian">
      <a href="#/login">退出</a>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {}
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
