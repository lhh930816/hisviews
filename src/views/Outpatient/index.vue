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
                                <count-to :start-val="0" :end-val="total" :duration="2600" :decimals='0' class="card-panel-num"/>
                                <span>元</span>
                            </div>
                            <div class="box-card-conter">
                                <pie-chart :item="data"/>
                            </div>
                        </el-card>
                    </div>
                </div>
                <div class="card-panel">
                    <div class="card-panel-description">
                        <div class="box-card-header">
                            <p>各乡镇医院每天收入对比图</p>
                            <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" >
                                <el-menu-item v-for='(v, i) in data' :key="i"><a href="https://www.ele.me" target="_blank">{{v.name}}</a></el-menu-item>
                            </el-menu>
                        </div>
                        <div class="box-card-conter">
                            <line-chart/>
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
            data:  [
                { value: 3482, name: '吕合' },
                { value: 4392, name: '中屯' },
                { value: 4720, name: '白土' },
                { value: 5799, name: '回龙' },
                { value: 4249, name: '斗阁' },
                { value: 2478, name: '红武' },
                { value: 4726, name: '干田' }
            ],
            total:0,
            activeIndex: '1',
        }
    },
    mounted () {
        this.total = this.data.map(item => item.value).reduce((a,b) => a + b , 0);
    },
    methods: {
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