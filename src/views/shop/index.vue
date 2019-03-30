<template>
  <div>
    <el-row :gutter="20">
       <!-- input按钮 -->
      <el-col :span="8">
        <el-input placeholder="请输入内容" @keyup.native.enter="loadingShop(1)" v-model="searchText">
          <el-button slot="append" icon="el-icon-search" @click="loadingShop(1)" v-model="searchText"></el-button>
        </el-input>
      </el-col>
      <!-- button按钮 -->
      <el-col :span="8">
        <el-button @click="$router.push('/addShop')">添加商品</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="shopForm"
      border
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        label="编号"
        width="50">
      </el-table-column>
      <el-table-column
        prop="goods_name"
        label="商品名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_price"
        label="商品价格"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_state"
        label="商品状态"
        width="180">
      </el-table-column>
      <el-table-column
        prop="goods_weight"
        label="商品重量"
        width="180">
      </el-table-column>
      <el-table-column
        prop="add_time"
        label="创建时间"
        width="180">
        <!-- 时间过滤器 -->
        <template slot-scope="scope">{{ scope.row.add_time | dateFormat }}</template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click.prevent="editShop(scope.row)">编辑</el-button>
          <el-button type="danger" plain size="mini" @click.prevent="deleteShop(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->

    <!-- 分页 -->
    <el-pagination
      background
      @current-change="loadingShop"
      :page-size="10"
      layout="total, prev, pager, next"
      :total="shoptotal">
    </el-pagination>
    <!-- /分页 -->
  </div>
</template>

<script>
import { shopList, delShop } from '@/api/shop'

export default {
  name: 'shopList',
  data () {
    return {
      shopForm: [],
      searchText: '', // 输入框查询
      shoptotal: 0
    }
  },
  created () {
    this.loadingShop()
  },
  methods: {
    // 加载数据列表
    async loadingShop (page = 1) {
      const { meta, data } = await shopList({pagenum: page, query: this.searchText})
      console.log(data)
      if (meta.status === 200) {
        this.shopForm = data.goods
        this.shoptotal = data.total
      }
    },

    // 商品编辑
    editShop () {},

    // 商品删除
    async deleteShop (item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await delShop(item.goods_id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 刷出数据
          this.loadingShop()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
