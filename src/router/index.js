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
          meta:[
            {name: '首页'}
          ]
        },{
          path:'Hospital',
          name: 'Hospital',
          component: resolve => require(['@/views/Hospital/index.vue'],resolve),
          meta:[
            {name: '首页', url: '/index'},
            {name: '医院收入额'}
          ]
        },
        {
          path:'Outpatient',
          name: 'Outpatient',
          component: resolve => require(['@/views/Outpatient/index.vue'],resolve),
          meta:[
            {name: '首页', url: '/index'},
            {name: '乡镇医院收入额'}
          ]
        },
        {
          path:'villages',
          name: 'villages',
          component: resolve => require(['@/views/Outpatient/villages.vue'],resolve),
          meta:[
            {name: '首页', url: '/index'},
            {name: '乡镇医院收入额', url: '/Outpatient'},
            {name: '各村医院收入额'}
          ],
        }
      ]
    }
  ]
})
