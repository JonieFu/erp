import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: () => import('@/components/login.vue')
  },
  {
    path: '/home',
    component: () => import('@/components/home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        component: () => import('@/components/welcome.vue')
      },
      {
        path: '/department',
        name: 'Department',
        component: () => import('@/views/rights/department.vue')
      },
      {
        path: '/employee',
        name: 'Employee',
        component: () => import('@/views/rights/employee.vue')
      },
      {
        path: '/company',
        name: 'Company',
        component: () => import('@/views/rights/company.vue')
      },
      {
        path: '/role',
        name: 'Role',
        component: () => import('@/views/rights/role.vue')
      },
      {
        path: '/menu',
        name: 'Menu',
        component: () => import('@/views/rights/menu.vue')
      },
      {
        path: '/configuration',
        name: 'Configuration',
        component: () => import('@/views/data/configuration.vue')
      },
      {
        path: '/maintenance',
        name: 'Maintenance',
        component: () => import('@/views/data/maintenance.vue')
      },
      // 合同管理 

      {
        path: '/contract',
        name: 'Contract',
        component: () => import('@/views/contract/contract.vue')
      },
      {
        path: '/contract/add',
        name: 'ContractAdd',
        component: () => import('@/views/contract/add.vue')
      },
      {
        path: '/contract/edit',
        name: 'ContractEdit',
        component: () => import('@/views/contract/edit.vue')
      },
      {
        path: '/contract/review',
        name: 'ContractReview',
        component: () => import('@/views/contract/review.vue')
      },
      {
        path: '/purchas_order',
        name: 'Purchas_order',
        component: () => import('@/views/purchas/purchas_order.vue')
      },
      {
        path: '/return_order',
        name: 'Return_order',
        component: () => import('@/views/purchas/return_order.vue')
      },
      {
        path: '/report',
        name: 'Report',
        component: () => import('@/views/report/report.vue')
      },
      {
        path: '/bom',
        name: 'BOM',
        component: () => import('@/views/data/Bom.vue')
      },
      {
        path: '/dict',
        name: 'Dict',
        component: () => import('@/views/data/dict.vue')
      },
      {
        path: '/dictList',
        name: 'DictList',
        component: () => import('@/views/data/dictList.vue')
      },
      {
        path: '/process',
        name: 'Process',
        component: () => import('@/views/data/process.vue')
      },
      {
        path: '/sales_order',
        name: 'Sales_order',
        component: () => import('@/views/purchas/sales_order.vue')
      },
      {
        path: '/itemIn',
        name: 'Library',
        component: () => import('@/views/material/library.vue')
      },
      {
        path: '/itemOut',
        name: 'Outof',
        component: () => import('@/views/material/outof.vue')
      },
      {
        path: '/raw',
        name: 'Raw',
        component: () => import('@/views/material/raw.vue')
      },
      {
        path: '/cj',
        name: 'Cj',
        component: () => import('@/views/Production/cj.vue')
      },
      {
        path: '/sdcj',
        name: 'Sdcj',
        component: () => import('@/views/Production/sdcj.vue')
      },
      {
        path: '/dmdb',
        name: 'Dmdb',
        component: () => import('@/views/Production/dmdb.vue')
      },
      {
        path: '/ny',
        name: 'Ny',
        component: () => import('@/views/Production/ny.vue')
      },
      {
        path: '/fj',
        name: 'Fj',
        component: () => import('@/views/Production/fj.vue')
      },
      {
        path: '/txjlb',
        name: 'Txjlb',
        component: () => import('@/views/Production/txjlb.vue')
      },
      {
        path: '/scdd',
        name: 'Scdd',
        component: () => import('@/views/Production/scdd.vue')
      },
      {
        path: '/pcjh',
        name: 'Pcjh',
        component: () => import('@/views/Production/pcjh.vue')
      },
      {
        path: '/scsjdm',
        name: 'Scsjdm',
        component: () => import('@/views/Production/scsjdm.vue')
      },
      {
        path: '/scsjly',
        name: 'Scsjly',
        component: () => import('@/views/Production/scsjly.vue')
      },
      {
        path: '/gd',
        name: 'Gd',
        component: () => import('@/views/Production/gd.vue')
      },
      {
        path: '/bgxx',
        name: 'Bgxx',
        component: () => import('@/views/Production/bgxx.vue')
      },
      {
        path: '/ymdz',
        name: 'Ymdz',
        component: () => import('@/views/quality/ymdz.vue')
      },
      {
        path: '/gdohq',
        name: 'Gdohq',
        component: () => import('@/views/quality/gdohq.vue')
      },
      {
        path: '/jtxzq',
        name: 'Jtxzq',
        component: () => import('@/views/quality/jtxzq.vue')
      },
      {
        path: '/sbejg',
        name: 'Sbejg',
        component: () => import('@/views/quality/sbejg.vue')
      },
      {
        path: '/dc',
        name: 'Dc',
        component: () => import('@/views/quality/dc.vue')
      },
      {
        path: '/yj',
        name: 'Yj',
        component: () => import('@/views/quality/yj.vue')
      },
      {
        path: '/dlhgq',
        name: 'Dlhgq',
        component: () => import('@/views/quality/dlhgq.vue')
      },
      {
        path: '/cpjc',
        name: 'Cpjc',
        component: () => import('@/views/quality/cpjc.vue')
      },
      {
        path: '/sbgzgl',
        name: 'Sbgzgl',
        component: () => import('@/views/device/sbgzgl.vue')
      },
      {
        path: '/sbrcwh',
        name: 'Sbrcwh',
        component: () => import('@/views/device/sbrcwh.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

// 设置路由导航守卫，如果用户没有登录的话则直接跳转到登录页面

// router.beforeEach((to,from,next)=>{
//   if(to.path ==='/login') return next()
//   const tokenStr = window.sessionStorage.getItem('token')
//   if(!tokenStr) return next('/login')
//   next()
// })

export default router
