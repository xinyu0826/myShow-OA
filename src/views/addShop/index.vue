<template>
  <div class="box">
    <!-- step步骤条 -->
    <el-steps finish-status="success" :active="active">
      <el-step title="步骤 1"></el-step>
      <el-step title="步骤 2"></el-step>
      <el-step title="步骤 3"></el-step>
      <el-step title="步骤 4"></el-step>
      <el-step title="步骤 5"></el-step>
    </el-steps>
    <!-- /step步骤条 -->

    <!-- tabs标签页 -->
    <el-tabs tab-position="left" style="height: 100%;" @tab-click="handleTabChange">
      <el-tab-pane label="基本信息">
        <el-form label-position="left" label-width="80px" :model="formLabelAlign">
          <el-form-item label="商品名称">
            <el-input v-model="formLabelAlign.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="formLabelAlign.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formLabelAlign.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formLabelAlign.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!--
+              级联选择器
+              options 数据（树结构的数据）
+              v-model 选中的节点的id数组，会同步到指定的数据上
+              change 选中节点改变事件
+           -->
            <el-cascader
              expand-trigger="hover"
              :options="goodsCategories"
              :props="{
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
              }"
              v-model="formLabelAlign.goods_cat"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="是否促销">
            <el-radio-group v-model="formLabelAlign.is_promote" size="medium">
              <el-radio border :label="true">是</el-radio>
              <el-radio border :label="false">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-row :gutter="20" class="bbt">
          <el-col :span="20">
            <el-button size="medium" @click.prevent="$router.replace('/goods')">取消</el-button>
            <el-button type="primary" size="medium" @click.prevent="handleSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品参数">
        <el-row class="attr-row" v-for="attr in goodsCategoryAttrs" :key="attr.attr_id">
          <el-col :span="2">{{ attr.attr_name }}</el-col>
          <el-col :span="22">
            <el-checkbox-group v-model="attr.attr_selected_vals" size="small">
               <el-checkbox
                :label="val"
                border
                v-for="val in attr.attr_vals.split(',')" :key="val.id"></el-checkbox>
            </el-checkbox-group>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="bbt">
          <el-col :span="20">
            <el-button size="medium" @click.prevent="$router.replace('/goods')">取消</el-button>
            <el-button type="primary" size="medium" @click.prevent="handleSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品属性">
        <el-form label-width="150px" >
          <el-form-item :label="item.attr_name" v-for="item in goodsCategoryParams" :key="item.attr_id">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-form>
        <el-row :gutter="20" class="bbt">
          <el-col :span="20">
            <el-button size="medium" @click.prevent="$router.replace('/goods')">取消</el-button>
            <el-button type="primary" size="medium" @click.prevent="handleSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品图片">
         <!--
          action 上传的接口地址
            上传组件会自动去请求接口进行上传
            由于请求不是我们发送的，所以要写完整的请求路径
            包括接口的 token 都需要我们自己手动的配置
          on-preview 预览成功的处理函数
          :on-remove 删除图片的时候
         -->
        <el-upload
          action="http://localhost:8888/api/private/v1/upload"
          :headers="uploadHeaders"
          :file-list="fileList"
          :on-success="handleUploadSuccess"
          list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-row :gutter="20" class="bbt">
          <el-col :span="20">
            <el-button size="medium" @click.prevent="$router.replace('/goods')">取消</el-button>
            <el-button type="primary" size="medium" @click.prevent="handleSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品内容">
        <el-row :gutter="20" class="bbt">
          <el-col :span="20">
            <el-button size="medium" @click.prevent="$router.replace('/goods')">取消</el-button>
            <el-button type="primary" size="medium" @click.prevent="handleSubmit">确定</el-button>
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
    <!-- /tabs标签页 -->
  </div>
</template>

<script>
import { getGoodsCategoryList, addGoods, getGoodsCategoryAttrs } from '@/api/categories'
import { getItem } from '@/utils/auth'

export default {
  name: 'addShop',
  data () {
    return {
      uploadHeaders: { // 上传组件自定义请求头
        Authorization: getItem()
      },
      fileList: [], // 图片列表
      active: 1, // 步骤条
      // form表单
      formLabelAlign: {
        goods_name: '',
        goods_price: '',
        goods_weight: '',
        goods_number: '',
        goods_cat: [],
        is_promote: ''
      },
      // checkboxGroup5: [
      //   '49吋4K超薄曲面 人工智能',
      //   '55吋4K观影曲面 30核HDR'
      // ],
      goodsCategories: [], // 所有商品分列表（树格式）
      goodsCategoryAttrs: [], // 所选择分类的参数数据
      goodsCategoryParams: [] // 商品参数
    }
  },
  created () {
    this.loadingCategories()
  },
  methods: {
    // 刷新数据
    async loadingCategories () {
      const { meta, data } = await getGoodsCategoryList()
      // console.log(data)
      if (meta.status === 200) {
        this.goodsCategories = data
      }
    },

    // 确定按钮
    async handleSubmit () {
      const {
        goods_name,
        goods_cat,
        goods_price,
        goods_number,
        goods_weight
      } = this.formLabelAlign
      // console.log(this.formLabelAlign)

      const categoryAttrs = this.goodsCategoryAttrs.map(attr => {
        return {
          attr_id: attr.attr_id,
          attr_value: attr.attr_selected_vals.join(',')
        }
      }).filter(attr => attr.attr_value.length > 0)

      // 处理商品参数
      const categoryParams = this.goodsCategoryParams.map(attr => {
        return {
          attr_id: attr.attr_id,
          attr_value: attr.attr_vals
        }
      })

      // 将商品属性和商品参数合并为一个数组提交给接口
      const attrs = [...categoryAttrs, ...categoryParams]

      // 处理商品的图片
      const pics = this.fileList.map(item => {
        const a = document.createElement('a')
        a.href = item.url
        return {
          pic: a.pathname // 图片服务端的访问路径
        }
      })

      const { meta, data } = await addGoods({
        goods_name,
        goods_cat: goods_cat.join(','),
        goods_price,
        goods_number,
        goods_weight,
        attrs,
        pics
      })
      console.log(data)
      if (meta.status === 201) {
        this.$router.replace('/goods')
        this.$message({
          type: 'success',
          message: '添加成功'
        })
      }
    },

    handleTabChange (currentTab) {
      const { label } = currentTab
      if (label === '商品参数' || label === '商品属性') {
        // 根据在第一个 tab 选中的分类 id 动态请求加载商品参数
        const { goods_cat } = this.formLabelAlign
        if (goods_cat.length === 0) {
          return this.$message({
            type: 'success',
            message: '请选择商品分类'
          })
        }
        if (label === '商品参数') {
          // 如果用户选择了商品分类，则动态就加载分类参数
          this.loadGoodsCategoryAttrs()
        } else if (label === '商品属性') {
          this.loadGoodsCategoryParams()
        }
      }
    },

    // 商品参数
    async loadGoodsCategoryAttrs () {
      this.active = 2
      const { goods_cat } = this.formLabelAlign
      const { meta, data } = await getGoodsCategoryAttrs(goods_cat[goods_cat.length - 1])
      console.log(data)
      if (meta.status === 200) {
        data.forEach(attr => {
          attr.attr_selected_vals = attr.attr_vals.split(',')
        })
        this.goodsCategoryAttrs = data
        console.log(this.goodsCategoryAttrs)
      }
    },
    // 加载商品属性
    async loadGoodsCategoryParams () {
      this.active = 3
      const { goods_cat } = this.formLabelAlign
      const { meta, data } = await getGoodsCategoryAttrs(goods_cat[goods_cat.length - 1], 'only')
      if (meta.status === 200) {
        this.goodsCategoryParams = data
      }
    },

    /**
     * 图片上传成功处理函数
     * response 是上传请求的响应结果数据 getToken
     * file 是上传的那个文件的信息对象
     * fileList 是存储文件信息的列表数据
     */
    handleUploadSuccess (response, file, fileList) {
      this.active = 4
      // console.log('response => ', response)
      // console.log('file => ', file)
      // console.log('fileList => ', fileList)
      this.fileList.push({
        name: file.name, // 接口要求名字叫 pic
        url: `http://localhost:8888/${response.data.tmp_path}`
      })
    }

  }
}
</script>

<style scoped>
.box {
  height: 100%;
}
.el-steps {
  margin-bottom: 30px;
}
.bbt {
  text-align: center;
  margin-top: 20px;
}
.attr-row {
  margin-bottom: 20px;
}
.el-checkbox {
  margin-bottom: 10px;
}
</style>
