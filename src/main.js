import Vue from 'vue'
import App from './App'
import router from './router'
//import store from './store'
//import './auth' // 权限

//全局组件
import pageTitle from '@/components/pageTitle'
Vue.component('pageTitle',pageTitle)

// 使用组件
import Vant from 'vant'
import 'vant/lib/index.css'
import 'vant/lib/icon/local.css' //引用字体css
Vue.use(Vant)

//使用插件
// import eventBus from '@/plugins/eventbus'
// Vue.use(eventBus)

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

console.log('NODE_ENV====', process.env.NODE_ENV)
console.log('VUE_APP_BASE_API===', process.env.VUE_APP_BASE_API)

new Vue({
	router,
	//store,
	template: '<App/>',
	render: h => h(App)
}).$mount('#app')
