/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
const hostEnv = ''
let admin = ''

if (ConfigEnv === 'test') {
  admin = '/admin'
} else if (ConfigEnv === 'prod') {
  // 线上接口
  admin = '/admin'
} else {
  admin = '/admin'
}

export default {
  admin,
  hostEnv
}
