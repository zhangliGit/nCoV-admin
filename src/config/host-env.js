/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let wangxuanzhang = ''
let zhux = ''
let zhangkun = ''
let lvzhuo = ''

if (ConfigEnv === 'test') {
  wangxuanzhang = '/wangxuanzhang'
} else if (ConfigEnv === 'prod') {
  // 线上接口
  wangxuanzhang = '/pc-yq'
} else {
  wangxuanzhang = '/admin'
}

export default {
  wangxuanzhang
}
