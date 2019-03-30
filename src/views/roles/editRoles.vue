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
      <el-button type="primary" @click.prevent="roule">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { edit } from '@/api/role'
import { queryEdit } from '@/api/role'

export default {
  name: 'editRoles',
  data () {
    return {
      addFormData: {
        roleId: '',
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
    roule () {
      this.$refs.userEditFormData.validate(valid => {
        if (!valid) {
          return false
        }
        this.submitEdit()
      })
    },

    // 确认按钮
    async submitEdit () {
      const { roleId, roleName, roleDesc } = this.addFormData
      const { meta, data } = await edit(roleId, roleName, roleDesc)
      if (meta.status === 200) {
        console.log(data)
        this.addRolesFormVisible = false
        this.$emit('edit-success')
        // 更新成功提示
        this.$message({
          type: 'success',
          message: '角色修改成功'
        })
      }
    },
    // 弹出编辑框并显示数据
    async showEditDialog (item) {
      const { meta, data } = await queryEdit(item.id)
      if (meta.status === 200) {
        this.addRolesFormVisible = true
        console.log(data)
        this.addFormData = data
      }
    }
  }
}
</script>

<style scoped>

</style>
