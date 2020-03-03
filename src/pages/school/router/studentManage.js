
const StudentManage = resolve => require(['../views/studentManage/StudentManage.vue'], resolve)

const menu = {
  path: '/studentManage',
  name: 'studentManage',
  component: StudentManage,
  meta: {
    title: '学生管理',
    icon: 'menu-fold'
  }
}

export default menu
