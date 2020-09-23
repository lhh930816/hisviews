<template>
    <el-form ref='ruleForm' :inline="true" :model='ruleForm'>
        <el-form-item prop="city" label="机构:">
            <el-select v-model="ruleForm.city" multiple filterable :disabled="disabled"> 
                <el-option v-for="(item,i) in cityData" :key="i" :label="item.cityName" :value="item.cityCode"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="county">
            <el-select v-model="ruleForm.county" filterable multiple @change="CountyChange" ref="County">
                <el-option v-for="(item,i) in countyData" :key="i" :label="item.townName" :value="item.townCode"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="village">
            <el-select v-model="ruleForm.village" multiple filterable ref="village" @change="VillageChange">
                <el-option v-for="(item,i) in villageData" :key="i" :label="item.villageName" :value="item.villageCode"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item prop="period" label="查询时间:">
            <el-date-picker
            v-model="ruleForm.period"
            type="datetimerange"
            v-show="DatetimerangeShow"
            value-format="yyyy-MM-dd HH:mm"
            format="yyyy-MM-dd HH:mm"
            :default-time = "['00:00:00','23:59:59']"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
            </el-date-picker>
                <el-date-picker
            v-model="ruleForm.dete"
            v-show="DateShow"
            type="date"
            value-format="yyyy-MM-dd"
            format="yyyy-MM-dd">
            </el-date-picker>
        </el-form-item>
        <el-form-item prop='category' label="医疗类别:" v-show="categoryShow">
            <el-select v-model="ruleForm.category" filterable>
                <el-option v-for="(item,i) in categoryData" :key="i" :label="item.name" :value="item.code"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" icon='el-icon-search' @click="onQuery">查询</el-button>
        </el-form-item>
        <el-form-item v-show='ExportShow'>
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
        },
        item: {
            type: Boolean
        },
        smit: {
            type: Boolean
        }
    },
    data () {
        return {
            ruleForm: {
                city:[],
                county: [],
                village: [],
                period: [new Date(new Date().setHours(0, 0, 0, 0)), new Date(new Date().setHours(23, 59, 59, 59))],
                dete: new Date(),
                category: ""
            },
            cityData: [],
            countyData: [],
            villageData: [],
            categoryData: [],
            DatetimerangeShow: true,
            DateShow: false,
            ExportShow: true,
            disabled: false,
            categoryShow: false
        }
    },
    mounted() {
        if(this.items) {
            this.DateShow = true;
            this.DatetimerangeShow = false;
            this.ExportShow = false;
        }
        if(this.item) {
            this.ExportShow = false;
        }
        if(this.smit) {
            this.categoryShow = true;
            this.ExportShow = false;
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
        this.updateCity();
        this.onQuery();
    },
    methods: {
        //初始化机构
        updateCity () {
            this.cityData = this.$store.state.dataStorage.linkAge;
            if(this.cityData.length == 1){
                this.ruleForm.city = [this.cityData[0].cityCode];
                this.disabled = true;
            }else {
                this.ruleForm.city = [];
            }
            this.cityData.map(x => {
                this.ruleForm.city.map(y => {
                    if (x.cityCode == y) {
                        this.countyData = x.child;
                    }
                })
            });
         
        },
        updateCountry() {
            let data = [];
            if (this.countyData.length == 1) {
                this.ruleForm.county = [this.countyData[0].townCode];
            }
            this.countyData.map(item => {
                this.ruleForm.county.map(x => {
                    if(item.townCode == x){
                        data = [...new Set(data.concat(item.child))];
                    }
                })
            });
            this.villageData = data;
        },
        CountyChange (val) {
            this.$nextTick(()=>{
                this.$refs.County.blur();
            });
            this.updateCountry();
            this.ruleForm.village = [];
        },
        VillageChange(val){
            this.$nextTick(()=>{
                this.$refs.village.blur();
            });
        },
        //查询
        onQuery() {
            let input = {};
            if(this.items) {
               input.Date = formatDate(new Date(this.ruleForm.dete),'yyyy-MM-dd');
            }else {
                this.ruleForm.period.map((x,i) => {
                    if(i == 0){
                        input.KSSJ = x;
                    }else {
                        input.JSSJ = x;
                    }
                });
            }
            let CityLen = this.ruleForm.city.length;
            let CountyLen = this.ruleForm.county.length;
            let VillageLen = this.ruleForm.village.length;
            if(CityLen > 0 && CountyLen > 0 && VillageLen > 0) {
                input.queryLevel = 4;
                input.queryCode = this.ruleForm.village;
            }else if(CityLen > 0 && CountyLen > 0 && VillageLen == 0) {
                input.queryLevel = 3;
                input.queryCode = this.ruleForm.county;
            }else if(CityLen > 0 && CountyLen == 0 && VillageLen == 0) {
                input.queryLevel = 2;
                input.queryCode = this.ruleForm.city;
            }else {
                this.$message({
                    message: '请选择机构',
                    type: 'warning'
                });
                return false;
            }
            //医疗类别
            if(this.categoryShow) {
                input.category = this.ruleForm.category;
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
<style lang="scss">
.el-form-item__content{
    line-height: 16px !important;
}
.el-range-input {
    line-height: 16px !important;
}
.el-input__inner{
    line-height: 16px !important;
}
</style>