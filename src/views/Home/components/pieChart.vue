<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme

export default {
    props: {
        className: {
        type: String,
        default: 'chart'
        },
        width: {
        type: String,
        default: '342px'
        },
        height: {
        type: String,
        default: ''
        },
        item: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart()
        })
    },
    watch: {
        item(val){
            this.$nextTick(() => {
                this.item = val;
                this.initChart();
            })
        }
        
    },
    beforeDestroy() {
        if (!this.chart) {
        return
        }
        this.chart.dispose()
        this.chart = null
    },
    methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')
                let total = this.item.map(item=>item.value).reduce((a,b) => a + b , 0);
                this.chart.setOption({
                    tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                    left: 'center',
                    bottom: '10',
                    data: null,
                    show: false
                    },
                    graphic:{            //echarts饼图中间放字
                        type:'text',
                        left:'center',
                        top:'45%',
                        z:2,
                    //  zlevel:10,
                        style:{
                            text:'总费用'+'\r\n\r\n'+'￥'+ total.toFixed(2),
                            textAlign:'center',
                            fill:'#000',
                        },
                    },
                    series: [
                        {
                            name: '费用',
                            type: 'pie',
                            roseType: 'radius',
                            radius: [39, 95],
                            center: ['50%', '52%'],
                            data: this.item,
                            label: {
                                normal: {
                                    show: true
                                }
                                
                            },
                            emphasis: {
                                label: {
                                    show: true
                                }
                            }
                        }
                    ]
                })
            }
    }
}
</script>
