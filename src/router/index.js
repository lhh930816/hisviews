import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index',
    component: resolve => require(['@/layout/index.vue'], resolve),
    children: [{
        path: 'index',
        name: 'index',
        component: resolve => require(['@/views/Home/index.vue'], resolve),
        meta: [{
          name: '首页'
        }]
      },
      {
        path: 'Outpatient',
        name: 'Outpatient',
        component: resolve => require(['@/views/Outpatient/index.vue'], resolve),
        meta: [{
            name: '首页',
            url: '/index'
          },
          {
            name: '乡镇门诊收入额'
          }
        ]
      },
      {
        path: 'Drug',
        name: 'Drug',
        component: resolve => require(['@/views/Drug/index.vue'], resolve),
        meta: [{
            name: '首页',
            url: '/index'
          },
          {
            name: '药品收入额'
          }
        ]
      },
      {
        path: 'villages',
        name: 'villages',
        component: resolve => require(['@/views/Outpatient/villages.vue'], resolve),
        meta: [{
            name: '首页',
            url: '/index'
          },
          {
            name: '乡镇门诊收入额',
            url: '/Outpatient'
          },
          {
            name: '各村门诊收入额'
          }
        ],
      },
      {
        path: 'town',
        name: 'town',
        component: resolve => require(['@/views/town/people.vue'], resolve),
        meta: [{
            name: '首页',
            url: '/index'
          },
          {
            name: '乡镇医院人数',
            url: '/Outpatient'
          }
        ]
      }
    ]
  }]
})
