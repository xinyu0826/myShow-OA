<template>
  <div>
    <el-row>
      <el-col :span="24">
        <span>数据统计</span>
      </el-col>
    </el-row>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="饼状" name="first">
        <div id="first" style="width: 600px;height:400px;"></div>
      </el-tab-pane>
      <el-tab-pane label="柱状" name="second">
        <div id="second" style="width: 600px;height:400px;"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import echarts from 'echarts'
import axios from 'axios'

export default {
  name: 'reports',
  data () {
    return {
      activeName: 'second',
      myChartsecond: null // 异步
    }
  },
  mounted () {
    // 饼状  基于准备好的dom，初始化echarts实例
    var myChartfirst = echarts.init(document.getElementById('first'))
    myChartfirst.setOption({
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius: '55%',
                data:[
                    {value:235, name:'视频广告'},
                    {value:274, name:'联盟广告'},
                    {value:310, name:'邮件营销'},
                    {value:335, name:'直接访问'},
                    {value:400, name:'搜索引擎'}
                ]
            }
        ]
    })

    // 柱状
    // var myChartsecond = echarts.init(document.getElementById('second'))

    // myChartsecond.setOption({
    //     title: {
    //         text: 'ECharts 入门示例'
    //     },
    //     tooltip: {},
    //     xAxis: {
    //         data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    //     },
    //     yAxis: {},
    //     series: [{
    //         name: '销量',
    //         type: 'bar',
    //         data: [5, 20, 36, 10, 10, 20]
    //     }]
    // })

    this.myChartsecond = echarts.init(document.getElementById('second'))
    this.myChartsecond.setOption({
        title: {
            text: '异步数据加载示例'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
            data: []
        },
        yAxis: {},
        series: [{
            name: '销量',
            type: 'bar',
            data: []
        }]
    })
    this.myChartfirst()
  },

  methods: {
    async myChartfirst () {
      const { data } = await axios({
        method: 'GET',
        url: 'http://localhost:8080/data.json' // 这里直接请求的是 localhost:8080/data.json，服务器直接读取 json 文件并返回，测试使用
      })
      // 填入数据
      this.myChartsecond.setOption({
        xAxis: {
          data: data.categories
        },
        series: [{
          // 根据名字对应到相应的系列
          name: '销量',
          data: data.data
        }]
      })
    },

    // 饼状

    handleClick(tab, event) {

      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
.el-row {
  background-color: #e5e9f2;
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  box-sizing: border-box;
}
</style>
