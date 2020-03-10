<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
      <div slot="right" class="header-right">
        <span class="header-right-text">
          列表
        </span>
      </div>
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller channel-scroller">
      <baidu-map 
        class="channel-map"
        :center="center" 
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="onReady"
        @click="getPoint">

        <!--地图类型: 两种-->
        <!-- <bm-map-type
          :map-types="['BMAP_HYBRID_MAP','BMAP_NORMAL_MAP']"
          anchor="BMAP_ANCHOR_TOP_RIGHT">
        </bm-map-type> -->
        
        <!-- 定位 -->
        <bm-geolocation 
          anchor="BMAP_ANCHOR_BOTTOM_RIGHT" 
          :showAddressBar="true" 
          :autoLocation="true"
          :locationIcon="{url: require('../../assets/images/map/current-location.png'), size: {width:16, height:16}}"
          @locationSuccess="getLoctionSuccess" 
          @locationError="getLocationError">
        </bm-geolocation>
        
        <!-- 覆盖物 -->
        <bm-marker 
          animation="BMAP_ANIMATION_BOUNCE"
          :dragging="true"
          v-for="item,index in list"
          :key="index"
          :position="{lng:item.longitude, lat:item.latitude}"  
          :icon="{url: item.icon, size: {width:16, height:16}}"
          @click="showInfo(item)">
        </bm-marker>
      </baidu-map>
      
      <!-- 自定义搜索 -->
      <form action="/" class="channel-search">
       <van-search
          background="rgba(0,0,0,.2)"
          clearable
          v-model="key"
          placeholder="请输入渠道"
          shape="square"
          @search="onSearch">
        </van-search>
      </form>
      
      <!-- 移动logo -->
      <div class="channel-logo"></div>
      
      <!-- 点击获取地址详情 -->
      <div :class="`channel-info ${show ? 'on' : ''}`">
        <div class="channel-info-bd">
          <div class="channel-info-shop">景洪市铂金广场沟通100加盟店</div>
          <address class="channel-info-address">
            云南省大理白族自治州洱源县凤翔凤羽线凤羽镇政府附近
          </address>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
// vue-baidu-map api 
// https://dafrok.github.io/vue-baidu-map/#/zh/start/usage
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'GGq2cszWgcFIsAczly1ntjYNAbUw8R8P'    
})
import * as utils from '@/utils'
export default {
  name: 'channel-map',
  components: {
  },
  data() {
    return {
      title: '渠道地图',
      key: '', //搜索框关键词
      center: {lng: 0, lat: 0},
      show: false,
      zoom: 3, //放大比例
      list: []
    }
  },
  methods: {
    navBack() {
      this.$router.back();
    },
    onSearch() {
      this.$toast(this.key)
    },
    onReady ({BMap, map}) {
      //console.log(BMap, map)
      const self = this
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        console.log('r===', r);
        self.center = {lng: r.longitude, lat: r.latitude}
        self.zoom = 15
      },{enableHighAccuracy: true})
    },
    getPoint(e) {
      console.log('e=',e)
    },
    showInfo(scope) {
      console.log('scope=',scope)
      this.show = true
    },
    getLoctionSuccess() {
      this.$toast('定位成功！')
    },
    getLocationError() {
      this.$toast('定位失败！')
    }
  },
  created() {
    const self = this
    utils.delay(1000).then(function() {
      self.list = Array(10)
        .fill(null)
        .map(function() {
          return {
            icon: require('../../assets/images/map/icon-social.png'),
            longitude: '102.738316',
            latitude: '25.034749',
            shop:'景洪市铂金广场沟通100加盟店',
            address: '云南省大理白族自治州洱源县凤翔凤羽线凤羽镇政府附近',
          }
        }) 
    })
  }
}
</script>

<style scoped lang="scss">

</style>