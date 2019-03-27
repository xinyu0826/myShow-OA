<template>
  <el-dialog title="分类编辑用户" :visible.sync="userEditFormVisible">
    <el-form :model="userEditFormData" ref="userEditFormData" :rules="rules">
      <el-form-item label="用户名称" label-width="80px" prop="username">
        <el-input v-model="userEditFormData.username" autocomplete="off" disabled></el-input>
      </el-form-item>
      <el-form-item label="角色" label-width="80px" prop="email">
        <!-- el-select 会自动让 el-options 的 value 与 editForm.rid 相等的被选中 -->
        <el-select v-model="userEditFormData.rid" placeholder="请选择">
          <el-option :value="-1" label="请选择"></el-option>
          <!-- roleName 和 id 是后台数据的 -->
          <el-option
            v-for="item in roles"
            :key="item.value"
            :label="item.roleName"
            :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="userEditFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="handleEditRole">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import { getById as getUserById, updateById } from '@/api/user'
import { getById as getUserById, updateUserRoleByUserId } from '@/api/user'
import { getRoleList } from '@/api/role'

export default {
  name: 'UserEditRole',
  data () {
    return {
      userEditFormVisible: false,
      userEditFormData: {
        username: '',
        email: '',
        rid: 0
      },
      roles: [],
      // 表单验证
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ]
      }
    }
  },
  methods: {

    // 确定修改
    async handleEditRole () {
      const { id: userId, rid: roleId } = this.userEditFormData
      // 传参修改
      const { data, meta } = await updateUserRoleByUserId(userId, roleId)
      if (meta.status === 200) {
        //关闭对话框
        this.userEditFormVisible = false
        // 更新成功提示
        this.$message({
          type: 'success',
          message: '分配用户角色成功'
        })
      }
    },
    // 点击编辑按钮让对话框显示，并接受数据
    async showEditRoleDialog (item) {
      console.log(item)

      const { data, meta } = await getUserById(item.id)
      if (meta.status === 200) {
        this.userEditFormData = data
        // 显示编辑对话框
        this.userEditFormVisible = true
      }
      // data: roleData, meta: roleMeta 这个是使用的别名
      const { data: roleData, meta: roleMeta } = await getRoleList()
      if (roleMeta.status === 200) {
        // 从后端接受的数据赋给roles数组，然后进行遍历出来
        this.roles = roleData
      }
    }
  }
}
</script>

<style scoped>

</style>
