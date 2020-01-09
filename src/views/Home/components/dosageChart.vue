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
        item:[
                {name: "感冒灵", value: 20},
                {name: "阿莫西林", value: 32},
                {name: "头孢", value: 18},
                {name: "米松", value: 21},
                {name: "顺尔宁", value: 12}
            ]
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
            color: ['#39f'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                top: 25,
                left: '2%',
                right: '2%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'value',
                show: false
            }],
            yAxis: [{
                type: 'category',
                show: true,
                axisTick: {
                    show: false
                },
                axisLine:{ //y轴
                    show:false
                },
                data: ["TOP5","TOP4","TOP3","TOP2","TOP1"]
            }],
            series: [{
                name: '用量',
                type: 'bar',
                stack: '占比',
                barWidth: '50%',
                label: {
                        show: true,
                    },
                data: this.item,
                itemStyle: {
                    normal: {
                        label: {
                            
                            show: true,
                            position: "right",
                            formatter: "{b}"
                        }
                    }
                }
            }]
        })
      }
  }
}
</script>
<style lang="scss">

</style>