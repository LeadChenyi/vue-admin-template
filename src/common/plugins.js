import Underscore from 'underscore';
import Dayjs from 'dayjs';

export default {
    install: function (Vue) {
        Object.defineProperty(Vue.prototype, '$underscore', { value: Underscore });
        Object.defineProperty(Vue.prototype, '$dayjs', { value: Dayjs });
    }
}