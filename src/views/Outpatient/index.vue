<template>
    <div class="page-content-wrapper">
        <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="javascript:;">门诊收入额</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="page-content">
            <div class="page-main">
                <div class="card-panel">
                    <div class="card-panel-description">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>门诊收入总额</span>
                                <span>总额:</span> 
                                <count-to :start-val="0" :end-val="123456.42" :duration="2600" :decimals='0' class="card-panel-num"/>
                                <span>元</span>
                            </div>
                            <div class="box-card-conter">

                            </div>
                        </el-card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import CountTo from 'vue-count-to'

export default {
    components: {
        CountTo
    }
}
</script>
<style lang="scss" scoped>
    .page-content-wrapper {
         .el-breadcrumb {
            padding:20px 70px;
            font-size: 15px;
        }
        .page-content{
            margin:0px 40px 40px;
            background: white;
            .page-main {
                .clearfix {
                    text-align: left;
                    font-size: 18px;
                    padding-left: 20px;
                }
            }
        }
    }
</style>