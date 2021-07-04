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
- permission 权限验证 [wait]

### 数据模拟
- mockjs 伪造数据\请求拦截
- axios HTTP请求\请求拦截\封装请求 [wait]

### 状态管理
- app为全局状态管理