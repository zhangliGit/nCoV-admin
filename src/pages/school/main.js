// ie polyfill
import '@babel/polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import $ajax from '@u/ajax-serve'
import Tools from '@u/tools'
import '@u/filter'
import '@u/directives'
import '@a/css/common.less'
import moment from 'moment'
import 'moment/locale/zh-cn'
import AntdPlugin from '@a/js/antd-plugin'

import bootstrap from './core/bootstrap'
import './core/use'
moment.locale('zh-cn')
Vue.use(AntdPlugin)
Vue.config.productionTip = false
Vue.prototype.$ajax = $ajax
Vue.prototype.$tools = Tools
new Vue({
  router,
  store,
  created() {
    bootstrap()
  },
  render: (h) => h(App),
}).$mount('#app')
