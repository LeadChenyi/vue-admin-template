const install = function (Vue) {
    const files = require.context('./modules', false, /\.js$/);
    files.keys().forEach((item) => {
        let fileName = item.replace(/^\.\/(.*)\.\w+$/, '$1')
        Vue.directive(fileName, files(item).default);
    });
}

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install
}