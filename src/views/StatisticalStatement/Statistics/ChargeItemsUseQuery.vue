<template>
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-header @messageData='getData'/>
                </div>
                <div class="page-main">
                    <el-table :data="tableData" v-loading="loading" border stripe size="medium" style="width: 100%" ref='table' id='out-table'>
                        <el-table-column label="收费项目名称" prop='sfxmmc'></el-table-column>
                        <el-table-column label="使用次数(单位:次)" prop='sycs'></el-table-column>
                        <el-table-column label="共计金额(单位:元)" prop='gjje'>
                              <template slot-scope='scope'>
                                <span>{{scope.row.gjje | rounding}}</span>
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
    data () {
        return {
            tableData: [],
            onShow: true,
            sycS679: "",
            gjjE679: "",
            sycsSum: "",
            gjjeSum: "",
            loading: false
        }
    },
    mounted() {
      if(this.tableData.length > 0) {
            this.onShow = true;
      }else {
          this.onShow = false;
      }
    },
    methods: {
        //查询
        getData(val) {
            this.loading = true;
            this.$http
                .post('/api/Report/ChargeItemsUseQuery',val)
                .then(res => {
                    this.sycS679 = res.sycS679;
                    this.gjjE679 = res.gjjE679.toFixed(2);
                    this.sycsSum = res.sycsSum;
                    this.gjjeSum = res.gjjeSum.toFixed(2);
                    this.tableData = res.items;
                    if(this.tableData.length > 0) {
                        this.onShow = true;
                    }else {
                        this.onShow = false;
                    }
                    this.sumData();
                     setTimeout(() => {
                        this.loading = false;
                    }, 1 * 1000)
                }).catch(res => {
                    this.$notify({
                        title: "系统提示",
                        message: res.message,
                        type: "warning"
                    });
                });
        },
        sumData () {
            let table = this.$refs.table.$refs.bodyWrapper;
            let tr = "";
            let trs = table.querySelectorAll('.el-table_tr');
            if (trs.length > 1){
               $(trs).empty();
            }
            if(this.tableData.length == 0) {
                return false;
            }
            tr +="<tr class='el-table_tr'>" + 
            "<td class=\"is-left\"><div class=\"cell\" style='font-weight: bold;'>六七九元诊疗费合计</div></td>"+
            "<td class=\"is-left\"><div class=\"cell\">" + this.sycS679 + "</div></td>"+
            "<td class=\"is-left\"><div class=\"cell\">" + this.gjjE679 + "</div></td>"+
            "</tr>"+
            "<tr class='el-table_tr'>"+
            "<td class=\"is-left\"><div class=\"cell\" style='font-weight: bold;'>一般诊疗费合计</div></td>"+
            "<td class=\"is-left\"><div class=\"cell\">" + this.sycsSum + "</div></td>"+
            "<td class=\"is-left\"><div class=\"cell\">" + this.gjjeSum + "</div></td>"+
            "</tr>";
            $(table).find("tbody").append(tr);
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
                padding: 0 20px 20px; 
                .el-pagination {
                    padding: 20px 0;
                }
            }
        }
       
    }
</style>