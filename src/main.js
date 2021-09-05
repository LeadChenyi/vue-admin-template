import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/router/interceptors.js'
import store from '@/store'
import i18n from '@/i18n'

/*--- 全局指令 ---*/
import Directives from './directives'
Vue.use(Directives);

/*--- 自定义插件 ---*/
import Plugins from '@/common/plugins.js'
Vue.use(Plugins);

/*--- 第三方依赖 ---*/
import Vender from '@/common/vender.js'
Vue.use(Vender);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
