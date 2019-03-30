<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo el-menu"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    :router="true">
    <el-submenu :index="first.id + ''" v-for="first in menus" :key="first.id">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span>{{ first.authName }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item :index="`/${second.path}`" v-for="second in first.children" :key="second.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{ second.authName }}</span>
          </template>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { getRightsMenu } from '@/api/rights'

export default {
  name: 'MavMenu',
  data () {
    return {
      menus: []
    }
  },
  created () {
    this.loadRightsMenu()
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    async loadRightsMenu () {
      const { meta, data } = await getRightsMenu()
      // console.log(data)
      if (meta.status === 200) {
        this.menus = data
      }
    }
  }
}
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>
