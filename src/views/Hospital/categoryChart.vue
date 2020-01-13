<template>
  <div :style="{height:Height,width:Width}" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

export default {
  props: {
    Width: {
      type: String,
      default: "100%"
    },
    Height: {
      type: String,
      default: "500px"
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
      amounts: []
    };
  },
  watch: {
    items(val) {
      this.data = val.map(item => item.name);
      this.amounts = val.map(x => x.amount);
      this.$nextTick(() => {
        this.initChart();
      });
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  methods: {
    // 图表初始化数据
    initChart() {
       
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        color: ["#3ba1ff"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "15%",
          containLabel: true
        },
          dataZoom: [{
              type: 'inside'
          }, {
              type: 'slider'
          }],
        xAxis: [
          {
            type: "category",
            data: this.data,
            axisTick: { alignWithLabel: true },
            axisLabel: {interval:0,rotate:50 }
          }
        ],
        yAxis: [{ type: "value" }],
        series: [
          {
            name: "金额",
            type: "bar",
            barWidth: "60%",
            data: this.amounts
          }
        ]
      });
    }
  }
};
</script>