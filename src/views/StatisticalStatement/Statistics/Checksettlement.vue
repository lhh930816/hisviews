<template>
        <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-header @messageData='getData'/>
                </div>
                <div class="page-main">
                    <el-table :data="tableData" v-loading="loading" border stripe show-summary :summary-method="getSummaries" size="medium" style="width: 100%" ref='table' id='out-table'>
                        <el-table-column label="机构名称" prop='jgmc' align='center'></el-table-column>
                        <el-table-column label="收费性质" prop='sfxzmc' align='center'></el-table-column>
                        <el-table-column label="收票数" prop='sfbs' align='center'></el-table-column>
                        <el-table-column label="退票数" prop='tfbs' align='center'></el-table-column>
                        <el-table-column label="处方总金额" prop='cfjezj' align='center'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.cfjezj | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="退费总金额" prop='tfjezj' align='center'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.tfjezj | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="实收总金额" prop='ssjezj' align='center'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.ssjezj | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="门诊统筹" prop='mztc' align='center'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.mztc | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="自付金额(医保外自付)" prop='ybwje' align='center'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.ybwje | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="自付金额" prop='zfje' align='center'>
                             <template slot-scope='scope'>
                                <span>{{scope.row.zfje | rounding}}</span>
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
                .post('/api/Report/CheckSettlement',this.obj)
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
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];
            columns.forEach((column, index) => {
            if (index === 0) {
                sums[index] = '合计';
                return;
            }
            const values = data.map(item => Number(item[column.property]));
            if (!values.every(value => isNaN(value))) {
                sums[index] = values.reduce((prev, curr) => {
                const value = Number(curr);
                if (!isNaN(value)) {
                    return prev + curr;
                } else {
                    return prev;
                }
                }, 0);
                if(index > 3){
                    sums[index] = sums[index].toFixed(2);
                    column.align = 'is-right';
                }
            } else {
                sums[index] = '';
            }
            });
            
            return sums;
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