<template>
    <div class="page-content-wrapper">
        <div class="page-content">
            <div class="page-content-body">
                <div class="card-header">
                    <main-header @messageData='getData' :item='setShow'/>
                </div>
                <div class="page-main">
                    <el-row :gutter="24">
                        <el-col :span="12">
                            <el-table border stripe size="medium" style="width: 100%;margin-top: 31px;" ref='letTable' id='out-table'>
                                <el-table-column label="项目" align='center'>
                                     <el-table-column>
                                    </el-table-column>
                                    <el-table-column label="名称" align='center' prop='xmmc'>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="处方数" align='center' prop='cfs'>
                                </el-table-column>
                                <el-table-column label="居民医保" align='center'>
                                    <el-table-column label="收入" align='center' prop='jmybsr'>
                                    </el-table-column>
                                </el-table-column>
                                  <el-table-column label="非居民医保" align='center'>
                                    <el-table-column label="收入" align='center' prop='fjmybsr'>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="合计" align='center'>
                                </el-table-column>
                            </el-table>
                        </el-col>
                        <el-col :span="12">
                            <span style="margin-bottom: 10px;">单位(元)</span>
                            <el-table :data="tableList" border stripe size="medium" style="width: 100%" ref='rightTable' id='out-table'>
                                <el-table-column label="项目" align='center' prop='xmmc'>
                                     <template slot-scope='scope'>
                                        <span style="float:left;">{{scope.row.xmmc}}</span>
                                    </template>
                                </el-table-column>
                                <el-table-column label="居民医保" align='center'>
                                    <el-table-column label="收入" align='center' prop='jmybsr'>
                                    <template slot-scope='scope'>
                                        <span>{{scope.row.jmybsr | rounding}}</span>
                                    </template>
                                    </el-table-column>
                                </el-table-column>
                                  <el-table-column label="非居民医保" align='center'>
                                    <el-table-column label="收入" align='center' prop='fjmybsr'>
                                        <template slot-scope='scope'>
                                            <span>{{scope.row.fjmybsr | rounding}}</span>
                                        </template>
                                    </el-table-column>
                                </el-table-column>
                                <el-table-column label="合计" align='center'>
                                    <template slot-scope='scope'>
                                        <span>{{(scope.row.jmybsr + scope.row.fjmybsr) | rounding}}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-row>
                    <el-row :gutter="16" style="margin-top: 30px; padding-bottom: 20px;">
                        <el-col :span='12'>
                             <span style="margin-bottom: 10px; float: left;">其中各个医疗类别费用如下：</span>
                            <el-table :data="costData" border stripe size="medium" style="width: 100%" ref='table' id='out-table'>
                                 <el-table-column label="医疗类别" align='center' prop='sfxzmc'></el-table-column>
                                 <el-table-column label="统筹" align='center' prop='tc'>
                                    <template slot-scope='scope'>
                                        <span>{{scope.row.tc | rounding}}</span>
                                    </template>
                                 </el-table-column>
                                 <el-table-column label="自费" align='center' prop='zf'>
                                    <template slot-scope='scope'>
                                        <span>{{scope.row.zf | rounding}}</span>
                                    </template>
                                 </el-table-column>
                                 <el-table-column label="总费用" align='center'>
                                     <template slot-scope='scope'>
                                        <span>{{(scope.row.tc + scope.row.zf) | rounding}}</span>
                                    </template>
                                 </el-table-column>
                            </el-table>
                            <div style="text-align: left; margin-top: 10px;">{{xmmc+":"+cfs}}</div>
                        </el-col>
                    </el-row>
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
            tableList:[],
            costData: [],
            xmmc:"",
            cfs: "",
            setShow: true
        }
    },
    methods: {
        //查询
        getData(val) {
            var input = val;
            this.$http
                .post('/api/Report/Income',input)
                .then(res => {
                   $(this.$refs.letTable.$refs.bodyWrapper).find("tbody").empty();
                    let yps = res.yps;
                    let fyps = res.fyps;
                    this.tableList = res.fylbs;
                    this.costData = res.sfxzs;
                    this.leftTable(yps, 1);
                    this.leftTable(fyps, 2);
            　      this.rightTable();
                    if( yps.length > 1){
                       this.$refs.letTable.$refs.emptyBlock.style.display = 'none';
                    }
                    this.xmmc = res.cfs[0].xmmc;
                    this.cfs = res.cfs[0].cfs;
                }).catch(res => {
                    this.$notify({
                        title: "系统提示",
                        message: res.message,
                        type: "warning"
                    });
                });
        },
        //左边table
        leftTable (arr,num) {
            let tables = this.$refs.letTable.$refs.bodyWrapper;
            let trs = "";
            let cfssum = 0;
            let jmybsrsum = 0;
            let fjmybsrsum = 0;
            let sum = 0;
            arr.map((item,i) => {
                trs +="<tr>";
                if (i == 0) {
                    if (num == 1) {
                         trs += "<td rowspan ='" + (arr.length + 1) + "' style='vertical-align:middle'>" +
                         "<div class=\"cell\">药品收入</div></td>";
                    }else if (num == 2) {
                        trs += "<td rowspan ='" + (arr.length + 1) + "' style='vertical-align:middle'>" +
                         "<div class=\"cell\">医疗收入</div></td>";
                    }
                }
                if (num == 0) {
                     trs += "<td colspan='2'><div class=\"cell\">" + item.xmmc + "</div></td>";
                }else {
                     trs += "<td class=\"is-center\"><div class=\"cell\">" + item.xmmc + "</div></td>";
                }
                 trs += "<td class=\"is-center\"><div class=\"cell\">" + item.cfs + "</div></td>";
                trs += "<td class=\"is-center\"><div class=\"cell\">" + (item.jmybsr).toFixed(2) + "</div></td>";
                trs += "<td class=\"is-center\"><div class=\"cell\">" + (item.fjmybsr).toFixed(2) + "</div></td>";
                trs += "<td class=\"is-center\"><div class=\"cell\">" + (item.jmybsr + item.fjmybsr).toFixed(2) + "</div></td>";
                trs += "</tr>";
                cfssum += item.cfs;
                jmybsrsum += item.jmybsr;
                fjmybsrsum += item.fjmybsr;
                sum += (item.jmybsr + item.fjmybsr);
            });
            if (num != 0){
                trs += "<td class=\"is-center\"><div class=\"cell\">小计</div></td>";
                  trs += "<td class=\"is-center\"><div class=\"cell\">" + cfssum + "</div></td>";
                trs += "<td class=\"is-center\"><div class=\"cell\">" + (jmybsrsum).toFixed(2) + "</div></td>";
                trs += "<td class=\"is-center\"><div class=\"cell\">" + (fjmybsrsum).toFixed(2) + "</div></td>";
                trs += "<td class=\"is-center\"><div class=\"cell\">" + (sum).toFixed(2) + "</div></td>";
            }
            $(tables).find('tbody').append(trs);
        },
        //右边table
        rightTable () {
            let table = this.$refs.rightTable.$refs.bodyWrapper;
            let $tr = table.querySelectorAll('.el-table_tr');
            if ($tr.length > 1){
               $($tr).empty();
            }
            let tr = "";
                tr += "<tr class=\"el-table__row el-table_tr\">" +
                "<td colspan=\"4\" style=\"height: 19px;\" ></td>" +
                "</tr>" +
                "<tr class='el-table__row el-table__row--striped el-table_tr'>" +
                "<td style=\"text-align:left;\" rowspan=\"1\" colspan=\"1\">" +
                "<div class=\"cell\">卫生负责人</div></td>" +
                "<td><div class=\"cell\"></div></td>" +
                "<td style=\"text-align:left;\" rowspan=\"1\" colspan=\"1\">" +
                "<div class=\"cell\">填报人</div></td>" +
                "<td><div class=\"cell\"></div></td>" +
                "</tr>" +
                "<tr class=\"el-table__row el-table_tr\">" +
                "<td style=\"text-align:left;\" rowspan=\"1\" colspan=\"1\">"+
                "<div class=\"cell\">填报日期</div></td>" +
                "<td colspan=\"3\" rowspan=\"1\"><div class=\"cell\"></div></td>" +
                "</tr>" +
                "<tr class='el-table__row el-table__row--striped el-table_tr'>" +
                "<td style=\"text-align:left;\" rowspan=\"1\" colspan=\"1\">" +
                "<div class=\"cell\">审核</div></td>" +
                "<td colspan=\"3\" rowspan=\"1\"><div class=\"cell\"></div></td>" +
                "</tr>" +
                "<tr class=\"el-table__row el-table_tr\">" +
                "<td style=\"text-align: left;\" rowspan=\"1\" colspan=\"1\">" +
                "<div class=\"cell\">审核日期</div></td>" +
                "<td colspan=\"3\" rowspan=\"1\"><div class=\"cell\"></div></td>" +
                "</tr>" +
                "<tr class='el-table_tr'>" +
                "<td style=\"text-align:left;\" colspan=\"4\" rowspan=\"1\">" +
                "<div class=\"cell\">注：<span style=\"display: block; height: 60px;\"></span></div></td>" +
                "</tr>";
                $(table).find("tbody").append(tr);
        },
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