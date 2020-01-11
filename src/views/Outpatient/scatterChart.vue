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
        },
        items: {
            type: Array,
            default: []
        }
    },
    watch: {
        items() {
            this.$nextTick(() => {
                this.initChart();
            })
        }
    },
    methods: {
        //图表初始化数据
        initChart () {
            this.chart = echarts.init(this.$el, 'macarons');
            let arr = this.items.map(item => item.name);
            let data = this.items.map(item => item.amount);
            this.chart.setOption({
                tooltip: {
                    trigger: 'axis'
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
                        data: arr,
                        boundaryGap: false
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series:[
                    {
                        name: '金额',
                        type: 'scatter',
                        data: data,
                         symbolSize: function (data) {
                            return Math.sqrt(data)/6;
                        },
                    }
                ]
            })
        }
    }
}
</script>