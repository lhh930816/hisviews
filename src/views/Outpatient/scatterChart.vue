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
    data () {
        return {
            items: [
                { name: "医院一", amount: 2423 },
                { name: "医院二", amount: 3456 },
                { name: "医院三", amount: 5354 },
                { name: "医院四", amount: 6456 },
                { name: "医院五", amount: 7567 },
                { name: "医院六", amount: 6453 },
                { name: "医院七", amount: 5353 },
                { name: "医院八", amount: 2423 },
                { name: "医院九", amount: 7577 },
                { name: "医院十", amount: 8897 }
            ]
        }
    },
    mounted () {
        this.$nextTick(() => {
            this.initChart();
        })
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
                            return Math.sqrt(data)/2;
                        },
                    }
                ]
            })
        }
    }
}
</script>