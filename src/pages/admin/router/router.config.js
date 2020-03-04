// eslint-disable-next-line
import { BasicLayout } from '../layouts'
// import system from './system'
const Home = resolve => require(['../views/Home.vue'], resolve)
const OrgManage = resolve => require(['../views/organize/OrgManage.vue'], resolve)
const OrgDetail = resolve => require(['../views/organize/OrgDetail.vue'], resolve)
const SchoolManage = resolve => require(['../views/school/SchoolManage.vue'], resolve)
const SchoolDetail = resolve => require(['../views/school/SchoolDetail.vue'], resolve)
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
        path: 'orgManage',
        name: 'orgManage',
        component: OrgManage,
        meta: {
          title: '机构管理',
          icon: 'menu-fold'
        }
      },
      {
        path: 'schoolManage',
        name: 'schoolManage',
        component: SchoolManage,
        meta: {
          title: '学校管理',
          icon: 'menu-fold'
        }
      },
      {
        path: 'orgDetail',
        name: 'orgDetail',
        component: OrgDetail,
        meta: {
          title: '机构详情',
          icon: 'menu-fold'
        },
        hidden: true
      },
      {
        path: 'schoolDetail',
        name: 'schoolDetail',
        component: SchoolDetail,
        meta: {
          title: '机构详情',
          icon: 'menu-fold'
        },
        hidden: true
      }
      // system
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
