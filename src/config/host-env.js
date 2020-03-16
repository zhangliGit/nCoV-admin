/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
const hostEnv = ''
let admin = ''

if (ConfigEnv === 'test') {
  admin = '/admin'
  // hostEnv = 'http://yapi.demo.qunar.com/mock/85606'
} else if (ConfigEnv === 'prod') { // 线上接口
  // hostEnv = 'http://yapi.demo.qunar.com/mock/85606'
  admin = '/admin'
} else {
  // hostEnv = 'http://yapi.demo.qunar.com/mock/85606'
  admin = '/admin'
}

export default {
  admin,
  hostEnv
}
