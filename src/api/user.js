/**
 * 用户的接口封装
 */
import request from '@/utils/request'
/**
 * 获取用户列表
 */
export const getUserList = ({ pagenum = 1, pagesize = 5, query = ''}) => request({
    method: 'get',
    url: '/users',
    params: {
      pagenum,
      pagesize,
      query  // 用于模糊查询用户名
    }
  }).then(res => res.data)


//添加用户
export const addUser = ({ username, password, email, mobile }) => request({
  method: 'post',
  url: '/users',
  data: {
    username,
    password,
    email,
    mobile
  }
}).then(res => res.data)

/**
 * 修改用户状态
 */
export const changeState = (id, state) => request({
  method: 'put',
  url: `/users/${id}/state/${state}`
}).then(res => res.data)

/**
 * 删除用户
 */
export const deleteById = (id) => request({
  method: 'delete',
  url: `/users/${id}`
}).then(res => res.data)

/**
 * 根据ID查询用户信息
 */
export const getById = (id) => request({
  method: 'get',
  url: `/users/${id}`
}).then(res => res.data)

/**
 * 修改用户状态
 */
export const updateById = (id, data) => request({
  method: 'put',
  url: `/users/${id}`,
  data: { // PUT 请求体和 POST 一样
    email: data.email,
    mobile: data.mobile
  }
}).then(res => res.data)

/**
 * 根据用户id 修改用户角色
 */
export const updateUserRoleByUserId = (userId, roleId) => request({
  method: 'put',
  url: `/users/${userId}/role`,
  data: {
    rid: roleId
  }
}).then(res => res.data)
