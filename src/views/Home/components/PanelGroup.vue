<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item in info" :key="item.title">
      <scaleChart :item="item"></scaleChart>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
      v-for="item in items"
      :key="item.title"
    >
      <areaChart :item="item"></areaChart>
    </el-col>
  </el-row>
</template>
<script>
import scaleChart from "@/components/charts/scaleChart";
import areaChart from "@/components/charts/areaChart";
import CountTo from "vue-count-to";
export default {
  components: {
    CountTo,
    areaChart,
    scaleChart
  },
  data() {
    return {
      info: [],
      items: [],
      date: this.$store.getters.date
    };
  },
  mounted() {
    this.getOutpatient();
    this.getDrug();
    this.$nextTick(()=>{
      this.getCharge();
    })
    this.getRegistration();
  },
  methods: {
    //门诊收入汇总
    getOutpatient() {
      let that = this;
      that.$http
        .post("/api/RegulatoryReport/GetOutpatientIncomeInfo", {
          tenantId: 0,
          summaryDate: this.date
        })
        .then(res => {
          let obj = {};
          obj.title = "门诊收入总额";
          obj.sum = res.monthlyTotal;
          obj.scale = res.moy*100;
          obj.num = res.dailyTotal;
          obj.chain = res.mom*100;
          that.info.push(obj);
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
    //药品收入汇总
    getDrug() {
      let _this = this;
      _this.$http
        .post("/api/RegulatoryReport/GetDrugIncomeInfo", {
          tenantId: 0,
          summaryDate: this.date
        })
        .then(res => {
          let objs = {};
          objs.title = "药品收入总额";
          objs.sum = res.monthlyTotal;
          objs.scale = res.moy*100;
          objs.num = res.dailyTotal;
          objs.chain = res.mom*100;
          _this.info.push(objs);
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
    //挂号人数
      getRegistration () {
      this.$http
        .post("/api/RegulatoryReport/GetRegisteredNumberInfo", {
          tenantId: 0,
          summaryDate: this.date
        })
        .then(res => {
          let reg = {};
          reg.title = "挂号人数";
          reg.sum = res.peopleNumTotal;
          reg.devoteY = res.dailyPeopleNumDetail.map(item => item.peopleNumber);
          reg.devoteX = res.dailyPeopleNumDetail.map(item => item.date);
          reg.label = '日挂号量';
          reg.num = res.dailyPeopleNumTotal;
          reg.color = "#975fe4";
          reg.type = "line";
          this.items.push(reg);
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
    //收费人数
    getCharge () {
        this.$http
        .post("/api/RegulatoryReport/GetChargePeopleNumberInfo", {
          tenantId: 0,
          summaryDate: this.date
        })
        .then(res => {
          let reg = {};
          reg.title = "收费人数";
          reg.sum = res.peopleNumTotal;
          reg.devoteY = res.dailyPeopleNumDetail.map(item => item.peopleNumber);
          reg.devoteX = res.dailyPeopleNumDetail.map(item => item.date);
          reg.label = '日收费量';
          reg.num = res.dailyPeopleNumTotal;
          reg.color = "#975fe4";
          reg.type = "line";
          this.items.push(reg);
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    }
  }
};
</script>
<style lang="scss">
.el-progress {
  padding: 16.6px 0;
  .el-progress__text {
    display: none;
  }
}
</style>