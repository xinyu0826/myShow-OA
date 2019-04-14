<template>
  <el-row>
    <!-- 添加角色按钮 -->
    <el-col :span="24" class="jue">
      <el-button type="success" plain @click="addR">添加角色</el-button>
    </el-col>
    <!-- /添加角色按钮 -->
    <!-- 表格
        type="expand" 是点击箭头动态效果
     -->
    <el-table
      :data="rolesForm"
      border
      stripe
      style="width: 60%">
      <el-table-column
        type="expand"
        width="50">
        <template slot-scope="scope">
          <el-row class="first" v-for="first in scope.row.rights" :key="first.id">
            <!-- 一级 -->
            <el-col :span="3">
              <el-tag closable  @close="handleDeleteRights(scope.row, first)">{{ first.authName }}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>

            <!-- 二级 -->
            <el-col :span="20">
              <el-row class="second" v-for="second in first.children" :key="second.id">
                <el-col :span="4">
                  <el-tag closable type="success"  @close="handleDeleteRights(scope.row, second)">{{ second.authName }}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>

                <!-- 三级 -->
                <el-col :span="20">
                  <el-tag class="third" v-for="third in second.children" :key="third.id" closable type="warning"  @close="handleDeleteRights(scope.row, third)">{{ third.authName }}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称"
        width="200">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="描述"
        width="280">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain @click="editRights(scope.row)"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain @click="deleteRoles(scope.row)"></el-button>
          <el-button type="success" icon="el-icon-check" plain @click="showEdit(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- /表格 -->

    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="num">
    </el-pagination>
    <!-- /分页 -->

    <!-- 添加编辑组件 -->
    <addRoles ref="addRolesEl" v-on:edit-success="rolesLoading"></addRoles>
    <!-- 添加编辑组件 -->

    <!-- 编辑角色组件 -->
    <editRoles ref="editRolesEl" @edit-success="rolesLoading"></editRoles>
    <!-- /编辑角色组件 -->

    <!-- 显示树形编辑框 -->
    <showEdit ref="showEditEl" @edit-success="rolesLoading"></showEdit>
  </el-row>
</template>

<script>
import { getRoleList, deleRoles, edit, roleDelete } from '@/api/role'
import addRoles from './addRoles'
import editRoles from './editRoles'
import showEdit from './editRights'

export default {
  name: 'roles',
  data () {
    return {
      rolesForm: [],
      num: 0 // 列表数据总条数
    }
  },
  components: {
    addRoles, // 添加编辑组件
    editRoles, // 编辑角色组件
    showEdit // 显示树形编辑框
  },
  created () {
    this.rolesLoading()
  },
  methods: {

    // 刷新数据列表
    async rolesLoading () {
      const { meta, data } = await getRoleList()
      if (meta.status === 200) {
        data.forEach(item => {
          item.rights = item.children
          delete item.children // 删除 children
        })
        // console.log(data)
        this.num = data.length
        this.rolesForm = data
      }
    },
    // 添加角色按钮
    async addR () {
      this.$refs.addRolesEl.addRol()
    },
    // 删除角色
    async deleteRoles (item) {
      this.$confirm('确认删除吗？', '删除提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data, meta } = await deleRoles(item.id)
        if (meta.status === 200) {
          this.$message({
            type: 'success',
            message: '删除成功'
          })
          // 刷出数据
          this.rolesLoading()
        }
      }).catch((err) => {
        console.log(err)
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 编辑角色
    editRights (item) {
      this.$refs.editRolesEl.showEditDialog(item)
    },
    // 树形编辑框
    showEdit (item) {
      this.$refs.showEditEl.showDialog(item)
    },
    // 删除权限 role 是角色 right 是权限
    async handleDeleteRights (role, right) {
      const { meta, data } = await roleDelete(role.id, right.id)
      if (meta.status === 200) {
        // 删除接口会返回该用户的最新的权限列表，我们可以直接把这个 data 赋值给当前角色的权限列表
        role.children = data
        this.$message({
          type: 'success',
          message: '删除权限成功'
        })
      }
    }
  }
}
</script>

<style scoped>
.jue {
  margin-bottom: 20px;
}
.one {
  margin: 0;
  padding: 0;
}
.first {
  margin-bottom: 5px;
  margin-top: -5px;
}
.second {

}
.third {
  margin-right: 5px;
  margin-top: 4px;
}
</style>
