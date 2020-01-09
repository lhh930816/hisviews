import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect:'/index',
      component: resolve => require(['@/layout/index.vue'],resolve),
      children: [
        {
          path:'index',
          name: 'index',
          component: resolve => require(['@/views/Home/index.vue'],resolve),
          meta:{
            title: ''
          }
        },{
          path:'Hospital',
          name: 'Hospital',
          component: resolve => require(['@/views/Hospital/index.vue'],resolve),
          meta:{
            title: ''
          }
        },
        {
          path:'Outpatient',
          name: 'Outpatient',
          component: resolve => require(['@/views/Outpatient/index.vue'],resolve),
          meta:{
            title: ''
          }
        }
      ]
    }
  ]
})
