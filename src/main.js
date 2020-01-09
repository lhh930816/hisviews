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
import 'swiper/css/swiper.css'

import axios from '@/kits/http'


Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
Vue.prototype.$http = axios

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

