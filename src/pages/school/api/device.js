/**
 * @des 模块接口配置
 * @remak 接口路径后面加#{类型} 如 #post  #get #del
 */

import hostEnv from '@/config/host-env'

const deviceApi = {
  getDeviceList: '/school/deviceInfo/listPage#post', // 获取设备类别
  addDevice: '/school/deviceInfo/save#post', // 新增设备
  updateDevice: '/school/deviceInfo/update#post', //  更新设备
  deleteDevice: 'school/deviceInfo/delete#del', // 删除设备
  syncUserInfo: '/school/deviceInfo/deviceSyncUserInfo#postQuery', // 设备同步人员信息
  cleanDeviceUser: '/school/deviceInfo/cleanDeviceUser#delQuery' // 清空人员信息
}
for (const val in deviceApi) {
  deviceApi[val] = `${hostEnv.wangxuanzhang}${deviceApi[val]}`
}
export default deviceApi
