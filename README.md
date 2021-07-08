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

### 用户角色
- permission 操作权限 [wait]
- menu 动态菜单路由

### 功能
- language 切语言
- theme skin 换皮肤
- fullscreen 全屏
- swiper 轮播
- excel 导入导出
- editor 富文本编辑