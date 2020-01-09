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
      default: "260px"
    },
    items: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chart: null,
      date: [],
      amounts: []
    };
  },
  watch: {
    items(val) {
      this.$nextTick(() => {
        this.date = val.map(x => x.date);
        this.amounts = val.map(x => x.amount);
        this.initChart();
      });
    }
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
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.date,
            axisTick: { alignWithLabel: true }
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