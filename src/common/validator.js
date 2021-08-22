/**
 * 自定义表单验证器
 */
module.exports = {
    isExternal(path) {
        return /^(https?:|mailto:|tel:)/.test(path)
    },
    validUsername(str) {
        const valid_map = ['admin', 'editor']
        return valid_map.indexOf(str.trim()) >= 0
    }
}