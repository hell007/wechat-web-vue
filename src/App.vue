<template>
  <!-- 1、设置 -->
  <!-- <keep-alive :include="cached" :max="1">
    <router-view></router-view>
  </keep-alive> -->
  
  <!-- 2、设置 -->
  <div style="width:100%;height:100%;">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
//Vue 实现前进刷新，后退不刷新的效果
// 以order为例

// 1、从其他页面进到列表页，需要刷新获取数据，从详情页返回到列表页时不要刷新


// 2、在详情页中删除对应的列表项，这时返回到列表页时需要刷新重新获取数据。
export default {
  name: 'App',
  data() {
    return {
      cached: [], //['order'] 1、详情页面返回 /order 列表页不会在发请求
    }
  },
  watch: {
    // $route(to, from) {
    //   const fName = from.name
    //   const tName = to.name
    //   console.log('app==', to, from)
    //   if (from.meta.isRefresh) {
    //     from.meta.isRefresh = false
    //     // 在这里重新请求数据
    //   }
    // }
  },
  created() {

  }
}
</script>
<style lang="scss">
@import './styles/common.scss';
</style>
