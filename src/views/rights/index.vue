<!--
  权限列表
 -->
<template>
  <el-row>
    <!-- 表格 -->
    <el-table
      :data="tableData"
      stripe
      border
      style="width: 40%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="authName"
        label="权限名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="path"
        label="路径">
      </el-table-column>
      <el-table-column
        label="层级">
        <template slot-scope="scope">
          {{ ['一级', '二级', '三级'][scope.row.level] }}
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->
  </el-row>
</template>

<script>
import { getRightsList } from '@/api/rights'

export default {
  name: 'rightsList',
  data () {
    return {
      tableData: []
    }
  },
  // 生命周期
  created () {
    this.rightsLoading()
  },
  methods: {
    // 获取列表数据
    async rightsLoading () {
      const { meta, data } = await getRightsList('list')
      if (meta.status === 200) {
        // console.log(data)
        this.tableData = data
      }
    }
  }
}
</script>

<style scoped>

</style>
