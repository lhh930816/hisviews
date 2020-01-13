<template>
  <div class="page-content-wrapper">
    <breadcrumb />
    <div class="page-content">
      <div class="page-main">
        <div class="card-panel">
          <div class="card-panel-description">
            <el-card class="box-card" shadow="never">
              <div slot="header" class="clearfix">
                <span>{{list.name}}</span>
                <span>总额:</span>
                <count-to
                  :start-val="0"
                  :end-val="list.amount"
                  :duration="2600"
                  :decimals="2"
                  class="card-panel-num"
                />
                <span>元</span>
              </div>
              <div class="box-card-conter">
                <categoryChart :items="list.items" />
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import CountTo from "vue-count-to";
import breadcrumb from "@/components/breadcrumb";
import scatterChart from "@/views/Outpatient/scatterChart";
import categoryChart from "@/views/Hospital/categoryChart";
import "@/styles/index.scss";
export default {
  components: {
    CountTo,
    breadcrumb,
    scatterChart,
    categoryChart
  },
  data() {
    return {
      list: {
        name: "",
        amount: 0,
        items: []
      },
      data: [],
    };
  },
  mounted() {
   this.getData();
  },
  methods: {
    //各村医院月入额
    getData() {
      this.$http
        .post("/api/VillageIncome/IncomeSummary", {
          tenantId: this.$route.query.id || 0,
          startDate: this.$store.getters.date,
           endDate: ""
        })
        .then(res => {
          this.list = res;
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
<style lang="scss" scoped>
.page-content-wrapper {
  .el-breadcrumb {
    padding: 20px 70px;
    font-size: 15px;
  }
  .page-content {
    margin: 0 40px 40px;
    background: white;
    height: 790px;
    .page-main {
      .clearfix {
        text-align: left;
        font-size: 18px;
        padding-left: 20px;
        .card-panel-num {
          font-size: 24px;
        }
      }
      .el-tabs {
        background: white;
      }
    }
  }
}
</style>