import request from '@/utils/request'

/**
 * 获取列表数据
 */
export const ordersList = ({ pagenum = 1, pagesize = 10, query = '' }) => request({
  method: 'get',
  url: '/orders',
  params: {
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)
