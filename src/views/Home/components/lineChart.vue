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
            default: '546px'
        }
    },
    data() {
        return {
            chart: null,
            items:[10, 52, 200, 334, 390, 330, 220],
            data:["肝硬化","糖尿病","风湿性关节炎","高血压","高血脂","肾功能衰竭","贫血"],
            list: [45,67,24,79,293,94,493]
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
             grid: {
                bottom: 80
            },  
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    animation: false,
                    label: {
                        backgroundColor: '#505765'
                    }
                }
            },
            legend: {
                data:['患病人数','用药费用'],
                left: 500
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    axisLine: {onZero: false},
                    data: this.data
                }
            ],
            yAxis: [
                {
                    name: '用药费用(元)',
                    type: 'value'
                },
                {
                    name: '患病人数',
                    nameLocation: 'start',
                    type: 'value',
                    inverse: true
                }
            ],
            series: [
                {
                    name: '用药费用',
                    type: 'line',
                    animation: false,
                    areaStyle: {},
                    lineStyle: {
                        width: 1
                    },
                    markArea: {
                        silent: true
                    },
                    data: this.items
                },
                {
                    name: '患病人数',
                    type: 'line',
                    yAxisIndex: 1,
                    animation: false,
                    areaStyle: {},
                    lineStyle: {
                        width: 1
                    },
                    markArea: {
                        silent: true
                    },
                    data: this.list
                }
            ]
        })
      }
  }
}
</script>
<style lang="scss">

</style>