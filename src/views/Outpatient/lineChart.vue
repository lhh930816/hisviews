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
    item: {
      type: Object,
      default: {}
    }
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
    watch:{
        item(val){
            this.date = val.date;
            this.items = val.items;
            this.$nextTick(() => {
                this.initChart();
            });
        }
    },
  methods: {
    // 图表初始化数据
    initChart() {
      this.chart = echarts.init(this.$el, "macarons");
      let newData = [];
        for (let i = 0; i < (this.items ||[]).length; i++) {
          let item = {
            name: this.items[i].name,
            type: "line",
            data: this.items[i].data
          };
          newData.push(item);
        }
      this.chart.setOption({
        tooltip: {
          trigger: "axis"
        },
         legend: {
          data: newData.map(item =>item.name)
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
        series: newData
      });
    }
  }
};
</script>
<style lang="scss">
</style>