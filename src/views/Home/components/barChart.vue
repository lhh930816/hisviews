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
      default: "280px"
    }
  },
  data() {
    return {
      chart: null,
      item: [0, 0, 0, 0, 0, 0],
      items: [0, 0, 0, 0, 0, 0]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getSee();
      this.initChart();
    });
  },
  methods: {
    //就诊年龄及性别占比
    getSee() {
      this.$http
        .post("/api/RegulatoryReport/GetOutpatientAgeSexRatioInfo", {
          summaryDate: this.$store.getters.date,
          tenantId: 0
        })
        .then(res => {
          let data = res.outpatientAgeSexRatioDetail;
          for (let i = 0; i < data.length; i++) {
            let index = 0;
            if (data[i].age <= 18) {
              index = 5;
            } else if (data[i].age <= 30) {
              index = 4;
            } else if (data[i].age <= 45) {
              index = 3;
            } else if (data[i].age <= 60) {
              index = 2;
            } else if (data[i].age <= 70) {
              index = 1;
            } else {
              index = 0;
            }
            if (data[i].sex == 1) {
              this.item[index] -= data[i].peopleTotal;
            } else if (data[i].sex == 2) {
              this.items[index] += data[i].peopleTotal;
            }
          }
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
        color: ["#ff66cc", "#39f"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: params => {
            if (params.length == 1) {
              return (
                params[0].name +
                "<br/>" +
                params[0].marker +
                params[0].seriesName +
                ":" +
                Math.abs(params[0].value)
              );
              return;
            }
            return (
              params[0].name +
              "<br/>" +
              params[0].marker +
              params[0].seriesName +
              ":" +
              Math.abs(params[0].value) +
              "<br/>" +
              params[1].marker +
              params[1].seriesName +
              ":" +
              Math.abs(params[1].value)
            );
          }
        },
        legend: {
          data: ["男", "女"]
        },
        grid: {
          top: 25,
          left: "2%",
          right: "2%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: function(data) {
                return Math.abs(data);
              }
            }
          }
        ],
        yAxis: [
          {
            type: "category",
            axisTick: {
              show: false
            },
            data: [
              "70岁以上",
              "61-70岁",
              "46-60岁",
              "31-45岁",
              "19-30岁",
              "0-18岁"
            ]
          }
        ],
        series: [
          {
            name: "女",
            type: "bar",
            stack: "人数",
            barWidth: "50%",
            label: {
              show: true
            },
            data: this.items
          },
          {
            name: "男",
            type: "bar",
            stack: "人数",
            barWidth: "50%",
            label: {
              normal: {
                show: true,
                formatter: function(value) {
                  return Math.abs(value.data);
                }
              }
            },
            data: this.item
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss">
</style>