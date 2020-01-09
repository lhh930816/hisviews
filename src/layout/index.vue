<template>
 <el-container class="app-wrapper">
    <el-container>  
         <div class="main-container">
            <!-- 内容 -->
            <app-main />
        </div>
   
   </el-container>

</el-container>  
  
</template>
<script>
import AppMain from './components/AppMain'
export default {
    components: {
        AppMain
    },
    computed: {
    }
}
</script>
<style lang="scss">
    .app-wrapper {
        background-color: #F5F6FA;
         .main-container {
            min-height: 100%;
            transition: margin-left .28s;
            position: relative;
            width: 100%;
        }
    }
</style>