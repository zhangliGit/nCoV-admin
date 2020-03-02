import '@babel/polyfill'
import Vue from 'vue'
import '@a/css/common.less'
import App from './App.vue'

Vue.config.productionTip = false
new Vue({
  created() {},
  render: h => h(App)
}).$mount('#app')
