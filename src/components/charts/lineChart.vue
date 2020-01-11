<template>
  <div :style="{ height: height, width: width}" />
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  props: {
    width: { type: String, default: "100%" },
    height: { type: String, default: "260px" },
    data: { type: Object, default: () => ({ date: [], items: [] }) }
  },
  data() {
    return {
      chart: null,
      items: [],
      date: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch: {
    data(val) {
      this.date = val.date;
      this.items = val.items;
      this.$nextTick(() => {
        this.initChart();
      });
    }
  },
  methods: {
    /**
     * 初始化图表
     */
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      this.date = this.data.date;
      this.items = this.data.items.map(x => {
        return { name: x.name, data: x.data, type: "line" };
      });
      this.chart.setOption({
        tooltip: {
          trigger: "axis"
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
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.items
      });
    }
  }
};
</script>
<style lang="scss">
</style>