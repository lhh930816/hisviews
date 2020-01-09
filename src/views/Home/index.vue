<template>
    <div class="page-content-wrapper">
        <div class="page-content">
            <panel-group />
             <el-row :gutter="8" class="page-center">
                 <el-col :xs="{span: 24}" :sm="{span: 24}" :md="{span: 24}" :lg="{span: 18}" :xl="{span: 18}">
                   <div class="card-panel">
                        <div class="card-panel-description">
                            <el-card class="box-card">
                                <div slot="header" class="clearfix">
                                    <span>各医院门诊挂号人数实时情况    </span>
                                </div>
                                <div class="box-card-conter">
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
                                  <img src="../../icons/u198.png" class="human">
                                  <div class="box-card-right">
                                    <div class="box-card-text" v-for="(item, index) in items" :key='item.name'>
                                        <div class="box-card-top">
                                            <span style="display: inline-block; width: 80px; text-align: right; margin-right: 20px;">{{item.scale}}%</span>
                                            <span :class="item.compare > 1 ? 'box-card-compare':'box-card-compare-span'">{{item.compare}}%<i :class="item.compare > 1 ? 'el-icon-top':'el-icon-bottom'"></i></span> 
                                            <span>同比</span> 
                                        </div>
                                        <img v-if="index == 0" src="../../icons/u200.png" alt="">
                                        <img v-else-if="index == items.length-1" src="../../icons/u206.png" alt="">
                                        <img v-else src="../../icons/u208.png" alt="" style="height:1px;">
                                        <div class="box-card-bottom">
                                            <span>{{item.name}}</span>
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
                                     <week-chart />
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
                                    <bar-chart/>
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
                                    <span>门诊药品用量占比</span>
                                </div>
                                <div class="box-card-conter">
                                    <dosage-Chart />
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
                                    <span>各医院收入占比率</span>
                                </div>
                                <div class="box-card-conter">
                                <el-tabs v-model="activeName" @tab-click="handleClick">
                                    <el-tab-pane label="乡镇一" name="first">
                                        <pie-chart :item="list"/>
                                    </el-tab-pane>
                                    <el-tab-pane label="乡镇二" name="second">
                                         <pie-chart :item="data"/>
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
import CountTo from 'vue-count-to'
import PanelGroup from './components/PanelGroup'
import weekChart from './components/weekChart'
import barChart from './components/barChart'
import dosageChart from './components/dosageChart'
import pieChart from './components/pieChart'
export default {
    components: {
        PanelGroup,
        weekChart,
        barChart,
        dosageChart,
        pieChart
    },
    data () {
        return {
            items: [
                {name:'肺炎',scale:"25",compare:"1.5"},
                {name:'过敏性鼻炎',scale:"20",compare:"-1.2"},
                {name:'哮喘',scale:"15",compare:"2.3"},
                {name:'扁桃体发炎',scale:"10",compare:"3.8"}
            ],
            activeName: 'first',
            list:  [
                { value: 4580, name: '东华' },
                { value: 3490, name: '莲华' },
                { value: 4503, name: '新柳' },
                { value: 3789, name: '本东' },
                { value: 4284, name: '朵基' },
                { value: 4873, name: '红墙' },
                { value: 3594, name: '达苴' }
            ],
            data:  [
                { value: 3482, name: '吕合' },
                { value: 4392, name: '中屯' },
                { value: 4720, name: '白土' },
                { value: 5799, name: '回龙' },
                { value: 4249, name: '斗阁' },
                { value: 2478, name: '红武' },
                { value: 4726, name: '干田' }
            ]
        }
    },
    methods:{
        handleClick(tab, event) {
            console.log(tab, event);
        }
    }
}
</script>
<style lang="scss">
      .page-content-wrapper {
        .page-content {
            padding: 40px 20px;
              .panel-group {
                margin:0 !important;
                .card-panel-col {
                    .card-panel {
                        background-color: #ffffff;
                        box-shadow:0px 6px 20px 0px rgba(0,0,0,0.06);
                        border-radius:10px;
                        .card-panel-description {
                            text-align: left;
                            padding: 10px 20px 0 20px;
                            .card-panel-text {
                                color: #666666FF;
                                margin-bottom: 6px;
                            }
                            .card-panel-num {
                                color: #1A1A1AFF;
                                font-size: 30px;
                            }
                          
                        }
                        .card-panel-bottom {
                            padding: 0 20px;
                            .el-card {
                                border:none;
                                border-top: 1px solid #EBEEF5;
                                .el-card__body {
                                    padding: 10px 0;
                                    color: #666666FF;
                                    text-align: left;
                                    span {
                                        color: #1A1A1AFF;
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
                        .el-card {
                            border-radius:10px;
                            background-color: #ffffff;
                            box-shadow:0px 6px 20px 0px rgba(0,0,0,0.06);
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
                                        color: #1A1A1AFF;
                                        font-size: 26px;
                                    }
                                }
                                .box-card-conter {
                                    .human {
                                        width: 130px;
                                        float: left;
                                    }
                                    .box-card-right {
                                        float: left;
                                        font-size: 14px;
                                        .box-card-text {
                                            padding: 5px 0;
                                            img {
                                                width: 200px;
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
                            border-radius:10px;
                            background-color: #ffffff;
                            box-shadow:0px 6px 20px 0px rgba(0,0,0,0.06);
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