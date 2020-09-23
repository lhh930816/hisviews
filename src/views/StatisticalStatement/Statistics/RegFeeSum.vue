<template>
        <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-header  @messageData="getData" :item='setShow'/>
                </div>
                <div class="page-main">
                    <el-table :data="tableData" v-loading='loading' border stripe size="medium" style="width: 100%" ref='table' id='out-table'>
                        <el-table-column label="操作日期" prop='czrq' :formatter="formatDate"></el-table-column>
                        <el-table-column label="收费性质" prop='fplxmc'></el-table-column>
                        <el-table-column label="总数量" prop='total'></el-table-column>
                        <el-table-column label="自费总数量" prop='privateTotal'></el-table-column>
                        <el-table-column label="医保总数量" prop='medicalTotal'></el-table-column>
                        <el-table-column label="自费未退数量" prop='privateExistTotal'></el-table-column>
                        <el-table-column label="医保未退数量" prop='medicalExistTotal'></el-table-column>
                        <el-table-column label="自费退数量" prop='privateDieTotal'></el-table-column>
                          <el-table-column label="医保退数量" prop='medicalDieTotal'></el-table-column>
                        <div slot="append" v-show='onShow'>
                            <div class="sum_footer summation" ref='sum_MZKG'>
                                <div class="sum_footer_unit left bold">当前页合计</div>
                                <div class="sum_footer_unit left bold">门诊挂号汇总</div>
                                <div class="sum_footer_unit left">{{getRegSum('total')}}</div>
                                <div class="sum_footer_unit left">{{getRegSum('privateTotal')}}</div>
                                <div class="sum_footer_unit left">{{getRegSum('medicalTotal')}}</div>
                                <div class="sum_footer_unit left">{{getRegSum('privateExistTotal')}}</div>
                                <div class="sum_footer_unit left">{{getRegSum('medicalExistTotal')}}</div>
                                <div class="sum_footer_unit left">{{getRegSum('privateDieTotal')}}</div>
                                <div class="sum_footer_unit left">{{getRegSum('medicalDieTotal')}}</div>
                            </div>
                            <div class="sum_footer" ref='sum_MZSF'>
                                <div class="sum_footer_unit left bold">当前页合计</div>
                                <div class="sum_footer_unit left bold">门诊收费汇总</div>
                                <div class="sum_footer_unit left">{{ChargeCollect('total')}}</div>
                                <div class="sum_footer_unit left">{{ChargeCollect('privateTotal')}}</div>
                                <div class="sum_footer_unit left">{{ChargeCollect('medicalTotal')}}</div>
                                <div class="sum_footer_unit left">{{ChargeCollect('privateExistTotal')}}</div>
                                <div class="sum_footer_unit left">{{ChargeCollect('medicalExistTotal')}}</div>
                                <div class="sum_footer_unit left">{{ChargeCollect('privateDieTotal')}}</div>
                                <div class="sum_footer_unit left">{{ChargeCollect('medicalDieTotal')}}</div>
                            </div>
                        </div>
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
            onShow: true,
            obj: {},
            setShow: true,
            pageShow: false,
            loading: false
        }
    },
    mounted() {
        this.adjustWidth();
        window.addEventListener('resize', this.adjustWidth.bind(this));
        if(this.tableData.length > 0) {
            this.onShow = true;
        }else {
            this.onShow = false;
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
                .post('/api/Report/RegFeeSum',this.obj)
                .then(res => {
                    this.tableData = res.items;
                    this.total = res.totalCount;
                    if(this.tableData.length > 0) {
                        this.onShow = true;
                    }else {
                        this.onShow = false;
                    }
                    setTimeout(() => {
                        this.loading = false;
                    },1 * 1000)
                }).catch(res => {
                    this.$notify({
                        title: "系统提示",
                        message: res.message,
                        type: "warning"
                    });
                });
        },
        //门诊挂号汇总
        getRegSum (name) {
            let sum = 0;
            this.tableData.map((x,i) => {
                if(x.fplxmc =="门诊挂号"){
                    sum += parseFloat(x[name]);
                }
            });
            return sum;
        },
        //门诊收费汇总
        ChargeCollect (name){
            let sums = 0;
            this.tableData.map((x,i) => {
                if(x.fplxmc =="门诊收费"){
                    sums += parseFloat(x[name]);
                }
            });
            return sums;
        },
        //table中日期格式化
        formatDate (row,column) {
            let date = row[column.property];
            if (date == null) {
                return false;
            }
            return formatDate(new Date(date), "yyyy-MM-dd");
        },
        //合计的style
        adjustWidth() {
            this.$nextTick(() => {
                if(this.$refs && this.$refs.sum_MZKG && this.$refs.sum_MZSF && this.$refs.table && this.$refs.table.$refs.headerWrapper) {
                    let width = getComputedStyle(this.$refs.table.$refs.headerWrapper.querySelector('table')).width;
                    this.$refs.sum_MZKG.style.width = width;
                    this.$refs.sum_MZSF.style.width = width;
                    this.$refs.sum_MZKG.style.overflow = "hidden";
                    this.$refs.sum_MZSF.style.overflow = "hidden";
                    Array.from(this.$refs.table.$refs.headerWrapper.querySelectorAll('col')).forEach((n, i) => {
                        if(n.getAttribute('width') != 0){
                            this.$refs.sum_MZKG.children[i].style.width = n.getAttribute('width') + 'px';
                            this.$refs.sum_MZSF.children[i].style.width = n.getAttribute('width') + 'px';
                            this.$refs.sum_MZKG.children[i].style.float = "left";
                            this.$refs.sum_MZSF.children[i].style.float = "left";
                            if(navigator.userAgent.indexOf("MSIE 9.0")>0)
                                {
                                    //ie9
                                    this.$refs.sum_MZKG.children[i].style.width = (n.getAttribute('width')-1) + 'px';
                                    this.$refs.sum_MZSF.children[i].style.width = (n.getAttribute('width')-1) + 'px';
                                }
                        }
                    });
                }
                
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
                .sum_footer.summation {
                    border-bottom: 1px solid #EBEEF5;
                }
                .sum_footer {
                    display:flex;
                    display:-webkit-flex;
                    line-height:40px;
                    color:#606266;
                    
                    .sum_footer_unit{
                        flex-grow:1;
                        -webkit-flex-grow:1;
                        text-indent:10px;
                        font-size:14px;
                        border-right: 1px solid #EBEEF5;
                    }
                    .sum_footer_unit.left{
                        text-align:left;
                    }
                    .sum_footer_unit.bold{
                        font-weight: bold;
                    }
                }     
                .el-pagination {
                    padding-top: 20px;
                }
            }
        }
    }
</style>