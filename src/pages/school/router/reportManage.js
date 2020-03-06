import { RouteView } from '../layouts'
const ReportManageStu = resolve => require(['../views/reportManage/reportManageStu.vue'], resolve)
const ReportManageTea = resolve => require(['../views/reportManage/reportManageTea.vue'], resolve)
const PersonalDetail = resolve => require(['../views/component/PersonalDetail.vue'], resolve)
const menu = {
  path: '/reportManage',
  name: '/reportManage',
  component: RouteView,
  redirect: '/reportManageTea',
  meta: {
    title: '上报记录',
    icon: 'bars'
  },
  children: [
    {
      path: '/reportManageTea',
      name: 'reportManageTea',
      component: ReportManageTea,
      meta: {
        title: '教职工',
        icon: 'bars'
      }
    },
    {
      path: '/reportManageStu',
      name: 'reportManageStu',
      component: ReportManageStu,
      meta: {
        title: '学生',
        icon: 'bars'
      }
    },
    {
      path: '/component/detail',
      name: 'PersonalDetail',
      component: PersonalDetail,
      meta: {
        title: '档案详情',
        isHide: true
      }
    }
  ]
}

export default menu
