const CompressionPlugin = require("compression-webpack-plugin")
const path = require('path');

module.exports = {
    devServer: {
        proxy: {
            '/api': {          // 代理服务器的前缀
                target: 'http://jsonplaceholder.typicode.com',
                ws: true,      // 是否支持webScokit
                changeOrigin: true,
                secure: false,
                pathRewrite: {  // 是否重写前缀到请求路径中
                    "^/api": "/"
                }
            }
        }
    },
    css: {// 样式预处理解析器共享Scss全局变量
        loaderOptions: {
            scss: {
                prependData: `@import '@/assets/style/variables.scss';`
            }
        }
    },
    chainWebpack: config => {
        // 路径别名配置
        config.resolve.alias.set('@', path.join(__dirname, './src'))
            .set('~image', path.join(__dirname, './src/assets/image'))
            .set('~style', path.join(__dirname, './src/assets/style'))

        // 低版本浏览器兼容ES6
        config.entry('main').add('babel-polyfill')

        // 图片解析器
        config.module.rule('images')
            .test(/\.(png|jpe?g|gif|svg)(\?.*)?$/)
            .use('image-webpack-loader')
            .loader('image-webpack-loader')
            .options({ bypassOnDebug: true })

        // 生成模式下进行文件资源压缩
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compressionPlugin')
                .use(new CompressionPlugin({
                    test: /\.js$|\.html$|.\css/,    // 匹配文件名
                    threshold: 10240,               // 对超过10k的数据压缩
                    deleteOriginalAssets: false     // 不删除源文件
                }))
        }
    },  // 指定第三方依赖包做低版本浏览器兼容ES6
    transpileDependencies: [
        'biyi-admin',
    ]
}