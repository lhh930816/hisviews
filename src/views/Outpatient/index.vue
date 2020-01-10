<template>
    <div class="page-content-wrapper">
        <breadcrumb/>
        <div class="page-content">
            <div class="page-main">
                <div class="card-panel">
                    <div class="card-panel-description">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>门诊收入总额</span>
                                <span>总额:</span> 
                                <count-to :start-val="0" :end-val="data.amount" :duration="2600" :decimals='2' class="card-panel-num"/>
                                <span>元</span>
                            </div>
                            <div class="box-card-conter">
                                <pie-chart :item="data.items" :height='height'/>
                            </div>
                        </el-card>
                    </div>
                </div>
                <div class="card-panel">
                    <div class="card-panel-description">
                        <div class="box-card-header">
                            <p>各乡镇医院每天收入对比图</p>
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
                                <el-menu-item v-for='(v, i) in data.items' :key="i"><a href="javascript:;" target="_blank">{{v.name}}</a></el-menu-item>
                            </el-menu>
                        </div>
                        <div class="box-card-conter">
                            <line-chart :item="list"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CountTo from 'vue-count-to'
import breadcrumb from '../../components/breadcrumb'
import pieChart from '../Home/components/pieChart'
import lineChart from './lineChart'
export default {
    components: {
        CountTo,
        pieChart,
        lineChart,
        breadcrumb
    },
    data () {
        return {
            height:"260px",
            data: {  
                items:[]
            } ,
            activeIndex: '1',
            list: {}
        }
    },
    mounted () {
        //初始化
        this.getPie();
        this.getInfo();
    },
    methods: {
        //各村镇的总数据
        getPie(){
            let that = this;
            that.$http
                .post("/api/TownIncome/MonthlySummary", {
                    qid: "",
                    startDate: new Date(),
                    endDate: ""
                })
                .then(res => {
                    that.data = res;
                    that.data.items = res.items.map(item => {return {name: item.name,value: item.amount}});
                })
                .catch(res => {
                    this.$notify({
                        title: "系统提示",
                        message: res.message,
                        type: "warning"
                    });
                });
        },
        getInfo(){
            let _this = this;
            _this.$http
                .post("/api/TownIncome/DailySummary", {
                    qid: "",
                    startDate: new Date(),
                    endDate: ""
                })
                .then(res => {
                    _this.list = res.result;
                })
                .catch(res => {
                    this.$notify({
                        title: "系统提示",
                        message: res.message,
                        type: "warning"
                    });
                });
        },
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-content-wrapper {
         .el-breadcrumb {
            padding:20px 70px;
            font-size: 15px;
        }
        .page-content{
            margin:0px 40px 40px;
            background: white;
            height: 790px;
            .page-main {
                  .card-panel {
                    overflow: hidden;
                    background: white;
                    .clearfix {
                        text-align: left;
                        font-size: 18px;
                        padding-left: 20px;
                        .card-panel-num {
                            font-size: 24px;
                        }
                    }
                    .box-card-conter {
                        .chart {
                            margin: 0 auto;
                        }
                    }
                    .box-card-header {
                        overflow: hidden;
                        p {
                            float: left;
                            padding-left: 20px;
                        }
                        .el-menu {
                            float: right;
                            border-bottom: none;
                            color: #1ca3fd;
                            .el-menu-item {
                                color: #1ca3fd;
                            }
                        }
                    }
                }
            }
        }
    }
</style>