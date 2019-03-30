<template>
  <el-dialog title="角色授权" :visible.sync="addRolesFormVisible">
    <!--
+    tree 组件
+    data 数据
+    show-checkbox 是否显式复选框
+    node-key 用来指定数据中唯一的标识字段
+    default-expanded-keys 默认展开的节点 id
+    default-checked-keys 默认选中的节点
+    props
+
+    :default-expanded-keys="[2, 3, 4]"
+    :default-checked-keys="[5]"
+   -->
    <el-tree
      :data="rights"
      ref="tree"
      show-checkbox
      default-expand-all
      :default-checked-keys="defaultChecked"
      node-key="id"
      :props="defaultProps">
      </el-tree>
    <div slot="footer" class="dialog-footer">
      <el-button @click="addRolesFormVisible = false">取 消</el-button>
      <el-button type="primary" @click.prevent="submitEdit">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getRightsList } from '@/api/rights'
import { roleAuthorize } from '@/api/role'

export default {
  name: 'editRights',
  data () {
    return {
      addRolesFormVisible: false,
      rights: [],
      defaultChecked: [],
      defaultProps: {
        children: 'children', // 告诉 tree 你的数据中哪个字段是子节点数组
        label: 'authName' // 告诉 tree 你的数据中哪个字段是节点的文本
      },
      roleId: 0 // 角色id 用于修改权限
    }
  },
  methods: {
    // 显示弹框,带参数
    showDialog (role) {
      this.roleId = role.id
      this.addRolesFormVisible = true
      this.loadRights()
      this.getRights(role.children) // 让角色的拥有的权限在权限树中被选中
    },
    getRights (roleRights) {
      const tmp = []
      roleRights.forEach(first => {
        first.children.forEach(second => {
          second.children.forEach(third => tmp.push(third.id))
        })
      })
      // 把tmp给defaultChecked
      this.defaultChecked = tmp
    },
    // 显示数据
    async loadRights () {
      const { meta, data } = await getRightsList('tree')
      if (meta.status === 200) {
        this.rights = data
      }
    },
    // 确定按钮
    async submitEdit () {
      const id = this.roleId
      const tree = this.$refs.tree
      console.log(...tree.getCheckedKeys())
      console.log(...tree.getHalfCheckedKeys())
      const rids = [...tree.getCheckedKeys(), ...tree.getHalfCheckedKeys()].join(',')
      console.log(rids)
      const { meta } = await roleAuthorize(id, rids)
      if (meta.status === 200) {
        // 关闭弹框
        this.addRolesFormVisible = false
        // 刷新数据列表
        this.$emit('edit-success')
        // 更新成功提示
        this.$message({
          type: 'success',
          message: '角色授权成功'
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
