import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/index',
    component: resolve => require(['@/layout/index.vue'], resolve),
    children: [
      {
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
        path: 'people',
        name: 'people',
        component: resolve => require(['@/views/town/people.vue'], resolve),
        meta: [{
            name: '首页',
            url: '/index'
          },
          {
            name: '乡镇医院人数'
          }
        ]
      },
      // {
      //   path: 'OutpatientBill',
      //   name: 'OutpatientBill',
      //   component: resolve => require(['@/views/StatisticalStatement/OutpatientBill.vue'], resolve),
      //   meta: [{
      //       name: '门诊收费单'
      //     },
      //   ]
      // },
      {
        path: '/Statistics/ChargeItemsUseQuery',
        name: '/Statistics/ChargeItemsUseQuery',
        component: resolve => require(['@/views/StatisticalStatement/Statistics/ChargeItemsUseQuery.vue'], resolve),
        meta: [{
            name: '一般诊疗费统计'
          }
        ]
      },
      {
        path: '/Record/Visitenquiry',
        name: '/Record/Visitenquiry',
        component: resolve => require(['@/views/StatisticalStatement/Record/Visitenquiry.vue'], resolve),
        meta: [{
            name: '就诊情况查询'
          }
        ]
      },
      {
        path: '/Statistics/RegFeeSum',
        name: '/Statistics/RegFeeSum',
        component: resolve => require(['@/views/StatisticalStatement/Statistics/RegFeeSum.vue'], resolve),
        meta: [{
            name: '门诊挂号收费统计'
          }
        ]
      },
      {
        path: '/record/MonthlyOutpatient',
        name: '/record/MonthlyOutpatient',
        component: resolve => require(['@/views/StatisticalStatement/Record/MonthlyOutpatient.vue'], resolve),
        meta: [{
            name: '每月门诊量'
          }
        ]
      },
      {
        path: '/Statistics/Miaccount',
        name: '/Statistics/Miaccount',
        component: resolve => require(['@/views/StatisticalStatement/Statistics/Miaccount.vue'], resolve),
        meta: [{
            name: '医保结算次数统计'
          }
        ]
      },
      {
        path: '/Record/Outpatientlog',
        name: '/Record/Outpatientlog',
        component: resolve => require(['@/views/StatisticalStatement/Record/Outpatientlog.vue'], resolve),
        meta: [{
            name: '医疗机构门诊日志'
          }
        ]
      },
      {
        path: '/Statistics/Checksettlement',
        name: '/Statistics/Checksettlement',
        component: resolve => require(['@/views/StatisticalStatement/Statistics/Checksettlement.vue'], resolve),
        meta: [{
            name: '门诊对账统计'
          }
        ]
      },
      {
        path: '/Record/Tcmcapacity',
        name: '/Record/Tcmcapacity',
        component: resolve => require(['@/views/StatisticalStatement/Record/Tcmcapacity.vue'], resolve),
        meta: [{
            name: '中医门诊量'
          }
        ]
      },
      {
        path: '/Sell/Drugusagequery',
        name: '/Sell/Drugusagequery',
        component: resolve => require(['@/views/StatisticalStatement/Sell/Drugusagequery.vue'], resolve),
        meta: [{
            name: '药品消耗统计'
          }
        ]
      },
      {
        path: '/Finance/IncomeSummary',
        name: '/Finance/IncomeSummary',
        component: resolve => require(['@/views/StatisticalStatement/Finance/IncomeSummary.vue'], resolve),
        meta: [{
            name: '卫生室收入汇总'
          }
        ]
      }
    ]
  }]
})
