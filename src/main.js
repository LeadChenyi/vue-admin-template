import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import '@/router/interceptors.js'
import store from '@/store'


// import '@/api/mock/index.js'
import Api from '@/api/axios/index.js'
Vue.prototype.$api = Api;


import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/assets/style/element.scss'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
