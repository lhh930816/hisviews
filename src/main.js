// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import Vuex from 'vuex'
import store from './store'
import echarts from 'echarts'
import vueSwiper from 'vue-awesome-swiper'
import VCharts from 'v-charts'
import 'swiper/css/swiper.css'
import moment from 'moment'
import http from '@/kits/http'
import axios from 'axios'
import './assets/iconfont/iconfont.css'


moment.locale('zh-cn')
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = http
Vue.prototype.axios = axios
Vue.prototype.$moment = moment
Vue.use(VCharts)
Vue.use(Vuex)
Vue.use(vueSwiper)

Vue.use(ElementUI,{
  size: 'small'
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

