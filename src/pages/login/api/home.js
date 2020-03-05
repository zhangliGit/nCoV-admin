/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const homeApi = {
  login: 'http://192.168.2.247:3000/mock/40/getTable#post' // 获取数据列表
}
for (const val in homeApi) {
  homeApi[val] = `${hostEnv}${homeApi[val]}`
}
export default homeApi
