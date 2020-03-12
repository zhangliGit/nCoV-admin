/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const homeApi = {
  getIndex: 'http://192.168.2.247:3000/mock/40/getTable#post', // 获取数据列表
  getDetail: 'http://192.168.2.247:3000/mock/40/detail#get', // 获取详情
  getOrgList: '/org/list#get', // 机构列表
  getSchoolList: '/school/list#get', // 学校列表
  addOrg: '/org/add#post', // 添加组织
  updateOrg: '/org/update#post', // 编辑组织
  delOrg: '/org/delete#get', // 删除组织
  addSchool: '/school/add#post', // 添加学校
  updateSchool: '/school/update#post', // 编辑学校
  delSchool: '/school/delete#get' // 删除学校
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv}${homeApi[val]}`
}
export default homeApi
