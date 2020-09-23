<template>
    <el-form ref='ruleForm' :inline="true" :model='ruleForm'>
        <el-form-item prop="county" label="机构:">
           
            <el-select v-model="ruleForm.county" filterable @change="CountyChange">
                <el-option v-for="(item,i) in countyData" :key="i" :label="item.townName" :value="item.townCode"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="village">
            <el-select v-model="ruleForm.village" filterable>
                <el-option v-for="(item,i) in villageData" :key="i" :label="item.villageName" :value="item.villageCode"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="period" label="查询时间:">
            <el-date-picker
            v-model="ruleForm.period"
            type="datetimerange"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            :default-time = "['00:00:00','23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item prop="ypmc" label="药品名称:" v-show="isShow">
            <el-input v-model="ruleForm.ypmc" placeholder="通用名/拼音码"></el-input>
        </el-form-item>
        <el-form-item prop="production" label="生产企业:" v-show="isShow">
            <el-input v-model="ruleForm.production" placeholder="生产企业"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon='el-icon-search' @click="onQuery">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onExport" icon='el-icon-download'>导出</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
import { formatDate } from "@/util/moment";
export default {
    props: {
        items: {
            type: Boolean
        }
    },
    data () {
        return {
            ruleForm: {
                county: [],
                village: [],
                period: [new Date(new Date().setHours(0, 0, 0, 0)), new Date(new Date().setHours(23, 59, 59, 59))],
                ypmc: "",
                production: ""
            },
            countyData: [],
            villageData: [],
            isShow: true,
        }
    },
    //初始化
    mounted() {
        if(this.items){
            this.isShow = false;
        }
        var arr =[];
        this.ruleForm.period.map((x,i)=>{
            if(i == 0){
                arr.push(formatDate(new Date(x), "yyyy-MM-dd 00:00"));
            }else {
                 arr.push(formatDate(new Date(x), "yyyy-MM-dd 23:59"));
            }
            
        });
        this.ruleForm.period = arr;
        this.updateCountry();
        this.onQuery();
    },
    methods: {
           //初始化机构
        updateCountry () {
            let cityData = this.$store.state.dataStorage.linkAge;
            let data = [];
            cityData.map(x => {
                this.countyData = x.child;
            });
          
            if (this.countyData.length == 1) {
                this.ruleForm.county = this.countyData[0].townCode;
                this.onQuery();
            }
            this.countyData.map(y => {
                if (y.townCode == this.ruleForm.county) {
                    data = y.child;
                }
            });
            this.villageData = data;
        },
        CountyChange (val) {
            this.ruleForm.village = '';
            this.updateCountry();
        },
        //查询
        onQuery() {
            let input = {};
            this.ruleForm.period.map((x,i) => {
                if(i == 0){
      
                    input.KSSJ = x;
                }else {
                    input.JSSJ = x;
                }
            });
            
            let CountyLen = this.ruleForm.county.length;
            let VillageLen = this.ruleForm.village.length;
            if( this.ruleForm.county != "" && this.ruleForm.village != "") {
                input.queryLevel = 4;
                input.queryCode = [this.ruleForm.village];
            }else if( this.ruleForm.county != "" && this.ruleForm.village == "") {
                input.queryLevel = 3;
                input.queryCode = [this.ruleForm.county];
            }else {
                this.$message({
                    message: '请选择机构',
                    type: 'warning'
                });
                return false;
            }
            let name;
            this.$route.meta.map(x => {
                name = x.name;
            });
            if(name == "药品消耗统计") {
                input.scqy = this.ruleForm.ypmc;
                input.keyword = this.ruleForm.production;
            }
            this.$emit('messageData',input);
        },
        //导出
        onExport() {
            let name = ""
            this.$route.meta.map(x => {
                name = x.name;
            });
            var wb = XLSX.utils.table_to_book(document.querySelector('#out-table'));
            /* get binary string as output */
            var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' });
            try {
                FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), name + '.xlsx');
            } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
                return wbout;
        }
    }
}
</script>
<style lang="scss" scoped>
.el-date-editor {
    width: 300px;
}
</style>