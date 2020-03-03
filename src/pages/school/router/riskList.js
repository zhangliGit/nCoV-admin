
const RiskList = resolve => require(['../views/riskList/RiskList.vue'], resolve)

const menu = {
  path: '/riskList',
  name: 'riskList',
  component: RiskList,
  meta: {
    title: '风险人员名单',
    icon: 'menu-fold'
  }
}

export default menu
