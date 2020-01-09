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
        color: ['#39f','#ff66cc'],
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            formatter:(params) => {
                if(params.length == 1){
                    return params[0].name +'<br/>' + params[0].marker + params[0].seriesName + ':' + Math.abs(params[0].value);
                    return;
                }
                return params[0].name + '<br/>' + params[0].marker + params[0].seriesName + ':' + Math.abs(params[0].value) + '<br/>' + params[1].marker + params[1].seriesName + ':' + Math.abs(params[1].value);
            }
        },
        legend:{
            data:['男','女']
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
             axisLabel:{
                formatter: function (data) {
                    return (Math.abs(data));
            }
        }

        }],
        yAxis: [{
            type: 'category',
            axisTick: {
                show: false
            },
            data: ["70岁以上","61-70岁","46-60岁","31-45岁","19-30岁","0-18岁"]
        }],
        series: [{
            name: '男',
            type: 'bar',
            stack: '人数',
            barWidth: '50%',
            label: {
                    show: true,
                },
            data: this.item
        },{
            name: '女',
            type: 'bar',
            stack: '人数',
            barWidth: '50%',
            label: {
                normal:{
                    show: true,
                    formatter:function (value) {
                        return (Math.abs(value.data));
                    }
                }
            },
            data: this.items
        }]
      })
      }
  }
}
</script>
<style lang="scss">

</style>