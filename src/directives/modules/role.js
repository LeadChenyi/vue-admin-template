import Store from '@/store'
import { SUPER_ADMIN_ROLE_CODE } from '@/common/config.js'
function authorizeRole(el, binding) {
    const { value } = binding;
    const roles = Store.state.app.userInfo && Store.state.app.userInfo.roles;

    if (value && value.length && value instanceof Array) {
        let hasRole = roles.some((item) => {
            return SUPER_ADMIN_ROLE_CODE === item || value.includes(item)
        })

        if (!hasRole) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    } else {
        throw new Error(`v-role="[]" 必须填写角色字符标识`);
    }
}

export default {
    update(el, binding) {
        authorizeRole(el, binding);
    }
}