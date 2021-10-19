# vue-admin-template

### 扩展功能与模块依赖
- [√] `underscore` 实用工具
- [√] `dayjs` 时间格式化
- [√] `vue-i18n` 国际化语言
- [√] `vue-clipboard-plus` 复制到剪切板
- [√] `sortablejs、vuedraggable` 拖拽排序
- [√] `vue-print-nb、print.js` 打印指定元素
- [√] `vue-quill-editor、quill-image-extend-module` 富文本编辑器
- [√] `echarts、v-charts` 数据图表
- [√] `pikaz-excel-js | xlsx file-saver、script-loader` 数据导入导出
- [√] `vue-pdf` 预览文件
- [√] `vue-awesome-swiper` 轮播图
- [√] `vue-markdown、github-markdown-css、highlight.js、mavon-editor` 文档编辑与预览解析（解析md文件需要安装text-loader开发依赖）


### 服务指令
- `npm install` 安装依赖
- `npm run serve` 本地运行
- `npm run build` 打包项目


### 需求
- 将用户信息放在路由拦截器中发送请求，不然每次刷新数据格式就会报错，因为vuex也会初始化
- 如何在服务端通过token快速获取到当前用户部分信息