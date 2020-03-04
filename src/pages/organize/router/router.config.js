// eslint-disable-next-line
import { BasicLayout } from '../layouts'
import system from './system'
const Home = resolve => require(['../views/Home.vue'], resolve)
const Daily = resolve => require(['../views/daily/Daily.vue'], resolve)
const HealthFile = resolve => require(['../views/healthFile/HealthFile.vue'], resolve)

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
        name: 'home',
        component: Home,
        meta: {
          title: '系统首页',
          icon: 'home'
        }
      },
      {
        path: '/daily',
        name: 'daily',
        component: Daily,
        meta: {
          title: '疫情日报',
          icon: 'menu-fold'
        }
      },
      {
        path: '/healthFile',
        name: 'healthFile',
        component: HealthFile,
        meta: {
          title: '健康档案',
          icon: 'menu-fold'
        }
      },
      system
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
  // {
  //   path: '',
  //   name: 'login',
  //   component: () => import(/* webpackChunkName: "login" */ '../views/user/Login')
  // }
]

const RouterMap = [...constantRouterMap, ...asyncRouterMap]

export default RouterMap
