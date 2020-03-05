/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const schoolApi = {
  getBaseData: '/baseData#get', // 获取学校数据
  getDailyList: '/daily#get', // 疫情日报
  getTemperature: '/temperature#get', // 体温异常史
  getTouch: '/touch#get', // 异常人员接触史
  getStatistics: '/statistics#get' // 填报统计
}
for (const val in schoolApi) {
  schoolApi[val] = `${hostEnv}${schoolApi[val]}`
}
export default schoolApi
