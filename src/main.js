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

// 引入loading
import loading from '@/components/loading' 
Vue.use(loading)

// 全局变量
// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// webpack预设全局变量
// console.log('NODE_ENV====', process.env.NODE_ENV)
// console.log('VUE_APP_BASE_API===', process.env.VUE_APP_BASE_API)

new Vue({
	router,
	//store,
	template: '<App/>',
	render: h => h(App)
}).$mount('#app')
