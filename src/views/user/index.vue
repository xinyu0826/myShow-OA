<template>
  <div class="userBox">
    <div class="text item">
        <el-row :gutter="20">
          <el-col :span="5">
            <!-- input框 -->
            <!--
  +          el-input 是一个组件，无法直接监听原生的 click、keyup 等事件
  +          如果需要监听，则必须使用 .native 修饰符
  +          .native 修饰符监听组件根元素的原生事件
  +
  +          注意：这里将 loadUsers 作为原生事件的处理函数，一定要记得手动调用传 1，第 1 页数据
  +          否则 loadUsers 的第1个参数就是事件源对象，把事件源对象当成页码去请求数据就是有问题的
  +         -->
            <el-input
            placeholder="请输入内容"
            class="input-with-select"
            v-model="searchText"
            @keyup.enter.native="loadUsers(1)">
              <el-button slot="append" icon="el-icon-search" @click="loadUsers(1)"></el-button>
            </el-input>
          </el-col>
          <el-col :span="6"><el-button type="primary" plain @click="addlogFormVisible = true">添加用户</el-button></el-col>
        </el-row>
        <!--结束 input框 -->
        <!--表格
            :index="indexMethod" 使index序号切换下一页也能保持顺序一致
         -->
        <el-table
          :data="userTableData"
          style="width: 80%"
          v-loading="tableLoading">
          <el-table-column
            type="index"
            width="80"
            :index="indexMethod">
          </el-table-column>
          <el-table-column
            prop="username"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="email"
            label="邮箱"
            width="300">
          </el-table-column>
          <el-table-column
            prop="mobile"
            label="电话"
            width="300">
          </el-table-column>
          <el-table-column
            label="用户状态"
            width="150">
            <!-- scope.row.mg_state 遍历的每一项的mg_state值，mg_state是后端给的数据 -->
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                @change="handleChangeState(scope.row)"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column
            label="操作">
            <!--
    +        自定义表格列
    +        1. 自定义内容写到 <template slot-scope="scope"></template>
    +           slot-scope 是固定的属性
    +           值 "scope" 是随便起的一个名字
    +           在 template 中，scope.row 用于获取当前遍历项（item）
    +           scope.$index 就是遍历的索引
    +       -->
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" plain @click="$refs.userEditEl.showEditDialog(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" plain @click="handleDelete(scope.row)"></el-button>
              <el-button type="success" icon="el-icon-check" plain @click="$refs.userEditRoleEl.showEditRoleDialog(scope.row)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--结束 表格 -->

        <!-- 分页 -->
        <!--
    +      分页组件 el-pagination
    +      background 带有背景色
    +      layout 分页结构，prev 显示上一页，pager next 下一页
    +      total 数据总条数
    +      默认按照 10 条每页进行分页
    +      current-change 页码改变会触发该事件
    +    -->
        <el-pagination
          background
          @size-change="handleSizeChange"
          @current-change="loadUsers"
          :current-page.sync="currentPage1"
          :page-sizes="[5, 10, 15, 20, 25, 30, 35, 40, 45, 50]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
        <!-- 结束 分页 -->
    </div>

    <!-- 添加用户对话框 -->
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
        <el-button type="primary" @click.prevent="addrules(addFormData)">确 定</el-button>
      </div>
    </el-dialog>
    <!--结束 添加用户对话框 -->

    <!-- 编辑对话框 -->
    <UserEdit ref="userEditEl" v-on:edit-success="loadUsers"></UserEdit>
    <!-- 编辑对话框 -->

    <!-- 分类编辑框 -->
    <UserEditRole ref="userEditRoleEl"></UserEditRole>
  </div>
</template>

<script>
// import { getUserList, addUser } from '@/api/user'
import * as User from '@/api/user'
import UserEdit from './edit'
import UserEditRole from './edit-role'

export default {

  // 生命周期
  async created () {
    console.log('2. token 存在，进入了具体的业务组件')
    //加载数据
    this.loadUsers()
  },
  name: 'userlist',
  data () {

    return {
      userTableData: [],
      addFormData: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      searchText: '', // 模糊查询
      pageSize: 5, // 每页数据条数
      total: 0, // 数据总条数
      currentPage1: 1, // 分页
      addlogFormVisible: false, //对话框 是否 显示，false为不显示 validate
      tableLoading: true, //加载效果 ，true为有加载效果
      disabled: false, //按钮禁用 fales为不禁用
      // 表单验证
      rules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' }
        ]
      },
    }
  },
  components: {
    UserEdit, // 自定义编辑对话框组件 rules
    UserEditRole
  },

  methods: {

    // 使index序号切换下一页也能保持顺序一致 乘5是指每页有五条数据 currentPage1是对应上面的分页
    indexMethod (index) {
      return (this.currentPage1 - 1) * 5 + index + 1
    },

    // 表单验证
    addrules () {
      this.$refs.addFormData.validate(valid => {
        if (!valid) {
          return false
        }
        this.headerAdd()
      })
    },

    async loadUsers (page = 1, pageSize = this.pageSize) {
      console.log(pageSize)
      this.tableLoading = true // 设置加载效果
      // 除了登陆接口，其它接口都需要身份令牌才能访问
      // 所有需要授权（提供 token）的接口都需要像下面这样来写
      const { data } = await User.getUserList({ pagenum: page, pagesize: pageSize, query: this.searchText })
      this.userTableData = data.users
      // console.log(data)
      this.total = data.total
      this.tableLoading = false // 取消加载效果
    },
    async headerAdd () {
      const { meta } = await User.addUser(this.addFormData)
      if (meta.status === 201) {
        this.disabled = true // 禁用确认按钮
        this.addlogFormVisible = false // 隐藏对话框
        this.loadUsers() // 重新刷新数据
        this.$refs.addFormData.resetFields() // 重置效果，也就是清空输入框 (这个功能有问题)
      }
    },

    // 删除
    handleDelete (item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { meta } = await User.deleteById(item.id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 刷出数据
          this.loadUsers(this.currentPage1)
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 用户状态change
    async handleChangeState (item) {
      const { meta, data } = await User.changeState(item.id, item.mg_state)
      if (meta.status === 200) {
        this.$message({
          type: 'success',
          message: `${data.mg_state ? '启用' : '禁用'}用户状态成功`
        })
      }
    },
    // 分页
    async handleSizeChange (val) {
      this.pageSize = val
      console.log(`每页 ${this.pageSize} 条`)
      // 刷新数据
      this.loadUsers()
    }
  }
}
</script>

<style scoped>

.el-table {
  border: 1px solid oldlace;
}
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.el-pagination {
  margin-top: 15px;
}

.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
</style>
