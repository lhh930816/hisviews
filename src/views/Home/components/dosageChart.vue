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
      item: [],
      data: [],
      date: "",
    };
  },
  mounted() {
    this.getDosage();
    this.date= this.$store.getters.date;
  },
  watch: {
    item() {
      this.$nextTick(() => {
        this.initChart();
      });
    },
    date(val){
      this.data = [];
    }
  },
  methods: {
    //门诊药品类别占比
    getDosage() {
      this.date = this.$store.getters.date;
      let that = this;
      that.$http
        .post("/api/RegulatoryReport/GetOutpatientDrugCategoryInfo", {
          summaryDate: this.$store.getters.date,
          tenantId: 0
        })
        .then(res => {
          this.item = res.outpatientDrugCategoryDetail.map(item => {
            return {
              name: item.sfdlmc,
              value: (item.drugCategoryRatio * 100).toFixed(2)
            };
          });
          if (this.item != "") {
            for (let i = this.item.length - 1; i >= 0; i--) {
              this.data.push("TOP" + (i + 1));
            }
          }
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
        color: ["#39f"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: "{b} </br> 类别占比：{c}%"
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
            name: "类别占比",
            type: "bar",
            stack: "占比",
            barWidth: "50%",
            label: {
              show: true
            },
            data: this.item,
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "right",
                  formatter: "{b}"
                }
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style lang="scss">
</style>