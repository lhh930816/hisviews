<template></template>
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <el-form ref='ruleForm' :inline="true" :model='ruleForm'>
                        <el-form-item prop="period" label="时间:">
                            <el-date-picker
                            v-model="ruleForm.period"
                            type="datetimerange"
                            value-format="yyyy-MM-dd HH:mm"
                            format="yyyy-MM-dd HH:mm"
                            :default-time = "['00:00:00','23:59:59']"
                            range-separator="至"
                            start-placeholder="开始日期"
                            @change="chooseTimeRange"
                            end-placeholder="结束日期">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item prop="collector" label="收费员:">
                            <el-select v-model="ruleForm.collector" placeholder="收费员">
                                <el-option v-for="(item,i) in DataList" :key="i" :label="item.text" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" icon='el-icon-search' @click="onQuery">查询</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="onExport">导出</el-button>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="page-main">
                    <el-table :data="tableData" border stripe size="medium" style="width: 100%">
                        <el-table-column label="就诊号" prop='JZH'></el-table-column>
                        <el-table-column label="收费单号" prop='SFDH'></el-table-column>
                        <el-table-column label="制单日期" prop='ZDRQ'></el-table-column>
                        <el-table-column label="患者姓名" prop='HZXM'></el-table-column>
                        <el-table-column label="性别" prop='XB'></el-table-column>
                        <el-table-column label="年龄" prop='NL'></el-table-column>
                        <el-table-column label="收费状态" prop='TFBZ'></el-table-column>
                        <el-table-column label="建档立卡" prop='JDLK'></el-table-column>
                        <el-table-column label="收费金额(单位:元)" prop='SFJE'></el-table-column>
                        <el-table-column label="药品金额(单位:元)" prop='YPJE'></el-table-column>
                        <el-table-column label="发票印刷号" prop='YSH'></el-table-column>
                        <el-table-column label="统筹部分(单位:元)" prop='TCBF'></el-table-column>
                        <el-table-column label="医保个人账户支付(单位:元)" prop='GRZHZF'></el-table-column>
                        <el-table-column label="院内减免(单位:元)" prop='YNJM'></el-table-column>
                        <el-table-column label="优惠金额(单位:元)" prop='YHJE'></el-table-column>
                        <el-table-column label="医保个人自付总额(单位:元)" prop='GRZFZE'></el-table-column>
                        <el-table-column label="医保个人自付非现金(单位:元)" prop='GRZFFXJ'></el-table-column>
                        <el-table-column label="应收现金(单位:元)" prop='YSXJ'></el-table-column>
                        <el-table-column label="实收现金(单位:元)" prop='SSXJ'></el-table-column>
                        <el-table-column label="舍入费(单位:元)" prop='SRF'></el-table-column>
                        <el-table-column label="科室" prop='KS'></el-table-column>
                        <el-table-column label="医生" prop='YS'></el-table-column>
                        <el-table-column label="西药费(单位:元)" prop='XYF'></el-table-column>
                        <el-table-column label="中草药费(单位:元)" prop='ZCaoYF'></el-table-column>
                        <el-table-column label="中成药费(单位:元)" prop='ZChengYF'></el-table-column>
                        <el-table-column label="非药品费(单位:元)" prop='QTFY'></el-table-column>
                        <el-table-column label="制单人" prop='ZDR'></el-table-column>
                        <el-table-column label="收费员" prop='YSXJ'></el-table-column>
                        <el-table-column label="结算日期" prop='JSRQ'></el-table-column>
                        <el-table-column label="医保类型" prop='YBLX'></el-table-column>
                        <el-table-column label="医保卡号" prop='YBKH'></el-table-column>
                        <el-table-column label="个人编号" prop='GRBH'></el-table-column>
                        <el-table-column label="隔天退费标志" prop='GTTF'></el-table-column>
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
                        :total="tableData.length"
                    ></el-pagination>
                </div>
              
            </div>
        </div>
    </div>
</template>
<script>
import { formatDate } from "@/util/moment";
export default {
    data () {
        return {
            ruleForm: {
                period: [new Date(new Date().setHours(0, 0, 0, 0)), new Date(new Date().setHours(23, 59, 59, 59))],
                collector: "",
                startTime: "",
                endTime: ""
            },
            DataList: [],
            tableData: [],
            currentPage: 1,
            pagesize: 10
        }
    },
    mounted() {
        this.onQuery();
    },
    methods: {
        //时间
        chooseTimeRange (val) {
            console.log(val);
            this.ruleForm.startTime = val[0];
            this.ruleForm.endTime = val[1];
        },
        //查询
        onQuery() {
            let input = {
                KSSJ: this.ruleForm.startTime,
                JSSJ: this.ruleForm.endTime,
                RYID: this.ruleForm.collector,
                skipCount: (this.currentPage - 1) * this.pagesize,
                maxResultCount: this.pagesize
            };
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
        //导出
        onExport() {
            
        },
         // 初始页currentPage、初始每页数据数pagesize
        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
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
                .el-pagination {
                    padding: 20px 0;
                }
            }
        }
       
    }
</style>