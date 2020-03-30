// eslint-disable-next-line
import { BasicLayout } from '../layouts'
const Daily = resolve => require(['../views/daily/Daily.vue'], resolve)
const HealthFile = resolve => require(['../views/healthFile/HealthFile.vue'], resolve)
const Overview = resolve => require(['../views/overview/Overview.vue'], resolve)

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '系统首页' },
    redirect: '/home',
    children: [
      {
        path: '/home',
        name: 'daily',
        component: Daily,
        meta: {
          title: '疫情日报',
          icon: 'bar-chart'
        }
      },
      {
        path: '/healthFile',
        name: 'healthFile',
        component: HealthFile,
        meta: {
          title: '健康档案',
          icon: 'folder-open'
        }
      },
      {
        path: '/overview',
        name: 'overview',
        component: Overview,
        meta: {
          title: '学校概览',
          icon: 'bars'
        }
      }
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

/**
 * 基础路由
 * @type { *[] }
 */
const constantRouterMap = [
  {
    path: '',
    name: 'login',
    component: () => import('../views/user/Login')
  }
]

const RouterMap = [...constantRouterMap, ...asyncRouterMap]

export default RouterMap
