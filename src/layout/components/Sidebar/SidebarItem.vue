<template>
  <div v-if="item.children">
    <template  v-if="item.children.length == 0">
        <el-menu-item :key="item.title" :index="item.url">
            <i v-if="item.icon && item.icon.length > 0" :class="item.icon"></i>
            <span slot="title">{{item.title}}</span>
        </el-menu-item>
    </template>
    <el-submenu v-else :index="item.url">
      <template slot="title" >
        <i v-if="item.icon && item.icon.length > 0" :class="item.icon"></i>
        <span slot="title" style="font-size: 14px;">{{item.title}}</span>
      </template>
      <template v-for="child in item.children">
        <sidebar-item
          v-if="child.children&&child.children.length>0"
          :item="child"
          :key="child.title"/>
        <el-menu-item v-else :key="child.title" :index="child.url">
          <span slot="title">{{child.title}}</span>
        </el-menu-item>
      </template>
    </el-submenu>
  </div>
</template>
<script>
import sidebar from '@/styles/sidebar.scss'
export default {
  name: 'SidebarItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>
<style lang="scss" scoped>
.el-menu {
    border-right: none;
    background-color: #304156;
    height: 100%;
    .el-menu-item {
        color:  rgb(191, 203, 217);
        background-color: rgb(48, 65, 86);
        font-size: 14px;
        text-align: left;
        i {
            color:  rgb(191, 203, 217);
        }
    }
    .el-menu-item.is-active {
        color: rgb(64, 158, 255);
        background-color: rgb(48, 65, 86);
        i {
            color:  rgb(64, 158, 255);
        }
    }
    .el-menu-item:hover {
        background-color: #263445!important;
    }
    .el-submenu__title {
        color:  rgb(191, 203, 217);
        background-color: rgb(48, 65, 86);
        font-size: 14px;
    }
}
</style>