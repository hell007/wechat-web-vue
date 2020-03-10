
# 微信小程序 vs web项目合并开发

1、安装 webpack webpack-cli

	yarn add -g webpack webpack-cli


## 目录结构

```
|---build
|    |---miniprogram.config.js // mp-webpack-plugin 插件配置
|    |---webpack.mp.config.js // 小程序端 webpack 配置
|    |---webpack.base.config.js // web 端 webpack基本配置
|    |---webpack.pro.config.js // web 端 webpack生产 配置
|    |---webpack.dev.config.js // web 端 webpack开发 配置
|
|---dist 目标代码目录
|    |---web // web 端
|    |---mp // 小程序端
|
|---src // 源码目录
|    |---main.js // web 端用主入口
|    |---main.mp.js // 小程序端用主入口
|
|---public
|    |---index.html // web 端输出页面
```

## 构建 web 端代码

```
npm run dev
```

开发调试


```
npm run build
```

在 dist/web 目录下会输出 web 端目标代码。

## 构建小程序端代码

```
npm run mp
```

然后进入 dist/mp 目录下执行：

```
npm install
```

用开发者工具将 dist/mp 目录作为小程序项目导入之后，点击工具栏下的`构建 npm`，即可预览效果。


## 总结

### 1、Vue 实现前进刷新，后退不刷新的效果

- 参考order为例

1. App.vue roter-view 设置

2. 路由回退需要更改为 $router.go(-1)

3. router meta 设置 keepAlive


### 2、