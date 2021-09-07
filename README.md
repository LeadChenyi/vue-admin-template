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
- [√] 标签栏
- [√] 菜单栏
- [√] 用户鉴权
    + [√] user 用户管理
    + [√] rule 角色管理
    + [√] menu 菜单管理（后端处理菜单路由权限，前端处理菜单路由守卫）
    + [√] permission 操作权限
- [-] 首页仪表盘
    + pv、uv 流量覆盖折线图
    + 城市分布图
    + 监控日志
- [-] 其它需求    
    + 整理常用脚本 
    + [√] 点击元素、按F11、按Esc全屏状态同步更新
        ```
            1、已知如果是按F11进入全屏，那么只能再次按F11退出全屏；如果是点击元素进入全屏，那么可以再次点击元素或者按Esc退出全屏，
            2、全屏模式下是无法监听F11和Esc键盘事件的，所以退出全屏操作全权由resize事件代替；而非全屏下监听F11必定是能触发的，所以阻止F11默认行为，使用自定义的方法进入全屏。
            3、无论进入还是退出全屏都会触发resize事件，所以在此阶段判断是否全屏状态并同步更新
        ```
    + 预览PDF文件
    + 主题动态变化
    + 轮播

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


### 常见问题
- 安装模块依赖包时如何对应版本
```
    1、安装模块依赖包时先注意查看该模块版本支持情况
    2、如果有需要安装依赖于Node的插件包，先查看本地Node版本，再寻找所对应的插件版本安装
    3、最后安装模块依赖包
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