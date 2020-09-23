<template>
        <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-head @messageData='getData' />
                </div>
                <div class="page-main">
                    <el-table :data="tableData" v-loading="loading" border stripe size="medium" style="width: 100%" ref='table' id='out-table'>
                        <el-table-column label="药品编码" prop='ypbm'></el-table-column>
                        <el-table-column label="药品名称" prop='xmmc' align='center'></el-table-column>
                        <el-table-column label="生产企业" prop='scqy' align='center'></el-table-column>
                        <el-table-column label="消耗总数量" prop='zsl' align='center'></el-table-column>
                        <el-table-column label="消耗总金额(单位:元)" prop='zje' align='center'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.zje | rounding}}</span>
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
import MainHead from "@/views/StatisticalStatement/MainHead"
export default {
    components: {
        MainHead
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
            if(val.length != 0) {
                this.pageShow = true;
            }
        }
    },
    methods: {
        //查询
        getData(val) {
            this.loading = true;
            this.obj = val;
            this.obj.skipCount = (this.currentPage - 1) * this.pagesize;
            this.obj.maxResultCount = this.pagesize;
            this.$http
                .post('/api/Report/DrugUsageQuery',this.obj)
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