<template>
    <div class="card-panel" @click="gotolink">
        <div class="card-panel-description">
            <div class="card-panel-text">
                {{item.title}}
            </div>
            <count-to :start-val="0" :end-val="item.sum" :duration="2600" :decimals='2' class="card-panel-num"/>元
        </div>
        <div class="card-panel-middle">
            <div class="scale">
                <span>月同比</span> <i :class="item.scale>0?'el-icon-caret-top':item.scale<0?'el-icon-caret-bottom':''"></i><count-to :start-val="0" :end-val="item.scale" :duration="2600" :decimals='2' class="card-panel-num"/><span>%</span>
            </div>
            <div class="chain">
                <span>月环比</span> <i :class="item.chain>0?'el-icon-caret-top':item.chain <0 ?'el-icon-caret-bottom':''"></i><count-to :start-val="0" :end-val="item.chain" :duration="2600" :decimals='2' class="card-panel-num"/><span>%</span>
            </div>
           
        </div>
        <div class="card-panel-bottom">
            <el-card  shadow="never">
                日均总额 <span>&yen;</span><span><count-to :start-val="0" :end-val="item.num" :duration="2600" :decimals='2' class="card-panel-num"/></span>
            </el-card>
        </div>
    </div>
</template>
<script>
import CountTo from 'vue-count-to'
export default {
    components: {
        CountTo
    },
    props: {
        item:{
            type: Object,
            default: {}
        }
    },
    data () {
        return {

        }
    },
    methods:{
        gotolink() {
            if(this.item.title =="门诊收入总额") {
                var path = '/Outpatient';
            }else {
                var path = '/Drug';
            }
            this.$router.push({
                path: path
            });
        }
    }   
}
</script>
<style lang="scss" scoped>
    .card-panel {
        .card-panel-middle {
            padding: 54px 20px 25px 20px;
            text-align: left;
            overflow: hidden;
            font-size: 14px;
            .scale {
                float: left;
            }
            .chain {
                float: right;
            }
            .el-icon-caret-top {
                color: #8fd96b;
            }
            .el-icon-caret-bottom {
                color:red;
            }
            span {
                color: #666666FF
            }
        }
    }
</style>
