<template>
  <el-dialog title="添加角色" :visible.sync="addRolesFormVisible">
    <el-form :model="addFormData" ref="addFormData" :rules="rules">
      <el-form-item label="角色名称" label-width="80px">
        <el-input v-model="addFormData.roleName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色描述" label-width="80px">
        <el-input v-model="addFormData.roleDesc" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addRolesFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { RolesAdd } from '@/api/role'

export default {
  name: 'addRoles',
  data () {
    return {
      addFormData: {
        roleName: '',
        roleDesc: ''
      },
      addRolesFormVisible: false, // 显示弹窗是否隐藏
      disabled: false, // false为不禁用
      rules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 表单验证
    submitEdit () {
      this.$refs.addFormData.validate(valid => {
        if (!valid) {
          return false
        }
        this.submitEdit()
      })
    },
    // 确认按钮
    async submitEdit () {
      const { roleName, roleDesc } = this.addFormData
      const { meta, data } = await RolesAdd({ roleName, roleDesc })
      if (meta.status === 201) {
        console.log(data)
        this.disabled = true
        this.addRolesFormVisible = false
        this.$emit('edit-success') // 刷新数据列表
        this.$refs.addFormData.resetFields() // 清空表单数据
        // 更新成功提示
        this.$message({
          type: 'success',
          message: '更新成功'
        })
      }
    },
    // 弹出编辑框
    async addRol () {
      this.addRolesFormVisible = true
    }
  }
}
</script>

<style scoped>

</style>
