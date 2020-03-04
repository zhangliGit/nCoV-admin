/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const schoolApi = {
  getClassList: '/teacherLeave#get' // 班级管理列表
}
for (const val in schoolApi) {
  schoolApi[val] = `${hostEnv}${schoolApi[val]}`
}
export default schoolApi
