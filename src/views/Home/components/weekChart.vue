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
            default: '367px'
        },
            height: {
            type: String,
            default: '220px'
        }
    },
    data() {
    return {
        chart: null,
        data: ['高血压','糖尿病','癌症','脑卒中','冠心病'],
        num:[79, 52, 200, 334, 350, 330, 260],
        weeknum:[97,32,278,369,311,326,278]
    }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
            this.getConfirmed();
    })
  },
  methods: {
      //慢性病确诊量
      getConfirmed() {
          let that = this;
          that.$http
            .post("/api/RegulatoryReport/GetOutpatientChronicDiseaseInfo",{
                summaryDate: new Date(),
                tenantId: 0
            })
            .then(res => {
                console.log(res);
            })
      },
      // 图表初始化数据
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
         this.chart.setOption({
        tooltip: {
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        },
        formatter: function (params) {
            
            if(params.length == 1){
                return params[0].name + '<br/>' + params[0].seriesName + ':' + params[0].value + '<br/>' + '同比:' + proportion + '%';
                return;
            }
            var proportion = ((params[1].value/params[0].value-1)*100).toFixed(2);
            return params[0].name + '<br/>' + '上周:' + params[0].value +'<br/>'+'本周:'+ params[1].value + '<br/>' + '同比:'+ proportion +'%';
        }
    },
    grid: {
        top: '30',
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'value',
            show: false
        }
    ],
    yAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            data: this.data
        }
    ],
    series: [
        {
            name: '确诊量',
            type: 'bar',
            label: {
                show: true,
                position: 'inside'
            },
            data: this.weeknum,
            formatter: '{c}'
        },
    ]
      })
      }
  }
}
</script>
<style lang="scss">

</style>