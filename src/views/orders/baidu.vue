<template>
  <div id="container"></div>
</template>

<script>
export default {
  name: 'baidu',
  data () {
    return {}
  },
  mounted () {
    var map = new BMap.Map("container")
    var point = new BMap.Point(116.404, 39.915)
    console.log(map)
    console.log(point)
    map.centerAndZoom(point, 15)
  },
  methods: {

  }
}
</script>

<style scoped>
#container{
  width: 100%;
  height: 300px;
}
</style>
