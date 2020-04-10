/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const schoolApi = {
  getGradeList: '/operate/gradeinfo/getGradelist#get', // 年级管理列表
  getClassList: '/school/classInfo/getClassInfoByGradeCode#postForm', // 班级列表
  getClassInfoList: '/school/classInfo/getClassDetailInfo#postForm', // 班级信息列表
  deleteClass: '/school/classInfo/deleteById#delete', // 删除班级
  bathAddClass: '/school/classInfo/bathAddClass#postForm', // 新增班级
  classTeacher: '/school/teacherrelationclass/save#post', // 班级绑定班主任
  delClassTeacher: '/school/teacherrelationclass/unBindClass#postForm', // 班级解绑班主任
  getUserList: '/school/userinfo/getUserInfoList#post', // 学生教职工管理列表
  addStudent: '/mobile/patriarchinfo/stu/mobile/save#post', // 新增学生
  editUser: '/school/userinfo/updateStudentInfo#post', // 编辑人员信息
  deleUser: '/school/userinfo/deleteUserById#delete', // 删除人员信息
  addTeacher: '/user/staff/save#post', // 新增教职工
  riskList: '/operate/riskinfo/getList#get', // 风险类型
  getRiskList: '/school/userinfo/getRiskUserList#post', // 风险人员名单
  addRisk: '/school/riskpersoninfo/batchSaveRiskPerson#post', // 新增风险人员
  getLatestMedicalInfo: '/school/medicalinfo/getLatestMedicalInfo#postQuery', // 获取体检最新一条记录
  updateInfo: '/school/medicalinfo/save#post', // 修改体检数据
  getTemperatureData: '/school/reportinfo/getTemperatureData#postQuery', // 获取个人体温数据
  getreportList: '/school/userinfo/getUserInfoList#post', // 人员信息查询
  getReportInfoList: '/school/reportinfo/getReportInfoList#post' // 获取上报信息记录
  
}
for (const val in schoolApi) {
  schoolApi[val] = `${hostEnv.wangxuanzhang}${schoolApi[val]}`
}
export default schoolApi
