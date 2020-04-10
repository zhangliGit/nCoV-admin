/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let wangxuanzhang = ''
let zhuxu = ''
if (ConfigEnv === 'test') {
 // 线上接口
 wangxuanzhang = '/pc-yq'
 zhuxu = '/mobile-yq'
} else if (ConfigEnv === 'prod') {
  // 线上接口
  wangxuanzhang = '/pc-yq'
  zhuxu = '/mobile-yq'
} else {
  wangxuanzhang = '/zhuxu'
  zhuxu = '/zhuxu'
}

export default {
  wangxuanzhang,
  zhuxu
}
