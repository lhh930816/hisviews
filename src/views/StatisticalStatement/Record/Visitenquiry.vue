<template>
        <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-header @messageData='getData'/>
                </div>
                <div class="page-main">
                    <el-table :data="tableData" v-loading='loading' border stripe size="medium" style="width: 100%" ref='table' id='out-table'>
                        <el-table-column label="挂号日期" prop='ghrq' :formatter="formatDate" align="center"></el-table-column>
                        <el-table-column label="挂号人次" prop='ghrc' align="center"></el-table-column>
                        <el-table-column label="就诊人次" prop='jzrc' align="center"></el-table-column>
                        <el-table-column label="总收费人次" prop='zsfrc' align="center"></el-table-column>
                        <el-table-column label="收费人次" prop='sfrc' align="center"></el-table-column>
                         <el-table-column label="退费人次" prop='tfrc' align="center"></el-table-column>
                        <el-table-column label="总金额(单位:元)" prop='zje' align="center">
                            <template slot-scope='scope'>
                                <span>{{scope.row.zje | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="应付金额(单位:元)" prop='yfje' align="center">
                            <template slot-scope='scope'>
                                <span>{{scope.row.yfje | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="实付金额(单位:元)" prop='sfje' align="center">
                            <template slot-scope='scope'>
                                <span>{{scope.row.sfje | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="总收费金额(单位:元)" prop='zsfje' align="center">
                            <template slot-scope='scope'>
                                <span>{{scope.row.zsfje | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="总退费金额(单位:元)" prop='ztfje' align="center">
                            <template slot-scope='scope'>
                                <span>{{scope.row.ztfje | rounding}}</span>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        v-show="pageShow"
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
            tableData: [],
            currentPage: 1,
            pagesize: 10,
            total: 0,
            obj: {},
            pageShow: false,
            loading: false
        }
    },
    watch: {
        tableData (val) {
            if(val.length != 0){
                this.pageShow = true;
            }
        }
    },
    methods: {
        //查询
        getData(val) {
            this.loading = true,
            this.obj = val;
            this.obj.skipCount = (this.currentPage - 1) * this.pagesize;
            this.obj.maxResultCount = this.pagesize;
            this.$http
                .post('/api/Report/VisitEnquirySearch',this.obj)
                .then(res => {
                    this.tableData = res.items;
                    this.total = res.totalCount;
                    setTimeout(() => {
                        this.loading = false;
                    },1 * 1000);
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
    //金额保留二位小数
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
                padding: 0 20px 20px;
                 span {
                    float: right;
                 }
                .el-pagination {
                    padding-top: 20px;
                }
            }
        }
    }
</style>