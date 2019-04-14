<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-input placeholder="请输入内容" class="input-with-select" v-model="searchText" @keyup.enter.native="loadingOrders(1)">
          <el-button slot="append" icon="el-icon-search" @click.prevent="loadingOrders(1)"></el-button>
        </el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="primary">主要按钮</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="tableData"
      border
      v-loading="tableLoading"
      style="width: 100%">
      <el-table-column
        :index="indexMethod"
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="280">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="order_id"
        label="下单用户"
        width="180">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款"
        width="180">
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        width="180">
      </el-table-column>
      <el-table-column
        prop="update_time"
        label="下单时间"
        width="180">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" icon="el-icon-edit" plain @click.prevent="show()"></el-button>
          <el-button type="danger" size="mini" icon="el-icon-location-outline" plain @click.prevent="ditu()"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="loadingOrders"
      :current-page.sync="currentPage1"
      :page-sizes="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- /分页 -->

    <!-- 省市级联 对话框-->
    <el-dialog title="省市级联" :visible.sync="Cascades">
      <el-cascader
        expand-trigger="hover"
        :options="options">
      </el-cascader>

      <!-- 确定取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cascades = false">取 消</el-button>
        <el-button type="primary" @click.prevent="Cascades = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /省市级联 对话框-->

    <!-- 百度地图对话框 -->
    <el-dialog title="百度地图" :visible.sync="dtmap">

      <!-- 百度地图 -->
      <baidu></baidu>

      <!-- 确定取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="dtmap = false">取 消</el-button>
        <el-button type="primary" @click.prevent="dtmap = false">确 定</el-button>
      </div>
    </el-dialog>
    <!-- /百度地图对话框 -->

  </div>
</template>

<script>
import { ordersList } from '@/api/orders'
import { provinceAndCityData, regionData, provinceAndCityDataPlus, regionDataPlus, CodeToText, TextToCode } from 'element-china-area-data' // 省市级联 对话框
import baidu from './baidu'

export default {
  name: 'orders',
  data () {
    return {
      tableData: [],
      tableLoading: true,
      pageSize: 10, // 每页数据条数
      currentPage1: 1, // 分页
      total: 0, // 数据总条数
      searchText: '', // 模糊查询
      Cascades: false, // 级联对话框
      options: regionData, // 省市级联，这个值在上面的import中的任意一个
      dtmap: false // 百度地图对话框
    }
  },

  components: {
    baidu
  },

  created () {
    this.loadingOrders()
  },
  methods: {

    // 使index序号切换下一页也能保持顺序一致 乘5是指每页有五条数据 currentPage1是对应上面的分页
    indexMethod (index) {
      return (this.currentPage1 - 1) * 5 + index + 1
    },

    // 刷新页面
    async loadingOrders (pagenum = 1, pageSize = this.pageSize) {
      const { meta, data } = await ordersList({ pagenum: pagenum, pagesize: pageSize, query: this.searchText })
      if (meta.status === 200) {
        this.total = data.total
        this.tableLoading = false
        this.tableData = data.goods
      }
    },

    // 分页
    async handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${this.pageSize} 条`)
      // 刷新数据
      this.loadingOrders()
    },

    // 省市级联
    show () {
      this.Cascades = true

    },

    // 百度地图
    ditu () {
      this.dtmap = true
    }
  }
}
</script>

<style scoped>
.el-table {
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
