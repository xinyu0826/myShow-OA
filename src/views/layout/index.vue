<template>
  <div class="layout-app">
    <el-container class="el-container">
      <!-- 头部 -->
      <el-header class="el-header">
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
      </el-header>

      <el-container class="el-container">
        <!-- 侧边栏 -->
        <el-aside width="200px" class="el-aside">
          <el-menu
            default-active="2"
            class="el-menu-vertical-demo el-menu"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>用户管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>权限管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="2-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>角色列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="2-2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>商品管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="3-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="3-2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>分类参数</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
              <el-menu-item-group>
                <el-menu-item index="3-3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品分类</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>订单管理</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="4-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单列表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>数据统计</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="5-1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据报表</span>
                  </template>
                </el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <!-- 中间内容 -->
        <el-main class="el-main">
          <!-- Layout 的 children 子路由会展示到这里 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {}
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
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

 .el-dian {
   text-align: center;
 }

 .el-dian a {
   line-height: 60px;
   text-decoration: none;
 }

 .el-aside {
   height: 100%;
   background-color: #545c64;
 }

 .el-menu {
   height: 100%;
 }

 .el-main {
   background-color: #e9eef3;
 }
</style>
