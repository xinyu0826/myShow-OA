import request from '@/utils/request'

/**
 * 商品列表数据
 */
export const shopList = ({pagenum = 1, pagesize = 10, query = ''}) => request({
  method: 'get',
  url: '/goods',
  params: {
    pagenum,
    pagesize,
    query
  }
}).then(res => res.data)

/**
 * 删除商品
 */
export const delShop = (id) => request({
  method: 'delete',
  url: `/goods/${id}`
}).then(res => res.data)
