# vue-admin-template

### 安装依赖时如何对应版本
- 先查看当前node版本，再安装目前node所支持的node-sass版本，最后安装node-sass所对应的sass-loader版本。

### 如何自定义环境变量
- 创建文件
```
    .env.[mode]
```
- 默认字段
```
    NODE_ENV [可重置]
    BASE_URL [无法重置]
```
- 自定义字段
```
    VUE_APP_ + 自定义字段
```

### 路由守卫 / 拦截
- nprogress 进度条加载

### 数据模拟
- mockjs 伪造数据\请求拦截

### 状态管理
- app为全局状态管理
- 左侧菜单栏折叠
- 移动屏模型检测

### 拓展插件
- underscore
- dayjs
- i18n 国际化

### 登录
- 登录页
- validator 表单验证
- axios 请求拦截 错误处理 
- cookie 本地缓存 登录/退出状态记录
- router 路由守卫 访问权限 重定向路由

### 用户角色 [wait]
- permission 操作权限 
- menu 动态菜单路由

### 功能描述及使用
- alike为PC端关键词，alive为Mobile端关键词
- 查询元素以query关键词开头定义
- tags 标签页 
- fullscreen 全屏
- language 切语言 
- vue-awesome-swiper 轮播
```
    import "swiper/dist/css/swiper.css";
    import { swiper, swiperSlide } from "vue-awesome-swiper";
    import * as swiperAni from "@/common/lib/swiper.animate.js";
```
- custom-element-theme.scss 重置主题/动态皮肤 [stop]
```
    import 'element-ui/lib/theme-chalk/index.css'       （动态换肤无效，默认样式在后置位打包渲染，依旧会覆盖动态生成的样式）
    import '@/assets/style/custom-element-theme.scss'   （动态换肤无效）
    
    const version = require("element-ui/package.json").version;（锁定版本）
```
- 参考依赖包 vue-element-admin、vue-admin-beautiful


### 参考案例
- [SortableJS options文档](https://github.com/SortableJS/Sortable#options)
- [vuedraggable 示例](https://www.itxst.com/vue-draggable/yvq3mifz.html)
- [vue-quill-editor 示例](https://github.surmon.me/vue-quill-editor/)


### 依赖模块大全
- [√] vue-clipboard-plus 复制到剪切板
- [√] sortablejs 排序插件
- [√] vuedraggable 依赖 sortablejs 拖拽排序
- [√] vue-print-nb \ print.js（来自vue-print-plugin）打印指定元素
- [√] validation.js 自定义表单验证方法及规则与描述
- [√] list 数据列表示例
- [√] vue-quill-editor quill-image-extend-module 富文本编辑器
- [×] vue-echarts 图表
- [×] vue-ele-import 导入数据


### 常见问题
- 安装依赖模块时先查看相关版本介绍，比如vue-sortable模块就不支持vue2及以上
- Syntax Error: Error: Cannot find module 'gifsicle'
```
    原因：由于image-webpack-loader依赖包安装不全，导致依赖包所关联的依赖模块丢失
    解决：删除node_modules 和 package-lock.json 使用淘宝镜像安装模块
    源主机资源无法访问：https://www.cnblogs.com/ccti7/p/13956678.html
``` 
- Uncaught SyntaxError: Invalid or unexpected token
```
    原因：更新或删除了依赖
    解决：刷新项目资源管理器，然后重新编译
```
