import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//异步组件 component: () => import ('@/views/xxx')
export const constantRouter = [{
  path: '/',
  name: '首页',
  component: () =>
    import ('@/views/unit/index')
}, {
  path: '/component',
  name: '通用组件',
  component: () =>
    import ('@/views/unit/component')
}, {
  path: '/refresh',
  name: '下拉刷新上拉加载',
  component: () =>
    import ('@/views/unit/refresh') 
}, {
  path: '/list',
  name: '上拉加载',
  component: () =>
    import ('@/views/unit/list')
}, {
  path: '/table',
  name: '表格',
  component: () =>
    import ('@/views/table/index')
}, {
  path: '/filter',
  name: '表单筛选',
  component: () =>
    import ('@/views/form/index')
}, {
  path: '/register',
  name: '表单填写',
  component: () =>
    import ('@/views/form/register')
}, {
  path: '/address',
  name: '表单联动',
  component: () =>
    import ('@/views/form/address')
}, {
  path: '/formDetail',
  name: '表单展示',
  component: () =>
    import ('@/views/form/detail')
}, {
  path: '/picture',
  name: '图片',
  component: () =>
    import ('@/views/picture/index')
}, {
  path: '/echarts',
  name: '图表',
  component: () =>
    import ('@/views/echarts/index')
}, {
  path: '/map',
  name: '百度地图',
  component: () =>
    import ('@/views/map/index')
}, {
  path: '/location',
  name: '地图定位',
  component: () =>
    import ('@/views/map/location')
}, {
  path: '/category',
  name: '我的分类',
  component: () =>
    import ('@/views/category/index')
}, {
  path: '/categoryDetail',
  name: '分类详情',
  component: () =>
    import ('@/views/category/detail')
}, {
  path: '/categoryRepeat',
  name: '问答和提问',
  component: () =>
    import ('@/views/category/repeat')
}, {
  path: '/categoryReply',
  name: '回复',
  component: () =>
    import ('@/views/category/reply')
}, {
  path: '/collection',
  name: '我的收藏',
  component: () =>
    import ('@/views/collection/index')
}, {
  path: '/message',
  name: '我的消息',
  component: () =>
    import ('@/views/message/index')
}, {
  path: '/order',
  name: '我的订单',
  component: () =>
    import ('@/views/order/index'),
  meta: {
    keepAlive: true
  },   
}, {
  path: '/orderDetail',
  name: '订单详情',
  component: () =>
    import ('@/views/order/detail'),
  meta: {
    keepAlive: true
  },  
}, {
  path: '/orderSteps',
  name: '订单进度',
  component: () =>
    import ('@/views/order/steps'),
  meta: {
    keepAlive: false
  }, 
}, {
  path: '/search',
  name: '搜索',
  component: () =>
    import ('@/views/search/index')
}, {
  path: '/smart',
  name: '智能搜索',
  component: () =>
    import ('@/views/search/smart')
}, {
    path: '/addressbook',
    name: '通讯录',
    component: () =>
      import ('@/views/addressbook/Index')
  }, {
    path: '/addressbookSearch',
    name: '通讯录',
    component: () =>
      import ('@/views/addressbook/Search')
  }, {
    path: '/addressbookDetail',
    name: '',
    component: () =>
      import ('@/views/addressbook/Detail')
  }, , {
    path: '/flow',
    name: '流程管理',
    component: () =>
      import ('@/views/flow/Index')
  }, {
    path: '/flowSearch',
    name: '流程搜索',
    component: () =>
      import ('@/views/flow/Search')
  }, {
    path: '/flowSteps',
    name: '流程进度',
    component: () =>
      import ('@/views/flow/Steps')
  }, {
    path: '/flowApply',
    name: '上报流程',
    component: () =>
      import ('@/views/flow/Apply')
  }, {
    path: '/flowApprover',
    name: '审批人',
    component: () =>
      import ('@/views/flow/Approver')
  }, {
    path: '/flowTask',
    name: '工单流程',
    component: () =>
      import ('@/views/flow/Task')
  }, {
    path: '/flowTaskApproval',
    name: '工单流程审批',
    component: () =>
      import ('@/views/flow/TaskApproval')
  }, {
    path: '/flowTaskDetail',
    name: '工单流程详情',
    component: () =>
      import ('@/views/flow/TaskDetail')
  }]

//路由详细配置
export default new VueRouter({
  mode: 'hash',
  routes: constantRouter,
  scrollBehavior: () => ({
    y: 0
  }),
})