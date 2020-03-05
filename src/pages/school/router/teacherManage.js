const TeacherManage = resolve => require(['../views/teacherManage/TeacherManage.vue'], resolve)

const menu = {
  path: '/teacherManage',
  name: 'teacherManage',
  component: TeacherManage,
  meta: {
    title: '教职工管理',
    icon: 'setting'
  }
}

export default menu
