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
      default: "367px"
    },
    height: {
      type: String,
      default: "220px"
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
  mounted() {
    this.$nextTick(() => {
      this.getConfirmed();
    });
  },
  methods: {
    //慢性病确诊量
    getConfirmed() {
      let that = this;
      that.$http
        .post("/api/RegulatoryReport/GetOutpatientChronicDiseaseInfo", {
          summaryDate: new Date(),
          tenantId: 0
        })
        .then(res => {
          that.data = res.outpatientChronicDiseaseDetail.map(
            item => item.chronicDiseaseMC
          );
          that.item = res.outpatientChronicDiseaseDetail.map(item => {
            return {
              value: item.chronicDiseaseQuantity,
              proportion: item.chronicDiseaseMOY
            };
          });
          that.list = res.outpatientChronicDiseaseDetail.map(
            item => item.chronicDiseaseMOY
          );
          this.initChart();
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
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
            console.log(params);
            return (
              params[0].name +
              "<br/>" +
              params[0].marker +
              params[0].seriesName +
              ":" +
              params[0].value +
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
            axisTick: {
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