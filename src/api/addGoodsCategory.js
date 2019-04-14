import request from '@/utils/request'

// 添加商品分类
export const addGoodsCategory = ({ cat_pid, cat_name, cat_level }) => request({
  method: 'post',
  url: '/categories',
  data: {
    cat_pid,
    cat_name,
    cat_level
  }
}).then(res => res.data)

// 删除分类
export const dele = (id) => request({
  method: 'delete',
  url: `/categories/${id}`
}).then(res => res.data)
