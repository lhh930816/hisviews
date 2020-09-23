<template>
    <el-aside
        :style="{width:sideBarWidth}"
    >
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
            router
            unique-opened
            :default-active="$route.path"
            class="el-menu-vertical-demo"
            >
            <sidebar-item v-for="menu in menus" :key="menu.title" :item="menu" />
            </el-menu>
        </el-scrollbar>
    </el-aside>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from './SidebarItem'
export default {
    components: { SidebarItem },
    computed: {
        ...mapGetters(["sidebar"]),
        sideBarWidth() {}
    },
    data () {
        return {
            menus: [
                {
                    title: "门诊一览",
                    icon: "iconfont icon-dashboard",
                    url: "/index",
                     children: []
                },
                {
                    title: "门急诊报表",
                    icon: "iconfont icon-baobiao",
                    url:'',
                    children: [
                        {
                            title:"一般诊疗费统计",
                            url: "/Statistics/ChargeItemsUseQuery"
                        },{
                            title:"就诊情况查询",
                            url: "/Record/Visitenquiry"
                        },{
                            title:"门诊挂号收费统计",
                            url: "/Statistics/RegFeeSum"
                        },
                        // {
                        //     title:"每月门诊量",
                        //     url: "/record/MonthlyOutpatient"
                        // },
                        {
                            title:"医保结算次数统计",
                            url: "/Statistics/Miaccount"
                        },
                        // {
                        //     title:"医疗机构门诊日志",
                        //     url: "/Record/Outpatientlog"
                        // },
                        {
                            title:"门诊对账统计",
                            url: "/Statistics/Checksettlement"
                        },{
                            title:"中医门诊量",
                            url: "/Record/Tcmcapacity"
                        },{
                            title:"药品消耗统计",
                            url: "/Sell/Drugusagequery"
                        },{
                            title:"卫生室收入汇总",
                            url: "/Finance/IncomeSummary"
                        }
                    ]
                }
            ]
        }
    }
}
</script>
<style lang="scss" scoped>
.el-aside {
    transition: width .28s;
    width: 210px!important;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    .el-scrollbar {
        height: 100%;
    }
}
.el-container {
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 210px;
    min-height: 100%;
    background-color: #304156;
  }

}
</style>