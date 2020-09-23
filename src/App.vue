<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import getUrl from '@/util/urlGet'
export default {
  name: 'App',
  created() {
    this.getToken();
  },
  methods: {
    //获取Token
    getToken () {
      let token = getUrl.getUrlKey('access_token');
      if(token) {
        this.$store.dispatch("user/setToken", token);
        this.getLinkAge();
      }
      // this.$http
      //   .post("/api/Account/GetCurrentUserToken/GetCurrentUserToken",{
      //     level: 2,
      //     orgCode: "532301"
      //   }).then(res => {
      //      this.$store.dispatch("user/setToken", res);
      //      this.getLinkAge();
      //   }).catch(res => {
      //      this.$notify({
      //       title: "系统提示",
      //       message: res.message,
      //       type: "warning"
      //     });
      //   });
    },
    //获取三级联动
    getLinkAge () {
      this.$http
        .post("/api/Report/AuthorizedTenantQuery")
        .then(res => {
          this.$store.commit('dataStorage/setLinkAge',res.items);
        }).catch(res => {
          this.$notify({
            title: "系统提示",
            message: res.message,
            type: "warning"
          });
      });
    }
  }
}
</script>

<style>
html {
  height: 100%;
}
body{
  margin: 0;
  height: 100%;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
a {
  text-decoration: none;
}
</style>
