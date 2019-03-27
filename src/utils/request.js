import axios from 'axios'
import { getItem } from '@/utils/auth'

const http = axios.create({
  baseURL: 'http://localhost:8888/api/private/v1/'
})

//axios 请求拦截器
http.interceptors.request.use(function (config) {
  console.log('3. 请求经过请求拦截器，这里统一的加 token')
  if (config.url !== '/login') {
    // config.headers.Authorization = window.localStorage.getItem('token')
    config.headers.Authorization = getItem()
  }
  //请求通过的规则，如果不return config 则请求不会发出去
  return config
}, function (error) {
  return Promise.reject(error)
})

//axios响应拦截器
http.interceptors.response.use(function (response) {
  console.log('4. 响应回来先经过响应拦截器，这里判断响应码是否为 401')
  // console.log(response.data.meta.status)
  if (response.data.meta.status === 401) {
    return replace('/login')
  }
  //这里 return 的 response 会作为你真正的响应结果
  // console.log(response)
  return response
}, function (error) {
  return Promise.reject(error)
})

export default http
