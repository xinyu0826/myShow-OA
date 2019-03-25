/**
 * 用户的接口封装
 */
import request from '@/utils/request'

export const getUserList = ({ pagenum = 1, pagesize = 5}) => request({
    method: 'get',
    url: '/users',
    params: {
      pagenum,
      pagesize
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
