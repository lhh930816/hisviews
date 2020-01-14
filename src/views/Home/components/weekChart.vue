<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  props: {
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "220px"
    },
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chart: null,
      data: [],
      item: [],
      list: []
    };
  },
  //监听items的数据变化
  watch:{
    items(val) {
      this.data = val.map(
            item => item.chronicDiseaseMC
          );
          this.item = val.map(item => {
            return {
              value: item.chronicDiseaseQuantity,
              proportion: item.chronicDiseaseMOY
            };
          });
          this.list = val.map(
            item => item.chronicDiseaseMOY
          );
          this.initChart();
    }
  },
  methods: {
    // 图表初始化数据
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            return (
              params[0].name +
              "<br/>" +
              params[0].marker +
              params[0].seriesName +
              ":" +
              params[0].value +"人"+
              "<br/>" +
              "同比:" +
              params[0].data.proportion +
              "%"
            );
          }
        },
        grid: {
          top: "30",
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            show: false
          }
        ],
        yAxis: [
          {
            type: "category",
            show: true,
            axisTick: {
              show: false
            },
            axisLine: {
              //y轴
              show: false
            },
            data: this.data
          }
        ],
        series: [
          {
            name: "确诊量",
            type: "bar",
            label: {
              show: true,
              position: "inside"
            },
            data: this.item,
            formatter: "{c}"
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss">
</style>