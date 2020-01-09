<template>
    <div class="page-content-wrapper">
        <breadcrumb/>
        <div class="page-content">
            <div class="page-main">
                <div class="card-panel">
                    <div class="card-panel-description">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>{{list.name}}</span>
                                <span>总额:</span> 
                                <count-to :start-val="0" :end-val="list.amount" :duration="2600" :decimals='2' class="card-panel-num"/>
                                <span>元</span>
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
import breadcrumb from '../../components/breadcrumb'
export default {
    components: {
        CountTo,
        breadcrumb
    },
    data() {
        return {
            list:{
                name: "东华镇",
                amount:12341.5646,
                items:[
                    {name: "医院一",amount: 2349},
                    {name: "医院二",amount: 3456},
                    {name: "医院三",amount: 2349},
                    {name: "医院四",amount: 2349},
                    {name: "医院五",amount: 2349},
                    {name: "医院六",amount: 2349},
                    {name: "医院七",amount: 2349},
                    {name: "医院八",amount: 2349},
                    {name: "医院九",amount: 2349},
                    {name: "医院十",amount: 2349}
                ]
            }
        }
    }
}
</script>
<style lang="scss" scoped>
.page-content-wrapper {
    .el-breadcrumb {
        padding: 20px 70px;
        font-size: 15px;
    }
    .page-content {
        margin: 0 40px 40px;
        background: white;
        height: 790px;
        .page-main {
            .clearfix {
                text-align: left;
                font-size: 18px;
                padding-left: 20px;
                .card-panel-num {
                    font-size: 24px;
                }
            }
        }
    }
}
</style>