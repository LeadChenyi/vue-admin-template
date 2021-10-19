import Store from '@/store'
import { SUPER_ADMIN_PERMISSION_CODE } from '@/common/config.js'
function authorizePermission(el, binding) {
    const { value } = binding;
    const permissions = Store.state.app.userInfo.permissions || ['*:*:*'];  // 暂时先模拟最高权限
    if (value && value.length && value instanceof Array) {
        let hasPermission = permissions.some((item) => {
            return SUPER_ADMIN_PERMISSION_CODE === item || value.includes(item)
        })

        if (!hasPermission) {
            el.parentNode && el.parentNode.removeChild(el);
        }
    } else {
        throw new Error(`v-permission="[]" 必须填写权限字符标识`);
    }
}

export default {
    update(el, binding) {
        authorizePermission(el, binding);
    }
}