<template>
  <div>
    <el-row>
      <el-col :span="24">
        <el-cascader
          :options="options"
          expand-trigger="hover"
          @change="handleChange"
          v-model="selectedOptions3">
        </el-cascader>
      </el-col>
    </el-row>

    <!-- 卡片式tab样式 -->
    <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <el-row>
          <el-col :span="24">
            <el-button type="success" plain size="mini">添加参数名称</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="静态参数" name="second">配置管理</el-tab-pane>
    </el-tabs>

    <!-- 展开表格 -->
     <el-table
      stripe
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="expand"
        width="50">
        <el-table-column type="expand">
          <template slot-scope="props">

          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        label="商品参数"
        prop="attr_name">
      </el-table-column>
      <el-table-column
        label="操作">
      </el-table-column>
    </el-table>
    <!-- /展开表格 -->
  </div>
</template>

<script>
import { getCategories } from '@/api/categories'

export default {
  name: 'categories',
  data () {
    return {
      options: [],
      selectedOptions3: [],
      activeName2: 'first',
      tableData: []
    }
  },
  created () {

  },
  methods: {
    // 刷新数据列表 (有问题，没有传参数)
    async loadingList () {
      const { meta, data } = await getCategories()
      if (meta.status === 200) {
        console.log(data)
      }
    },

    handleChange () {},

    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.el-tabs {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
