<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col" v-for="item in info" :key="item.title">
      <scaleChart :item="item"></scaleChart>
    </el-col>
    <el-col
      :xs="12"
      :sm="12"
      :lg="6"
      class="card-panel-col"
      v-for="item in items"
      :key="item.title"
    >
      <areaChart :item="item"></areaChart>
    </el-col>
  </el-row>
</template>
<script>
import scaleChart from "@/components/charts/scaleChart";
import areaChart from "@/components/charts/areaChart";
import CountTo from "vue-count-to";
export default {
  components: {
    CountTo,
    areaChart,
    scaleChart
  },
  props:{
    item: {
      type: Array,
      default: []
    },
    msg: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      info: [],
      items: []
    };
  },
  watch: {
    item(val){
      this.info = val;
    },
    msg(val){
      this.items = val
    }
  }
};
</script>
<style lang="scss">
.el-progress {
  padding: 16.6px 0;
  .el-progress__text {
    display: none;
  }
}
</style>