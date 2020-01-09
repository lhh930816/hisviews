<template>
  <div :style="{height:Height,width:Width}"/>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {

    props: {
        Width: {
            type: String,
            default: '100%'
        },
        Height: {
            type: String,
            default: '260px'
        }
    },
    data() {
    return {
        chart: null,
        item:[20,45,32,18,49,69],
        items:[-23,-53,-63,-19,-70,-30]
    }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()

    })
  },
  methods: {
      // 图表初始化数据
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
        this.chart.setOption({
         color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
        }
    ]
      })
      }
  }
}
</script>
<style lang="scss">

</style>