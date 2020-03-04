// eslint-disable-next-line
import { BasicLayout } from '../layouts'
import system from './system'
import classManage from './classManage'
import teacherManage from './teacherManage'
import studentManage from './studentManage'
import riskList from './riskList'
import reportManage from './reportManage'
import healthManage from './healthManage'
const Home = resolve => require(['../views/Home.vue'], resolve)
const DailyReport = resolve => require(['../views/dailyReport/DailyReport.vue'], resolve)

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
        path: '/dailyReport',
        name: 'dailyReport',
        component: DailyReport,
        meta: {
          title: '疫情日报',
          icon: 'home'
        }
      },
      system,
      classManage,
      teacherManage,
      studentManage,
      riskList,
      reportManage,
      healthManage
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
