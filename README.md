
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


## 注意

目前编译在小程序里面还不能运行，可能组件需要kbone ui


## 总结

### 1、Vue 实现前进刷新，后退不刷新的效果

- 参考order为例 (两种方式)

		1. App.vue roter-view 设置
		2. 路由后退需要更改为 $router.go(-1)
		3. router meta 设置 keepAlive

### 2、Vue provide/inject

provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，
而在任何后代组件中，我们都可以使用 inject 来接收 provide 提供的数据或方法


		// 根组件提供将自身提供给后代组件
		export default {
		  provide () {
		    return {
		      app: this
		    }
		  },
		  data () {
		    return {
		      text: 'bar'
		    }
		  }
		}

		// 后代组件注入 'app'
		<template>
			<div>{{this.app.text}}</div>
		</template>
		<script>
		  export default {
		    inject: ['app'],
		    created() {
		      this.app.text = 'baz' // 在模板中，显示 'baz'
		    }
		  }
		</script>


- 提示：provide 和 inject 绑定并不是可响应的。这是刻意为之的。然而，如果你传入了一个可监听的对象，那么其对象的属性还是可响应的。


1、使用 $root 依然能够取到根节点，那么我们何必使用 provide/inject 呢？

	在实际开发中，一个项目常常有多人开发，每个人有可能需要不同的全局变量，如果所有人的全局变量都统一定义在根组件，势必会引起变量冲突等问题。

	使用 provide/inject 不同模块的入口组件传给各自的后代组件可以完美的解决该问题。


2、使用 provide/inject 编写组件

- 解决耦合度的情况

		// Button 组件核心源码
		export default {
		    name: 'ElButton',
		    // 通过 inject 获取 elForm 以及 elFormItem 这两个组件
		    inject: {
		        elForm: {
		            default: ''
		        },
		        elFormItem: {
		            default: ''
		        }
		    },
		    // ...
		    computed: {
		        _elFormItemSize() {
		            return (this.elFormItem || {}).elFormItemSize;
		        },
		        buttonSize() {
		            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
		        },
		        //...
		    },
		    // ...
		};

## 知识


	递归组件、
	动态组件（keep-alive）、
	异步组件、
	全局组件注册、
	内联模板、
	Vue 的构造器——extend、
	vue 修饰符sync深入解析

[15个Vue高级面试题](https://juejin.im/post/5de4d126f265da05c33fcb9d)