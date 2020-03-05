/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const schoolApi = {
  getClassList: '/classManage#get', // 班级管理列表
  getStudentList: '/studentManage#get', // 学生管理列表
  getTeacherList: '/teacherManage#get', // 教职工管理列表
  getRiskList: '/riskList#get' ,// 风险人员名单
  getreportList: '/teacher/reports#get' // 上报记录
}
for (const val in schoolApi) {
  schoolApi[val] = `${hostEnv}${schoolApi[val]}`
}
export default schoolApi
