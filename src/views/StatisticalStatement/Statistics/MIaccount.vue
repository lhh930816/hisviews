<template>
        <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-header @messageData='getData' :item='setShow'/>
                </div>
                <div class="page-main">
                    <el-table :data="tableData" v-loading="loading" border stripe size="medium" style="width: 100%" ref='table' id='out-table'>
                        <el-table-column label="序号" type='index' width="50px"></el-table-column>
                        <el-table-column label="医保挂号" prop='ybgh'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.ybgh}}次</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="医保收费" prop='ybsf'>
                            <template slot-scope='scope'>
                                <span>{{scope.row.ybsf}}次</span>
                            </template>
                        </el-table-column>
                    </el-table>
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
            showDate: true,
            setShow: true,
            loading: false
        }
    },
    methods: {
        //查询
        getData(val) {
            this.loading = true;
            var input = val;
            this.$http
                .post('/api/Report/MiAccountStatistic',input)
                .then(res => {
                    this.tableData = [];
                    this.tableData.push(res);
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
    },
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
            }
        }
    }
</style>