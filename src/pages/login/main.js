// ie polyfill
import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import $ajax from '@u/ajax-serve'
import Tools from '@u/tools'
import '@a/css/common.less'
import AntdPlugin from '@a/js/antd-plugin'

import bootstrap from './core/bootstrap'
import './core/use'
Vue.use(AntdPlugin)
Vue.config.productionTip = false
Vue.prototype.$ajax = $ajax
Vue.prototype.$tools = Tools
new Vue({
  created() {
    bootstrap()
  },
  render: h => h(App)
}).$mount('#app')
