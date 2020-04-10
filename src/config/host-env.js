/**
 * @description 多环境接口配置
 * @author zhangli
 */

const ConfigEnv = process.env.VUE_APP_URL
let wangxuanzhang = ''
let zhuxu = ''
if (ConfigEnv === 'test') {
  wangxuanzhang = '/wangxuanzhang'
} else if (ConfigEnv === 'prod') {
  // 线上接口
  wangxuanzhang = '/pc-yq'
  zhuxu = '/mobile-yq'
} else {
  wangxuanzhang = '/wangxuanzhang'
  zhuxu = '/zhuxu'
}

export default {
  wangxuanzhang,
  zhuxu
}
