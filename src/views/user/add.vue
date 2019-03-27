<template>
  <el-dialog title="添加用户" :visible.sync="addlogFormVisible">
    <el-form :model="addFormData" ref="addFormData" :rules="rules">
      <el-form-item label="用户名称" label-width="80px">
        <el-input v-model="addFormData.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="用户密码" label-width="80px">
        <el-input v-model="addFormData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" label-width="80px">
        <el-input v-model="addFormData.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" label-width="80px">
        <el-input v-model="addFormData.mobile" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addlogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import addUser from '@/api/user'

export default {
  name: 'addUser',
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
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      addlogFormVisible: false, //对话框 是否 显示，false为不显示
      disabled: false, //按钮禁用 fales为不禁用
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
    headerUserEdit () {
      this.$refs.addFormData.validate(valid => {
        if (!valid) {
          return false
        }
        this.submitEdit()
      })
    },

    async headerAdd () {
      const { meta, data } = await User.addUser(this.addFormData)
      if (meta.status === 201) {
        console.log(data)
        this.disabled = true //禁用确认按钮
        this.addlogFormVisible = false //隐藏对话框
        this.loadUsers(addFormData) //重新刷新数据
        this.$refs.addFormData.resetFields(); //重置效果，也就是清空输入框 (这个功能有问题)
      }
    }
  }
}
</script>

<style scoped>

</style>
