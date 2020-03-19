/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const homeApi = {
  getIndex: 'http://192.168.2.247:3000/mock/40/getTable#post', // 获取数据列表
  getDetail: 'http://192.168.2.247:3000/mock/40/detail#get', // 获取详情
  getUnReport: '/school/unReport/list#get', // 未上报名单
  getDaily: '/school/daily/num#get', // 疫情日报数量
  getReport: '/school/reportinfo/getReportInfoList#post', // 获取上报信息
  getInfoDoctor: '/school/schooldoctorinfo/getSchoolDoctorList#postQuery', // 获取校医列表
  getDailyData: '/index/page/getEpidemicData#postQuery', // 获取首页疫情日报数据
  getFeverAndHealth: '/index/page/getFeverAndHealthData#postQuery', // 获取首页发热和健康数
  getNoReport: '/index/page/getNoReportUserData#postQuery', // 获取首页未上报人数统计
  getSymptomsUser: '/index/page/getSymptomsUserData#postQuery' // 获取首页个症状人数统计
}
for (const val in homeApi) {
  homeApi[val] = `/admin${homeApi[val]}`
}
export default homeApi
