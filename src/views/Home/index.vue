<template>
  <div class="page-content-wrapper">
    <div class="page-content">
      <el-row>
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 24}"
          :xl="{span: 24}"
        >
          <div class="block" style="float:right;margin-bottom: 15px; margin-right: 25px;">
            <span class="demonstration">日期:</span>
            <el-date-picker v-model="date" type="month" placeholder="选择月"></el-date-picker>
          </div>
        </el-col>
      </el-row>

      <panel-group :item="info" :msg="list"/>
      <el-row :gutter="8" class="page-center">
        <el-col
          :xs="{span: 24}"
          :sm="{span: 24}"
          :md="{span: 24}"
          :lg="{span: 18}"
          :xl="{span: 18}"
        >
          <div class="card-panel">
            <div class="card-panel-description">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>慢性累计费用及人数</span>
                </div>
                <div class="box-card-conter">
                  <line-chart :item="fees"/>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}">
          <div class="card-panel">
            <div class="card-panel-description">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>疾病TOP3占比</span>
                </div>
                <div class="box-card-conter">
                  <img src="../../icons/u198.png" class="human" />
                  <div class="box-card-right">
                    <div class="box-card-text" v-for="(item, index) in items" :key="item.diseaseMC">
                      <div class="box-card-top">
                        <span
                          style="display: inline-block; width: 80px; text-align: right; margin-right: 20px;"
                        >{{(item.diseaseRatio*100).toFixed(2)}}%</span>
                        <span
                          :class="item.diseaseMOY > 0 ? 'box-card-compare':item.diseaseMOY<0?'box-card-compare-span':''"
                        >
                          {{item.diseaseMOY}}%
                          <i
                            :class="item.diseaseMOY > 0 ? 'el-icon-top':item.diseaseMOY<0?'el-icon-bottom':''"
                          ></i>
                        </span>
                        <span>同比</span>
                      </div>
                      <img v-if="index == 0" src="../../icons/u200.png" alt />
                      <img v-else-if="index == items.length-1" src="../../icons/u206.png" alt />
                      <img v-else src="../../icons/u208.png" alt style="height:1px;" />
                      <div class="box-card-bottom">
                        <span>{{item.diseaseMC}}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
          <div class="card-panel" style="margin-top: 20px;">
            <div class="card-panel-description">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>慢性病确诊量</span>
                </div>
                <div class="box-card-conter">
                  <week-chart :items="Confirmed" />
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="8" class="page-center">
        <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 9}" :xl="{span: 9}">
          <div class="card-panel">
            <div class="card-panel-description">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>就诊年龄及性别占比</span>
                </div>
                <div class="box-card-conter">
                  <bar-chart ref="see" :list="see"/>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 9}" :xl="{span: 9}">
          <div class="card-panel">
            <div class="card-panel-description">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>门诊药品类别占比</span>
                </div>
                <div class="box-card-conter">
                  <dosage-Chart ref="drug" />
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 12}" :lg="{span: 6}" :xl="{span: 6}">
          <div class="card-panel">
            <div class="card-panel-description">
              <el-card class="box-card card-main">
                <div slot="header" class="clearfix">
                  <span>各医院收入占比率</span>
                </div>
                <div class="box-card-conter">
                  <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane
                      :label="item.name"
                      :name="'tab'+(index+1)"
                      v-for="(item,index) in data"
                      :key="index"
                    >
                      <pie-chart :item="item.data" :height="height" :width="width" />
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-card>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import CountTo from "vue-count-to";
import PanelGroup from "@/views/Home/components/PanelGroup";
import weekChart from "@/views/Home/components/weekChart";
import barChart from "@/views/Home/components/barChart";
import dosageChart from "@/views/Home/components/dosageChart";
import pieChart from "@/views/Home/components/pieChart";
import lineChart from "@/views/Home/components/lineChart";
import { formatDate } from "@/util/moment.js";
export default {
  components: {
    PanelGroup,
    weekChart,
    barChart,
    dosageChart,
    pieChart,
    lineChart
  },
  data() {
    return {
      items: [],
      activeName: "tab1",
      height: "240px",
      width: "342px",
      data: [],
      date: this.$store.getters.date,
      newDate: this.$store.getters.date,
      info: [],
      list: [],
      fees:[],
      Confirmed:[],
      see:[]
    };
  },
  created() {
    this.getFun();
  },
  watch: {
    date(val) {
      let date = formatDate(new Date(val), "yyyy-MM");
      this.newDate = date;
      this.$store.commit("setDate", date);
      this.getFun();
      this.$refs.drug.getDosage();
    }
  },
  methods: {
    getFun() {
      this.getIllness();
      this.getHospitalIncome();
      this.getOutpatient();
      this.getDrug();
      this.getRegistration();
      this.getdata();
      this.getConfirmed();
      this.getSee();
      
    },
    //门诊收入汇总
    getOutpatient() {
      let that = this;
      that.$http
        .post("/api/RegulatoryReport/GetOutpatientIncomeInfo", {
          tenantId: 0,
          summaryDate: this.$store.getters.date
        })
        .then(res => {
          if(that.info.length == 2) {
            that.info = [];
          }
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
          summaryDate: this.$store.getters.date
        })
        .then(res => {
          if(_this.info.length == 2){
            _this.info = [];
          }
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
     //挂号人数,收费人数
      getRegistration () {
        this.list = [];
        this.axios.all([
          this.$http
            .post("/api/RegulatoryReport/GetRegisteredNumberInfo", {
              tenantId: 0,
              summaryDate: this.$store.getters.date
            }),
          this.$http
            .post("/api/RegulatoryReport/GetChargePeopleNumberInfo", {
              tenantId: 0,
              summaryDate: this.$store.getters.date
            })
        ]).then(this.axios.spread((res1,res2)=>{
            let reg = {};
            reg.title = "挂号人数";
            reg.sum = res1.peopleNumTotal || 0;
            reg.devoteY = (res1.dailyPeopleNumDetail||[]).map(item => item.peopleNumber);
            reg.devoteX = (res1.dailyPeopleNumDetail||[]).map(item => item.date);
            reg.label = '日均挂号量';
            reg.num = res1.dailyPeopleNumTotal || 0;
            reg.color = "#975fe4";
            reg.type = "line";
            this.list.push(reg);
            reg = {};
            reg.title = "收费人数";
            reg.sum = res2.peopleNumTotal || 0;
            reg.devoteY = (res2.dailyPeopleNumDetail||[]).map(item => item.peopleNumber);
            reg.devoteX = (res2.dailyPeopleNumDetail||[]).map(item => item.date);
            reg.label = '日均收费量';
            reg.num = res2.dailyPeopleNumTotal || 0;
            reg.color = "#975fe4";
            reg.type = "line";
            this.list.push(reg);
        })).catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
      //慢性累计费用及人数
      getdata(){
          this.$http
            .post("/api/RegulatoryReport/GetChronicDiseaseGrandTotalInfo",{
                summaryDate: this.$store.getters.date,
                tenantId: 0
            })
            .then(res => {
                this.fees = res.chronicDiseaseGrandTotalDetail;
            })
            .catch(res => {
            this.$notify({
                title: "系统提示",
                message: res.message,
                type: "warning"
             });
        });  
      },
       //慢性病确诊量
    getConfirmed() {
      this.$http
        .post("/api/RegulatoryReport/GetOutpatientChronicDiseaseInfo", {
          summaryDate: this.$store.getters.date,
          tenantId: 0
        })
        .then(res => {
          this.Confirmed = res.outpatientChronicDiseaseDetail;
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
     //就诊年龄及性别占比
    getSee() {
      this.$http
        .post("/api/RegulatoryReport/GetOutpatientAgeSexRatioInfo", {
          summaryDate: this.$store.getters.date,
          tenantId: 0
        })
        .then(res => {

          this.see = res.outpatientAgeSexRatioDetail;
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
    //疾病
    getIllness() {
      this.$http
        .post("/api/RegulatoryReport/GetOutpatientDiseaseInfo", {
          summaryDate: this.newDate,
          tenantId: 0
        })
        .then(res => {
          this.items = res.outpatientDiseaseDetail;
        })
        .catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
        });
    },
    //各医院收入占比
    getHospitalIncome() {
      this.$http
        .post("/api/RegulatoryReport/GetHospitalIncomeRatioInfo", {
          summaryDate: this.newDate,
          tenantId: 0
        })
        .then(res => {
          this.data = res.hospitalIncomeSummaryDetail.map(item => {
            return {
              name: item.tenantName,
              data: item.hospitalIncomeRatioDetail
            };
          });
          if (this.data.length != "") {
            for (let i = 0; i < this.data.length; i++) {
              this.data[i].data = this.data[i].data.map(item => {
                return { name: item.tenantName, value: item.monthlyTotal };
              });
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
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>
<style lang="scss">
.page-content-wrapper {
  .page-content {
    padding:14px 20px 40px 20px;
    .panel-group {
      margin: 0 !important;
      .card-panel-col {
        .card-panel {
          background-color: #ffffff;
          box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.06);
          border-radius: 10px;
          cursor: pointer;
          .card-panel-description {
            text-align: left;
            padding: 10px 20px 0 20px;
            .card-panel-text {
              color: #666666ff;
              margin-bottom: 6px;
            }
            .card-panel-num {
              color: #1a1a1aff;
              font-size: 30px;
            }
          }
          .card-panel-bottom {
            padding: 0 20px;
            .el-card {
              border: none;
              border-top: 1px solid #ebeef5;
              .el-card__body {
                padding: 10px 0;
                color: #666666ff;
                text-align: left;
                span {
                  color: #1a1a1aff;
                }
              }
            }
          }
        }
      }
    }
    .el-row {
      margin: 0 !important;
    }
    .page-center {
      padding-top: 40px;
      .el-col {
        padding-left: 20px !important;
        padding-right: 20px !important;
        .card-panel {
          .card-main {
            .el-card__body {
              height: 280px;
            }
          }
          .el-card {
            border-radius: 10px;
            background-color: #ffffff;
            box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.06);
            border: none;
            margin-bottom: 20px;
            .el-card__body {
              overflow: hidden;
              padding: 4px 20px;
              .el-avatar {
                float: left;
                margin-top: 6px;
              }
              .card-panel-right {
                float: left;
                padding-left: 20px;
                .card-panel-text {
                  color: #666666;
                  padding-bottom: 5px;
                }
                .card-panel-num {
                  float: left;
                  color: #1a1a1aff;
                  font-size: 26px;
                }
              }
              .box-card-conter {
                .human {
                  width: 130px;
                  float: left;
                }
                .box-card-right {
                  float: right;
                  font-size: 14px;
                  .box-card-text {
                    padding: 12px 0;
                    img {
                      width: 180px;
                      height: 6px;
                    }
                    .box-card-compare {
                      color: red;
                    }
                    .box-card-compare-span {
                      color: green;
                    }
                    .box-card-bottom {
                      text-align: right;
                      padding-right: 10px;
                      margin-top: -3px;
                      color: #000000;
                    }
                  }
                }
              }
            }
          }
          .card-panel-description {
            text-align: left;
            border-radius: 10px;
            background-color: #ffffff;
            box-shadow: 0px 6px 20px 0px rgba(0, 0, 0, 0.06);
            overflow: hidden;
            .card-panel-text {
              color: #666666;
              padding: 10px 0 0 20px;
            }
            .el-card {
              margin-bottom: 0;

              .el-card__header {
                padding: 14px 20px;
                .clearfix {
                  color: #000000;
                  font-size: 20px;
                }
              }
            }
            .card-panel-top {
              float: left;
            }
            .el-tabs__header {
              float: right;
              margin-bottom: 0;
              padding-right: 20px;
            }
            .el-tabs__content {
              clear: both;
            }
            .operationChart {
              clear: both;
            }
          }
        }
      }
    }
  }
}
</style>