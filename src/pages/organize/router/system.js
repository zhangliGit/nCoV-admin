import { RouteView } from '../layouts'
const TimeSet = resolve => require(['../views/system/TimeSet.vue'], resolve)
const ConfigSet = resolve => require(['../views/system/ConfigSet.vue'], resolve)

const menu = {
  path: '/system',
  name: '/system',
  component: RouteView,
  redirect: '/timeSet',
  meta: {
    title: '系统设置',
    icon: 'menu-fold'
  },
  children: [
    {
      path: '/timeSet',
      name: 'timeSet',
      component: TimeSet,
      meta: {
        title: '时间设置',
        icon: 'menu-fold'
      }
    },
    {
      path: '/configSet',
      name: 'configSet',
      component: ConfigSet,
      meta: {
        title: '配置设置',
        icon: 'menu-fold'
      }
    }
  ]
}

export default menu
