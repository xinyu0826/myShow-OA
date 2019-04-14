<template>
  <el-menu
    :default-active="$route.path"
    class="el-menu-vertical-demo el-menu"
    @open="handleOpen"
    @close="handleClose"
    @select="handleMenuSelect"
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
  async created () {
    await this.loadRightsMenu()

    // 路径来自于路由路径  默认一上来就手动的 select 一下
    this.handleMenuSelect(this.$route.path)
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
      console.log(data)
      if (meta.status === 200) {
        this.menus = data
      }
    },

    handleMenuSelect (index) {
      const secondPath = index.substr(1)
      // 根据二级路径找到一级
      this.menus.forEach(first => {
        // find 会遍历数据，将符合 second.path === secondPath 条件的元素返回
        const second = first.children.find(second => {
          return second.path === secondPath
        })
        if (second) { // 如果找到 second
          // console.log(first.authName, second.authName)
          this.$emit('menu-select', [first.authName, second.authName])
        }
      })
    }
  }
}
</script>

<style scoped>
.el-menu {
  height: 100%;
}
</style>
