<template>
  <div class="layout-app">
    <el-container class="el-container">
      <!-- 头部 -->
      <el-header class="el-header">
        <AppHeader></AppHeader>
      </el-header>

      <el-container class="el-container">
        <!-- 侧边栏 -->
        <el-aside width="200px" class="el-aside">
          <MavMenu></MavMenu>
        </el-aside>
        <!-- 中间内容 -->
        <el-main class="el-main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AppHeader from './header'
import MavMenu from './navmenu'

export default {
  name: 'layout',
  data () {
    return {}
  },
  methods: {

  },
  components: {
    AppHeader,
    MavMenu
  }
}
</script>

<style scoped>
.layout-app {
  height: 100%;
}

.el-container {
  height: 100%;
}

.el-header {
  background-color: #b3c0d1;
}

.el-aside {
  height: 100%;
  background-color: #545c64;
}

.el-main {
  background-color: #e9eef3;
}
</style>
