/**
 * 商品分类管理
 */
import request from '@/utils/request'

// 商品分类列表
export const getGoodsCategoryList = (type = 3) => request({
  method: 'get',
  url: '/categories',
  params: {
    type
  }
}).then(res => res.data)

// 添加商品分类
export const addGoods = ({ goods_name, goods_cat, goods_price, goods_number, goods_weight, attrs = [],pics = [] }) => request({
  method: 'post',
  url: '/goods',
  data: {
    goods_name,
    goods_cat,
    goods_price,
    goods_number,
    goods_weight,
    attrs,
    pics
  }
}).then(res => res.data)

// 获取商品分类参数列表
export const getGoodsCategoryAttrs = (catid, sel = 'many') => request({
  method: 'get',
  url: `/categories/${catid}/attributes`,
  params: {
    sel
  }
}).then(res => res.data)
