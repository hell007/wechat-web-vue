import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export const constantRouter = [{
  path: '/',
  component: () => import('@/views/home/index'),
  name: '首页'
}, {
  path: '/todo',
  name: 'todo',
  component: () => import('@/views/unit/todo')
}]

//路由详细配置
export default new VueRouter({
  mode: 'hash',
  routes: constantRouter,
  scrollBehavior: () => ({y: 0}),
})
