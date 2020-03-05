import { RouteView } from '../layouts'
const HealthManageTea = resolve => require(['../views/healthManage/healthManageTea.vue'], resolve)
const HealthManageStu = resolve => require(['../views/healthManage/healthManageStu.vue'], resolve)
const HealthManageTeaDetail = resolve => require(['../views/healthManage/healthManageTeaDetail.vue'], resolve)
const HealthManageStuDetail = resolve => require(['../views/healthManage/healthManageStuDetail.vue'], resolve)
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
      path: '/healthManageTea/detail',
      name: 'healthManageTea',
      component: HealthManageTeaDetail,
      meta: {
        title: '档案详情',
        isHide: true
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
      path: '/healthManageStu/detail',
      name: 'healthManageTea',
      component: HealthManageStuDetail,
      meta: {
        title: '档案详情',
        isHide: true
      }
    }
  ]
}

export default menu
