<template>
  <div class="userBox">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>
          <!-- 面包屑 -->
          <el-breadcrumb separator=">>">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
          <!--结束 面包屑 -->
        </span>
      </div>
      <div class="text item">
          <el-row :gutter="20">
            <el-col :span="5">
              <!-- input框 -->
              <el-input placeholder="请输入内容" class="input-with-select">
                <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
            <el-col :span="6"><el-button type="primary" plain @click="addlogFormVisible = true">添加用户</el-button></el-col>
          </el-row>
          <!--结束 input框 -->
          <!--结束 表格 -->
          <el-table
            :data="userTableData"
            style="width: 80%"
            v-loading="tableLoading">
            <el-table-column
              prop="id"
              label="ID"
              width="80">
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
              prop="type"
              label="不用状态"
              width="150">
              <el-switch
                v-model="value2"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-table-column>
            <el-table-column
              prop=""
              label="操作">
              <el-button type="primary" icon="el-icon-edit" plain></el-button>
              <el-button type="danger" icon="el-icon-delete" plain></el-button>
              <el-button type="success" icon="el-icon-check" plain></el-button>
            </el-table-column>
          </el-table>
          <!--结束 表格 -->
      </div>
    </el-card>

    <!-- 添加用户对话框 -->
    <el-dialog title="添加用户" :visible.sync="addlogFormVisible">
      <el-form :model="addFormData" ref="addFormData">
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
        <el-button type="primary" @click.prevent="headerAdd(addFormData)">确 定</el-button>
      </div>
    </el-dialog>
    <!--结束 添加用户对话框 -->
  </div>
</template>

<script>
import { getUserList, addUser } from '@/api/user'
import { truncate } from 'fs';

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
      addlogFormVisible: false, //对话框 是否 显示，false为不显示
      tableLoading: true, //加载效果 ，true为有加载效果
      disabled: false, //按钮禁用 fales为不禁用
      //Switch 开关
      value1: true,
      value2: true
    }
  },
  methods: {
    async loadUsers () {
      this.tableLoading = true //设置加载效果
      // 除了登陆接口，其它接口都需要身份令牌才能访问
      //所有需要授权（提供 token）的接口都需要像下面这样来写
      const { data } = await getUserList({ pagenum: 1, pagesize: 100 })
      this.userTableData = data.users
      this.tableLoading = false //取消加载效果
    },
    async headerAdd () {
      const { meta } = await addUser(this.addFormData)
      if (meta.status === 201) {
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
.userBox {
  height: 100%;
}
.el-table {
  height: 100%;
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

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
  height: 100%;
}

.el-row {
  margin-bottom: 10px;
}
.el-col {
  border-radius: 4px;
}
</style>
