# vue-admin-template

### 框架基础搭建及核心模块
- [√] vue-router 路由搭建
    + [√] router each 路由守卫(访问权限、重定向路由)
    + [√] nprogress 进度条加载
- [√] axios 数据请求
    + [√] request.js 请求封装
    + [√] mockjs 伪造数据模拟请求   
- [√] vuex 数据状态管理
    + [√] 左侧菜单栏折叠
    + [√] 是否为移动端
- [√] 登录页
    + [√] 表单验证
    + [√] 错误处理
    + [√] 本地缓存
    + [√] 重定向路由
- [√] 菜单栏
    + [√] 静态路由
    + [√] 动态路由 
- [×] 用户权限    
    + [×] rule 角色权限
    + [×] permission 操作权限
- [√] 首页仪表盘
    + pv、uv 覆盖折线图
    + 游客量全国地区分布图
    + 监控日志用户操作


### 框架扩展功能及依赖模块
- [√] underscore 实用工具
- [√] dayjs 时间格式化
- [√] vue-i18n 国际化语言
- [√] vue-clipboard-plus 复制到剪切板
- [√] sortablejs、vuedraggable 拖拽排序(vuedraggable依赖于sortablejs)
- [√] vue-print-nb、print.js(来自vue-print-plugin)打印指定元素
- [√] validation.js 自定义表单验证方法及规则与描述
- [√] vue-quill-editor quill-image-extend-module 富文本编辑器
- [√] echarts、v-charts 数据图表(v-charts依赖于echarts)
- [√] pikaz-excel-js / xlsx file-saver script-loader (来自vue-element-admin) 数据导入导出


### 参考文档或案例
- [SortableJS](https://github.com/SortableJS/Sortable#options)
- [vuedraggable](https://www.itxst.com/vue-draggable/yvq3mifz.html)
- [vue-quill-editor](https://github.surmon.me/vue-quill-editor/)
- [v-charts](https://v-charts.js.org/#/)
- [excel Pikez](https://juejin.cn/post/6844904151667720205)
- [excel PanJiaChen](https://panjiachen.github.io/vue-element-admin-site/feature/component/excel.html#excel-export)


### 常见问题
- 安装依赖时如何对应版本
```
    1、先查看当前node版本，再安装目前node所支持的node-sass版本，最后安装node-sass所对应的sass-loader版本。
    2、注意并不是所有vue-xxx模块都是支持vue2.0.0及以上的，比如：vue-sortable。
```
- 如何脚手架自定义环境变量
```
    创建文件：
        .env.[mode]
    默认字段配置：
        NODE_ENV [可重置]
        BASE_URL [无法重置]
    自定义字段配置：
        VUE_APP_ + 自定义字段
```
- vue-awesome-swiper 轮播使用
```
    import "swiper/dist/css/swiper.css";
    import { swiper, swiperSlide } from "vue-awesome-swiper";
    import * as swiperAni from "@/common/lib/swiper.animate.js";
```
- custom-element-theme.scss 重置主题/动态皮肤
```
    import 'element-ui/lib/theme-chalk/index.css'       （动态换肤无效，默认样式在后置位打包渲染，依旧会覆盖动态生成的样式）
    import '@/assets/style/custom-element-theme.scss'   （动态换肤无效）
    
    const version = require("element-ui/package.json").version;（锁定版本）
```


### 排错问题
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