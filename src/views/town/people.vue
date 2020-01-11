<template>
  <div class="page-content-wrapper">
    <breadcrumb />
    <div class="page-content">
      <div class="page-main">
        <div class="card-panel">
          <div class="card-panel-description">
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span>{{ summary.title + '门诊挂号人数' }}:</span>
                <count-to
                  :start-val="0"
                  :end-val="summary.total"
                  :duration="2600"
                  :decimals="0"
                  class="card-panel-num"
                />
                <span>人</span>
              </div>
              <div class="box-card-conter">
                <pie-chart
                  :data="{ title: summary.data.title, text: summary.data.text, unit: unit, items: summary.items }"
                  :height="height"
                />
              </div>
            </el-card>
          </div>
        </div>
        <div class="card-panel">
          <div class="card-panel-description">
            <div class="box-card-header">
              <p>{{ detail.title }}</p>
            </div>
            <div class="box-card-conter">
              <line-chart :data="{ date: detail.date, items: detail.items }" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import breadcrumb from "@/components/breadcrumb";
import pieChart from "@/components/charts/pieChart";
import lineChart from "@/components/charts/lineChart";

export default {
  components: {
    CountTo,
    pieChart,
    lineChart,
    breadcrumb
  },
  data() {
    return {
      height: "260px",
      unit: "人",
      summary: {
        title: "门诊挂号人数",
        total: 0,
        data: { title: "总人数", text: "人数", items: [] }
      },
      detail: {
        title: "各乡镇医院每天挂号人数对比图",
        date: [],
        items: []
      }
    };
  },
  mounted() {
    this.getSummary();
  },
  methods: {
    /**
     * 获取汇总数据
     */
    getSummary() {
      let that = this;
      that.$http
        .post("/api/TownPatientNum/MonthlySummary", { type: 1 })
        .then(res => {
          that.summary.title = res.name;
          that.summary.total = res.amount;
          that.summary.items = res.items.map(x => {
            return { name: x.name, value: x.amount, id: x.tenantid };
          });
          if ((that.summary.items || []).length > 0) {
            this.getDetail(that.summary.items[0]);
          }
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning",
            position: "bottom-right"
          });
        });
    },
    /**
     * 获取明细数据
     */
    getDetail(item) {
      let that = this;
      that.$http
        .post("/api/TownPatientNum/DailySummary", { type: 1 })
        .then(res => {
          that.detail.date = res.result.date;
          that.detail.items = res.result.items.map(x => {
            return { name: x.name, data: x.data, id: x.tenantid };
          });
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning",
            position: "bottom-right"
          });
        });
    }
  }
};
</script>