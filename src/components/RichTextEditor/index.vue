<template>
  <div ref="editor" style="text-align:left"></div>
</template>

<script>
import E from 'wangeditor'
import { upload } from '@/api'

export default {
  name: 'RichTextEditor',
  data () {
    return {
      editorContent: ''
    }
  },

  /**
   * 凡是涉及到在初始化的时候需要操作 DOM 的时候，必须写到 mounted 中
   * 因为被 Vue 管理的模板只有在 mounted 挂载完成之后才可以获取到 DOM
   * 记住：只有 mounted 挂载完成之后，才可以通过 this.$refs.xxx 获取到 DOM 元素
   */
  mounted () {
    // 操作 DOM 初始化富文本编辑器  this.$refs.editor 就是编辑器容器的DOM节点
    var editor = new E(this.$refs.editor)

    // 配置服务器端地址
    editor.customConfig.uploadImgServer = ''

    editor.customConfig.customUploadImg = async (files, insert) => {
      // files 是input中选中的文件表
      // insert 是获取图片 url后插入到编辑器的方法
      const { meta, data } = await upload(files)
      if (meta.status === 200) {
        insert(`http://localhost:8888/${data.tmp_path}`)
      }
      // 上传代码返回结果之后，将图片插入到编辑器中
      // 调用该方法，生成 img 标签，src 指向传递的 imgUrl
      // imgUrl？是上传到服务器的服务端图片访问路径，一个 Web 访问路径 http://xxxx.jpg
      // insert('http://img.redocn.com/201808/20180817/20180817_3beb7f1d22ca9c33139biwRzfgXcizir.png')
    }

    // // 自定义 fileName
    // editor.customConfig.uploadFileName = 'file'

    // // 配置请求上传自定义请求头：添加 token
    // editor.customConfig.uploadImgHeaders = {
    //   Authorization: getToken()
    // }

    // 当编辑器的内容发生改变时，将数据同步到Vue中的formLabelAlign.goods_introduce里
    // 参考文档：https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6
    editor.customConfig.onchange = (html) => {
      // 这里必须是发布 update:props属性名 事件
      this.$emit('update:content', html)

      // 发布自定义事件
      // 可以传参
      // this.$emit('editor-change', html)
      // this.editorContent = html
    }

    // 创建生成
    editor.create()
  }
}
</script>
