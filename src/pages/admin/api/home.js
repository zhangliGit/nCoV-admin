/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const homeApi = {
  getIndex: 'http://192.168.2.247:3000/mock/40/getTable#post', // 获取数据列表
  getDetail: 'http://192.168.2.247:3000/mock/40/detail#get', // 获取详情
  getOrgList: '/operate/organizationinfo/allInfoList#post', // 机构列表
  addOrg: '/operate/organizationinfo/saveOrgAndManager#post', // 添加组织
  updateOrg: '/operate/organizationinfo/updateOrgAndManager#post', // 编辑组织
  delOrg: '/operate/organizationinfo/delete#del', // 删除组织
  bindSchool: '/operate/organizationinfo/bindSchool#post', // 教育局绑定学校
  unBindSchool: '/operate/organizationinfo/unBindSchool#get', // 教育局解绑学校
  getSchool: '/operate/organizationinfo/getSchoolInfoPage#post', // 查询该教育局未绑定 ,及未绑定教育局的学校
  getBindSchool: '/operate/organizationinfo/getOrgInfoByPCode/#get', // 查询该教育局绑定的学校
  getRiskList: '/operate/riskinfo/getList#get', // 风险类型列表
  addRisk: '/operate/riskinfo/save#post', // 添加风险类型
  updateRisk: '/operate/riskinfo/update#post', // 编辑风险类型
  delRisk: '/operate/riskinfo/delete#post' // 删除风险类型
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv.admin}${homeApi[val]}`
}
export default homeApi
