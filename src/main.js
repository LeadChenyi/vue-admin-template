import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/router/interceptors.js'
import store from '@/store'
import i18n from '@/i18n'

/*--- 自定义脚本插件全局挂载 ---*/
// import '@/api/mock/index.js'
import { Request, UploadFile, DownloadFile } from '@/api/axios/index.js'
Vue.prototype.$request = Request;
Vue.prototype.$uploadFile = UploadFile;
Vue.prototype.$downloadFile = DownloadFile;

import Utils from '@/common/utils.js'
Vue.prototype.$utils = Utils;

import Validation from '@/common/validation.js'
Vue.prototype.$validation = Validation;

/*--- 第三方脚本插件&组件库全局挂载 ---*/
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/custom-element-theme.scss'
Vue.use(ElementUI)

import Plugins from '@/common/plugins.js'
Vue.use(Plugins);

import VueClipboard from 'vue-clipboard-plus'
VueClipboard.config.autoSetContainer = true;
Vue.use(VueClipboard);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
