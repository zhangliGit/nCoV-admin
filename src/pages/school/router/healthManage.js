import { RouteView } from '../layouts'
const HealthManageTea = resolve => require(['../views/healthManage/healthManageTea.vue'], resolve)
const HealthManageStu = resolve => require(['../views/healthManage/healthManageStu.vue'], resolve)

const menu = {
  path: '/healthManage',
  name: '/healthManage',
  component: RouteView,
  redirect: '/healthManageTea',
  meta: {
    title: '健康档案',
    icon: 'menu-fold'
  },
  children: [
    {
      path: '/healthManageTea',
      name: 'healthManageTea',
      component: HealthManageTea,
      meta: {
        title: '健康档案-教职工',
        icon: 'menu-fold'
      }
    },
    {
      path: '/healthManageStu',
      name: 'healthManageStu',
      component: HealthManageStu,
      meta: {
        title: '健康档案-学生',
        icon: 'menu-fold'
      }
    }
  ]
}

export default menu
