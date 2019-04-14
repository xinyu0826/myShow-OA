/**
 * 公共的接口封装
 */
import request from '@/utils/request'

export const login = (data) => request({
    method: 'post',
    url: '/login',
    data: {
      username: data.username,
      password: data.password
    }
  }).then(res => res.data)


/**
 * 图片上传接口
 */
export const upload = files => {
  const formData = new FormData()
  formData.append('file', files[0])
  return request({
    method: 'post',
    url: '/upload',
    data: formData
  }).then(res => res.data)
}
