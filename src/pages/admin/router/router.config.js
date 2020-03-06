// eslint-disable-next-line
import { BasicLayout } from '../layouts'
const YqType = resolve => require(['../views/YqType.vue'], resolve)
const OrgManage = resolve => require(['../views/organize/OrgManage.vue'], resolve)
const OrgDetail = resolve => require(['../views/organize/OrgDetail.vue'], resolve)
const SchoolManage = resolve => require(['../views/school/SchoolManage.vue'], resolve)
const SchoolDetail = resolve => require(['../views/school/SchoolDetail.vue'], resolve)
export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '机构管理' },
    redirect: '/orgManage',
    children: [
      {
        path: '/orgManage',
        name: 'orgManage',
        component: OrgManage,
        meta: {
          title: '机构管理',
          icon: 'bank'
        }
      },
      {
        path: '/schoolManage',
        name: 'schoolManage',
        component: SchoolManage,
        meta: {
          title: '学校管理',
          icon: 'flag'
        }
      },
      {
        path: '/yqType',
        name: 'yqType',
        component: YqType,
        meta: {
          title: '风险类型',
          icon: 'setting'
        }
      },
      {
        path: '/orgManage/orgDetail',
        name: 'orgDetail',
        component: OrgDetail,
        meta: {
          title: '机构详情',
          icon: 'menu-fold'
        },
        hidden: true
      },
      {
        path: '/schoolManage/schoolDetail',
        name: 'schoolDetail',
        component: SchoolDetail,
        meta: {
          title: '机构详情',
          icon: 'menu-fold'
        },
        hidden: true
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
