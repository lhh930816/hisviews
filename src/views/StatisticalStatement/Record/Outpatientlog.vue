<template>
        <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-header @messageData='getData' :smit="categoryShow"/>
                </div>
                <div class="page-main">
                    <el-table :data="tableData" border stripe size="medium" style="width: 100%" ref='table' id='out-table'>
                        <el-table-column  type="expand">
                            <template slot-scope="props">
                                <el-table :data="tableData" border stripe size="medium" style="width: 100%" >
                                    <el-table-column label="就诊日期" :formatter="formatDate" align="center">
                                        <template>
                                             <span>{{props.row.jzrq}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="就诊日期" :formatter="formatDate" align="center">
                                        <template>
                                            <span>{{props.row.fbrq}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="初诊" align="center">
                                        <template>

                                        </template>
                                    </el-table-column>
                                    <el-table-column label="复诊" align="center">
                                        <template>
                                            
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="医生姓名" align="center">
                                        <template>
                                             <span>{{props.row.ysxm}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="血糖(mmol/L)" align="center">
                                        <template>
                                             <span>{{props.row.xt}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="体温(℃)" align="center">
                                        <template>
                                             <span>{{props.row.tw}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="心率(次/分钟)" align="center">
                                        <template>
                                             <span>{{props.row.xl}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="呼吸(次/分钟)" align="center">
                                        <template>
                                             <span>{{props.row.hx}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="血压(mmHg)" align="center">
                                        <template>

                                        </template>
                                    </el-table-column>
                                    <el-table-column label="主要症状和体征" align="center">
                                        <template>
                                             <span>{{props.row.zyzzhtz}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="初步诊断" align="center">
                                        <template>
                                             <span>{{props.row.cbzd}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="处理意见" align="center">
                                        <template>
                                             <span>{{props.row.clyj}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="医药费总额(单位:元)" align="center">
                                        <template>
                                             <span>{{props.row.yyfze}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="减免金额(单位:元)" align="center">
                                        <template>
                                             <span>{{props.row.jmze}}</span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="实交金额(单位:元)" align="center">
                                        <template>
                                             <span>{{props.row.sjje}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column align="center">
                            <template>
                                <el-button type="text">
                                    <i class="iconfont icon-xintiao"></i>
                                </el-button>
                            </template>
                        </el-table-column> -->
                        <el-table-column label="就诊日期" prop='jzrq' :formatter="formatDate" align="center"></el-table-column>
                        <el-table-column label="发病日期" prop='fbrq'  :formatter="formatDate" align="center"></el-table-column>
                        <el-table-column label="姓名" prop='xm' align="center"></el-table-column>
                        <el-table-column label="性别" prop='xb' align="center"></el-table-column>
                        <el-table-column label="年龄" prop='nl' align="center"></el-table-column>
                        <el-table-column label="合医证号" prop='kh' align="center"></el-table-column>
                        <el-table-column label="出生日期" prop='csrq' :formatter="formatDate" align="center"></el-table-column>
                        <el-table-column label="职业" prop='zy' align="center"></el-table-column>
                        <el-table-column label="详细住址" prop='lxdz' align="center"></el-table-column>
                        <el-table-column label="电话" prop='lxdh' align="center"></el-table-column>
                        <el-table-column label="初诊" align="center"></el-table-column>
                        <el-table-column label="复诊" align="center"></el-table-column>
                        <el-table-column label="主要症状和体征" prop='zyzzhtz' align="center"></el-table-column>
                        <el-table-column label="初步诊断" prop='cbzd' align="center"></el-table-column>
                        <el-table-column label="处理意见" prop='clyj' align="center"></el-table-column>
                        <el-table-column label="疫情" prop='yq' align="center"></el-table-column>
                        <el-table-column label="医药费总额(单位:元)" prop='yyfze' align="center"></el-table-column>
                        <el-table-column label="减免金额(单位:元)" prop='jmje' align="center"></el-table-column>
                        <el-table-column label="实交金额(单位:元)" prop='sjje' align="center"></el-table-column>
                    </el-table>
                    <el-pagination
                        align="right"
                        background
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-sizes="[10, 20, 30, 40,50]"
                        :page-size="pagesize"
                        layout=" prev, pager, next, sizes, jumper"
                        :total="total"
                    ></el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { formatDate } from "@/util/moment";
import MainHeader from "@/views/StatisticalStatement/MainHeader"
export default {
    components: {
        MainHeader
    },
    data() {
        return {
            categoryShow: true,
            tableData: [],
            currentPage: 1,
            pagesize: 10,
            total: 0,
            obj: {}
            
        }
    },
    methods: {
        //查询
        getData(val) {
            this.obj = val;
            this.obj.skipCount = (this.currentPage - 1) * this.pagesize;
            this.obj.maxResultCount = this.pagesize;
            this.$http
                .post('',this.obj)
                .then(res => {
                    this.tableData = res.items;
                    this.total = res.totalCount;
                }).catch(res => {
                    this.$notify({
                        title: "系统提示",
                        message: res.message,
                        type: "warning"
                    });
                });
        },
        //table中日期格式化
        formatDate (row,column) {
            let date = row[column.property];
            if (date == null) {
                return false;
            }
            return formatDate(new Date(date), "yyyy-MM-dd");
        },
          // 初始页currentPage、初始每页数据数pagesize
        handleSizeChange: function(size) {
            this.pagesize = size;
            this.getData(this.obj);
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            this.getData(this.obj);
        }
    },
    filters: {
        rounding (value) {
            return value.toFixed(2);
        }
    }
}
</script>
<style lang="scss" scoped>
    .page-content {
        padding: 20px;
        .page-content-body {
            overflow: hidden;
            background-color: white;
            .card-header {
                overflow: hidden;
                padding: 20px 0 2px 20px;
                .el-form--inline {
                    float: left;
                }
            }
            .page-main {
                padding: 0 20px;
                 span {
                    float: right;
                 }
                .el-pagination {
                    padding: 20px 0;
                }
            }
        }
    }
</style>