import { RouteView } from '../layouts'
const HealthManageTea = resolve => require(['../views/healthManage/healthManageTea.vue'], resolve)
const HealthManageStu = resolve => require(['../views/healthManage/healthManageStu.vue'], resolve)
const PersonalDetail = resolve => require(['../views/component/PersonalDetail.vue'], resolve)
const menu = {
  path: '/healthManage',
  name: '/healthManage',
  component: RouteView,
  redirect: '/healthManageTea',
  meta: {
    title: '健康档案',
    icon: 'folder-open'
  },
  children: [
    {
      path: '/healthManageTea',
      name: 'healthManageTea',
      component: HealthManageTea,
      meta: {
        title: '教职工',
        icon: 'folder-open'
      }
    },
    {
      path: '/healthManageStu',
      name: 'healthManageStu',
      component: HealthManageStu,
      meta: {
        title: '学生',
        icon: 'folder-open'
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
