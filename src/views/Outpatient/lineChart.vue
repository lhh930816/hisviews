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
        items:[
            {name: "吕合",data:[1233,4424,5433,6435,2342,3425,5634,6463,5353]},
            {name: "中屯", data:[3123,1324,6464,2344,6454,3453,2434,2644,2424]},
            {name: "白土", data:[4234,5454,4565,3454,5343,5353,2134,1324,9053]},
            {name: "回龙", data:[5433,2344,3534,3532,5345,3534,5326,9538,7272]},
            {name: "斗阁", data:[5432,5433,2432,4234,6454,2434,3458,1233,2423]},
            {name: "红武", data:[1321,6534,3454,5422,6454,5345,8646,1323,2345]},
            {name: "干田", data:[3234,2434,5343,4325,5345,3432,7456,2467,8974]}
        ],
        date:["1-1","1-2","1-3","1-4","1-5","1-6","1-7","1-8","1-9"]
    }
    },
    mounted() {
        this.$nextTick(() => {
            this.initChart();
    })
  },
  methods: {
      // 图表初始化数据
      initChart() {
        this.chart = echarts.init(this.$el, 'macarons');
        let newData =[];
        if(this.items.length > 1){
            for (let i = 0; i<this.items.length; i++) {
                let item = {
                    name: this.items[i].name,
                    type: 'line',
                    data: this.items[i].data
                };
                newData.push(item);
            }
        };
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
                    data: this.date,
                    boundaryGap: false
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: newData
        })
      }
  }
}
</script>
<style lang="scss">

</style>