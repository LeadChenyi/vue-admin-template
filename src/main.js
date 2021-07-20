import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/router/interceptors.js'
import store from '@/store'
import i18n from '@/i18n'

// import '@/api/mock/index.js'
import Request from '@/api/axios/index.js'
Vue.prototype.$request = Request;

import Utils from '@/common/utils.js'
Vue.prototype.$utils = Utils;

import Plugins from '@/common/plugins.js'
Vue.use(Plugins);

import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/custom-element-theme.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
