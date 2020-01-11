<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme

export default {
  props: {
    className: { type: String, default: "chart" },
    width: { type: String, default: "342px" },
    height: { type: String, default: "" },
    data: {
      type: Object,
      default: () => ({ title: "总人数", text: "人数", unit: "人", items: [] })
    }
  },
  data() {
    return { chart: null };
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  watch: {
    data(val) {
      this.$nextTick(() => {
        this.data = val;
        this.initChart();
      });
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    /**
     * 初始化图表
     */
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      let total = (this.data.items || [])
        .map(x => x.value)
        .reduce((a, b) => a + b, 0);
      this.chart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          left: "center",
          bottom: "10",
          data: null,
          show: false
        },
        graphic: {
          //echarts饼图中间放字
          type: "text",
          left: "center",
          top: "45%",
          z: 2,
          //  zlevel:10,
          style: {
            text: this.data.title +"\r\n\r\n" + total + this.data.unit,
            textAlign: "center",
            fill: "#000"
          }
        },
        series: [
          {
            name: this.data.text,
            type: "pie",
            roseType: "radius",
            radius: [39, 95],
            center: ["50%", "52%"],
            data: this.data.items,
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
      });
    }
  }
};
</script>
