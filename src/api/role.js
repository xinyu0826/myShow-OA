import request from '@/utils/request'
/**
 * 获取角色列表
 */
export const getRoleList = () => request({
  method: 'get',
  url: '/roles'
}).then(res => res.data)

/**
 * 添加角色
 */
export const RolesAdd = ({ roleName, roleDesc }) => request({
  method: 'post',
  url: '/roles',
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)

/**
 * 删除角色
 */
export const deleRoles = (id) => request({
  method: 'delete',
  url: `/roles/${id}`
}).then(res => res.data)

/**
 * 编辑提交角色
 */
export const edit = (id, roleName, roleDesc) => request({
  method: 'put',
  url: `/roles/${id}`,
  data: {
    roleName,
    roleDesc
  }
}).then(res => res.data)

/**
 * 根据id查询角色
 */
export const queryEdit = (id) => request({
  method: 'get',
  url: `/roles/${id}`
}).then(res => res.data)

/**
 * 角色授权
 */
export const roleAuthorize = (id) => request({
  method: 'post',
  url: `/roles/${id}/rights`,
  data: {
    id
  }
}).then(res => res.data)
