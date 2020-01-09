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
        items:[10, 52, 200, 334, 390, 330, 220,329,183],
        date:["1-1","1-2","1-3","1-4","1-5","1-6","1-7","1-8","1-9"]
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
         color: ['#3ba1ff'],
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
            data: this.date,
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
            name: '收入',
            type: 'bar',
            barWidth: '60%',
            data: this.items
        }
    ]
      })
      }
  }
}
</script>
<style lang="scss">

</style>