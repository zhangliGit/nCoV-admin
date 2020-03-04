import { RouteView } from '../layouts'
const ReportManageStu = resolve => require(['../views/reportManage/reportManageStu.vue'], resolve)
const ReportManageTea = resolve => require(['../views/reportManage/reportManageTea.vue'], resolve)


const menu = {
  path: '/reportManage',
  name: '/reportManage',
  component: RouteView,
  redirect: '/reportManageTea',
  meta: {
    title: '上报记录',
    icon: 'menu-fold'
  },
  children: [
    {
      path: '/reportManageTea',
      name: 'reportManageTea',
      component: ReportManageTea,
      meta: {
        title: '上报记录-教职工',
        icon: 'menu-fold'
      }
    },
    {
      path: '/reportManageStu',
      name: 'reportManageStu',
      component: ReportManageStu,
      meta: {
        title: '上报记录-学生',
        icon: 'menu-fold'
      }
    }
  ]
}

export default menu
