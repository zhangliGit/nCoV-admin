/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let hostEnv = ''

if (ConfigEnv === 'test') {
  hostEnv = 'http://test'
} else if (ConfigEnv === 'prod') { // 线上接口
  hostEnv = 'http://192.168.1.24:10080'
} else {
  hostEnv = window.location.origin
  // hostEnv = 'http://192.168.1.24:10080'
}

export default hostEnv
