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