<template>
    <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item in info" :key="item.title">
            <scaleChart :item='item'></scaleChart>
        </el-col>
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item in items" :key="item.title">
            <areaChart :item="item"></areaChart>
        </el-col>
      
    </el-row>
</template>
<script>
import scaleChart from '@/components/charts/scaleChart'
import areaChart from '@/components/charts/areaChart'
import CountTo from 'vue-count-to'
export default {
    components: {
        CountTo,
        areaChart,
        scaleChart
    },
    data(){
        return {
             info: [
                {
                    title: "门诊收入总额",
                    sum: 126565,
                    label: "当日总额",
                    scale: 12,
                    num: 12423,
                    chain: 11
                },
                {
                    title: "药品收入总额",
                    sum: 126565,
                    label: "当日总额",
                    scale: 18,
                    num: 12423,
                    chain: -11
                },
            ], 
            items:[
                {
                    title:"挂号人数",
                    sum: 13432,
                    devoteY:[10,52,22,46,12],         
                    devoteX:['2019-12-10','2019-12-11','2019-12-12','2019-12-13','2019-12-14'],
                    label: "日挂号量",
                    num: 120,
                    color:"#975fe4",
                    type: "line"
                },
                {
                    title:"重大疾病人数",
                    sum: 543,
                    devoteY:[5,40,18,26,12],         
                    devoteX:['2019-12-10','2019-12-11','2019-12-12','2019-12-13','2019-12-14'],
                    label: "日诊断量",
                    num: 10,
                    color: "#975fe4",
                    type: "line"
                }
            ]
        }

    }
}
</script>
<style lang="scss">
  .el-progress {
      padding: 16.6px 0;
      .el-progress__text {
          display: none;
      }
  }
</style>