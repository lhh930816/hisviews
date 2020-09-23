<template>
 <el-container class="app-wrapper">
    <!-- 侧边导航 -->
    <Sidebar/>
    <el-container :class="classObj" class="is-vertical">  
            <!-- 内容 -->
            <app-main />
   
   </el-container>

</el-container>  
  
</template>
<script>
import AppMain from './components/AppMain'
import Sidebar from '@/layout/components/Sidebar/Sidebar'
import { mapState } from 'vuex'
export default {
    components: {
        AppMain,
        Sidebar
    },
    computed: {
         ...mapState({
            sidebar: state => state.app.sidebar
        }),
        classObj() {
            return {
                hideSidebar: !this.sidebar.opened,
                openSidebar: this.sidebar.opened,
                withoutAnimation: this.sidebar.withoutAnimation,
            }
        }
    }
}
</script>
<style lang="scss">
    .app-wrapper {
        background-color: #F5F6FA;
        min-height: 100%;
        .is-vertical.el-container {
            min-height: 100%;
            transition: margin-left 0.28s;
            position: relative;
            margin-left: 210px;
            width: 1692px;
            .app-main {
                min-height: calc(100vh - 60px);
                width: 100%;
                position: relative;
                overflow: hidden;
            }
        }
    }
</style>