<template>
  <el-dialog title="编辑用户" :visible.sync="userEditFormVisible">
    <el-form :model="userEditFormData" ref="userEditFormData" :rules="rules">
      <el-form-item label="用户名称" label-width="80px" prop="username">
        <el-input v-model="userEditFormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px" prop="email">
        <el-input v-model="userEditFormData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px" prop="mobile">
        <el-input v-model="userEditFormData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="userEditFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// getById as getUserById 这是使用别名
import { getById as getUserById, updateById } from '@/api/user'

export default {

  name: 'userEdit',
  data () {
    // 自定义手机号
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('手机号不能为空'))
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        console.log(reg.test(value))
        if (reg.test(value)) {
          callback()
        } else {
          return callback(new Error('请输入正确的手机号'))
        }
      }
    }
    // 结束--自定义手机号

    return {
      userEditFormData: {
        username: '',
        email: '',
        mobile: ''
      },
      // 对话框是否显示
      userEditFormVisible: false,
      // 表单验证
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, validator: checkPhone, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单验证
    // headerUserEdit () {
    //   this.$refs.userEditFormData.validate(valid => {
    //     if (!valid) {
    //       return false
    //     }
    //     this.submitEdit()
    //   })
    // },

    // 确定修改
    async submitEdit () {
      const { id, email, mobile } = this.userEditFormData
      // 传参修改
      const { data, meta } = await updateById(id, {email, mobile})
      if (meta.status === 200) {
        // 更新数据 此方法是事件方法 (src/views/User/index.vue  <UserEdit ref="userEditEl" v-on:edit-success="loadUsers"></UserEdit>)
        this.$emit('edit-success')
        //关闭对话框
        this.userEditFormVisible = false
        // 更新成功提示
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }
    },

    // 点击编辑按钮让对话框显示，并接受数据
    async showEditDialog (item) {
      console.log(item)

      const { data, meta } = await getUserById(item.id)
      if (meta.status === 200) {
        this.userEditFormData = data
        // 显示编辑对话框
        this.userEditFormVisible = true
      }
    }
  }
}
</script>

<style scoped>

</style>
