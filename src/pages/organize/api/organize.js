/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const organizeApi = {
  getBaseData: '/education/school/ifno#get', // 获取学校数据
  getDailyList: '/education/day/record#get', // 疫情日报
  getTemperatureChart: '/education/exc/temperature#get', // 体温异常史
  getReportChart: '/education/no/record#get', // 疫情上报态势
  getTemperature: '/education/exc/record#get', // 体温异常史
  getTouch: '/education/contact/record#get', // 疫情人员接触史
  getStatistics: '/education/day/record#get' // 填报统计
}
for (const val in organizeApi) {
  organizeApi[val] = `${hostEnv.wangxuanzhang}${organizeApi[val]}`
}
export default organizeApi
