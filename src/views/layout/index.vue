<template>
  <div class="layout-app">
    <el-container class="abc">
      <!-- 头部 -->
      <el-header class="el-header">
        <AppHeader></AppHeader>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside width="200px" class="el-aside">
          <MavMenu @menu-select="handleMenuSelect"></MavMenu>
        </el-aside>
        <!-- 中间内容 -->
        <el-main class="el-main">
          <el-card class="box-card">
            <!-- 面包屑 -->
            <div slot="header" class="clearfix">
              <span>
                <el-breadcrumb separator=">>">
                  <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                  <el-breadcrumb-item v-for="(item, index) in breadNames" :key="index">{{ item }}</el-breadcrumb-item>
                </el-breadcrumb>
              </span>
            </div>
            <!--结束 面包屑 -->
            <router-view></router-view>
          </el-card>
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
    return {
      breadNames: []
    }
  },
  methods: {
    handleMenuSelect (names) {
      // console.log(names)
      this.breadNames = names
    }
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

.abc {
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

.box-card {
  width: 100%;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}
</style>
