import Vue from 'vue'
import router from './router'
import App from './App'

new Vue({
	router,
	template: '<App/>',
	render: h => h(App)
}).$mount('#app')
