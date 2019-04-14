<template>
  <div>
    <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
      <el-form :model="form" label-position="left" label-width="80px" :rules="rules" ref="form">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="form.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            change-on-select
            clearable
            :options="goodsCategories"
            :props="{
              value: 'cat_id',
              label: 'cat_name',
              children: 'children'
            }"
            v-model="form.cat_pid">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click.prevent="cancel">取 消</el-button>
        <el-button type="primary" @click.prevent="handleSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addGoodsCategory } from '@/api/addGoodsCategory'
import { getGoodsCategoryList } from '@/api/categories'

export default {
  name: 'GoodsCategoryAdd',
  data () {
    return {
      dialogFormVisible: false, // 隐藏对话框
      form: {
        cat_name: '', // 分类名称
        cat_pid: [], // cascader 会把选中的节点存储到该数组中
        cat_level: '' // 分类的级别
      },
      goodsCategories: [], // 级联存储的内容
      // 表单验证
      rules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },

  created () {
    this.loadGoodsCategories()
  },

  methods: {
    // 表单验证
    handleSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }
        this.AddSubmit()
      })
    },

    show () {
      this.dialogFormVisible = true
    },

    // 刷新页面数据
    async loadGoodsCategories () {
      const { meta, data } = await getGoodsCategoryList(2) // 只加载包含2级的商品分类
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },

    // 确定按钮
    async AddSubmit () {
      const { cat_pid, cat_name, cat_level } = this.form
      const { meta, data } = await addGoodsCategory({
        cat_pid: cat_pid[cat_pid.length - 1] || 0,
        cat_name,
        cat_level: cat_pid.length // 0 是一级、1 是 二级、2 是三级
      })

      if (meta.status === 201) {
        this.dialogFormVisible = false
        this.$refs.form.resetFields() // 重置也就是清空表单内容
        this.$emit('add-success')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    },

    // 取消按钮 resetFields
    cancel () {
      this.dialogFormVisible = false
      this.$refs.form.resetFields() // 重置也就是清空表单内容
    }
  }
}
</script>

<style scoped>

</style>
