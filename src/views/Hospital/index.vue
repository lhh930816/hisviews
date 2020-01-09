<template>
  <div class="page-content-wrapper">
    <breadcrumb/>
    <div class="page-content">
      <div class="page-main">
        <div class="card-panel">
          <div class="card-panel-description">
            <el-card class="box-card">
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
                <swiper :options="swiperOption">
                  <swiper-slide v-for="item in list.items" :key="item.name" @click.native="selectSwiperItem(item)">
                    <el-card shadow="always">
                      <div class="swiper-slide-left">
                        <p style="margin-top:0; text-align: left;">{{item.name}}</p>
                        <p style="margin:0; text-align: left; font-size: 12px;">总占比</p>
                        <p
                          style="font-size: 24px; text-align: left; margin: 10px 0"
                        >{{((item.amount*0.1/list.amount)*100).toFixed(2)}}%</p>
                      </div>
                      <div class="swiper-slide-right">
                        <div class="swiper-slide-num">
                          <count-to
                            :start-val="0"
                            :end-val="item.amount"
                            :duration="2600"
                            :decimals="0"
                            class="card-panel-num"
                          />
                          <span>元</span>
                        </div>
                        <el-progress
                          type="circle"
                          :percentage="25"
                          :stroke-width="12"
                          :width="70"
                          :show-text="false"
                        ></el-progress>
                      </div>
                    </el-card>
                  </swiper-slide>
                </swiper>
                <div class="swiper-button-prev" slot="button-prev"></div>
                <div class="swiper-button-next" slot="button-next"></div>
              </div>
            </el-card>
          </div>
        </div>
        <el-tabs>
          <el-tab-pane :label="tenant.name +' 门诊收入额'">
            <categoryChart :items="tenant.items" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
import Swiper from "swiper";
import categoryChart from "./categoryChart";
import breadcrumb from '../../components/breadcrumb'
import "@/styles/index.scss";
export default {
  components: {
    CountTo,
    categoryChart,
    breadcrumb
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 5,
        spaceBetween: 30,
        loop: false,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      list: {
        name: "云南",
        amount: 0,
        items: []
      },
      tenant: {
        name: "云南",
        items: []
      }
    };
  },
  mounted() {
    this.getVillageList();
  },
  methods: {
    selectSwiperItem(item) {
      let that = this;
      that.$http
        .post("api/VillageIncome/IncomeDetail/IncomeDetail", {
          TenantId: item.id
        })
        .then(res => {
          that.tenant.name = item.name || "";
          that.tenant.items = res.items || [];
        });
    },
    getVillageList() {
      let that = this;
      that.$http
        .post("/api/VillageIncome/IncomeSummary/IncomeSummary", {
          TenantId: 532300250
        })
        .then(res => {
          that.list = res;

          that.selectSwiperItem(that.list.items[0]);
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
    margin: 0px 40px 40px;
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
      .swiper-container {
        .swiper-wrapper {
          .swiper-slide {
            .el-card:hover {
              background: #f2f2f2;
              cursor: pointer;
              .el-progress {
                opacity: 1 !important;
              }
            }
            .el-card {
              .box-card-conter {
                top: 25%;
              }
              .el-card__body {
                overflow: hidden;

                .swiper-slide-left {
                  float: left;
                }
                .swiper-slide-right {
                  float: right;
                  .el-progress {
                    padding: 20px 0;
                    opacity: 0.6;
                  }
                }
              }
            }
          }
        }
      }
      .el-tabs {
        background: white;
        .el-tabs__header {
          margin-left: 20px;
        }
      }
    }
  }
}
.box-card-conter {
  padding: 0 50px;
  position: relative;
  .swiper-button-next,
  .swiper-button-prev {
    outline: 0 none !important;
  }
}
</style>