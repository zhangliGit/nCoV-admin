const ClassManage = resolve => require(['../views/classManage/ClassManage.vue'], resolve)

const menu = {
  path: '/classManage',
  name: 'classManage',
  component: ClassManage,
  meta: {
    title: '班级管理',
    icon: 'setting'
  }
}

export default menu
