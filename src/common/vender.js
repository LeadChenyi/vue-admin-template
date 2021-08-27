import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/custom-element-theme.scss'
import VueClipboard from 'vue-clipboard-plus'

import Cookie from 'js-cookie'
import Underscore from 'underscore';
import Dayjs from 'dayjs';


export default {
    install: function (Vue) {
        /*--- 组件库全局注册 ---*/
        Vue.use(ElementUI)
        VueClipboard.config.autoSetContainer = true;
        Vue.use(VueClipboard);

        /*--- 插件全局挂载  ---*/
        Object.defineProperty(Vue.prototype, '$cookie', { value: Cookie });
        Object.defineProperty(Vue.prototype, '$underscore', { value: Underscore });
        Object.defineProperty(Vue.prototype, '$dayjs', { value: Dayjs });
    }
}