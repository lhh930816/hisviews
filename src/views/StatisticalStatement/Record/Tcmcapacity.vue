<template>
        <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-head @messageData='getData' :items="isHide"/>
                </div>
                <div class="page-main">
                    <el-table :data="tableData" v-loading="loading" border stripe size="medium" style="width: 100%" ref='table' id='out-table'>
                        <el-table-column label="序号" align='center' width="50px" type="index"></el-table-column>
                        <el-table-column label="机构名称" prop='jgmc' align='center'></el-table-column>
                        <el-table-column label="门诊人次" prop='mzrc' align='center'></el-table-column>
                        <el-table-column label="中医门诊人次" prop='zyrc' align='center'></el-table-column>
                        <el-table-column label="中医人次占比" prop='zyrczb' align='center'></el-table-column>
                        <el-table-column label="中医非药物治疗人次" prop='zyfywrc' align='center'></el-table-column>
                        <el-table-column label="中医非药物治疗人次占比" prop='zyfywrczb' align='center'></el-table-column>
                        <el-table-column label="门诊处方" prop='cfs' align='center'></el-table-column>
                        <el-table-column label="中成药处方" prop='zcycf' align='center'></el-table-column>
                        <el-table-column label="中成药处方金额" prop='zcycfje' align='center'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.zcycfje | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="中医理疗处方" prop='zyllcf' align='center'></el-table-column>
                        <el-table-column label="中医理疗处方金额" prop='llfcfje' align='center'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.llfcfje | rounding}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="中医处方" prop='zycf' align='center'></el-table-column>
                        <el-table-column label="中医处方占比" prop='zycfzb' align='center'></el-table-column>
                        <el-table-column label="中药饮片处方" prop='zyypcf' align='center'></el-table-column>
                        <el-table-column label="中药饮片处方占比" prop='zyypcfzb' align='center'></el-table-column>
                        <el-table-column label="中药饮片处方金额" prop='zyypcfje' align='center'>
                             <template slot-scope='scope'>
                                <span>{{scope.row.zyypcfje | rounding}}</span>
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
            isHide: true,
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
                .post('/api/Report/TCMCapacity',this.obj)
                .then(res => {
                    this.tableData = res.items;
                    this.total = res.totalCount;
                    setTimeout(() =>{
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