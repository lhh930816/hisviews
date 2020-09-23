<template>
        <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-header  :items="showDate" @messageData='getData'/>
                </div>
                <div class="page-main">
                     <line-chart :item="list" />
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { formatDate } from "@/util/moment";
import MainHeader from "@/views/StatisticalStatement/MainHeader"
import lineChart from "@/components/charts/lineChart";
export default {
    components: {
        MainHeader,
        lineChart
    },
    data() {
        return {
            tableData: [],
            list: {},
            showDate: true
        }
    },
    methods: {
        //查询
        getData(val) {
            var input = val;
            console.log(input);
            this.$http
                .post('',input)
                .then(res => {
                    this.tableData = res.items;
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
                padding: 0 20px; 
                .el-pagination {
                    padding: 20px 0;
                }
            }
        }
    }
</style>