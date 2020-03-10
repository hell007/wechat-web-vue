<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
      <div slot="right" class="header-right">
        <span class="header-right-icon">
          <van-icon 
            name="clock-o" 
            color="#fff"
            size="18"/>
        </span>
      </div>
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller channel-scroller">
      <div class="channel-panel">
        <van-cell
          title="渠道名称">
          <span>盘龙迅捷环城东路手机卖场（连锁）</span>
          <van-icon 
            name="records" 
            :color="primary"
            size="18"/>
        </van-cell>
        <van-cell
          title="渠道编码"
          value="A0AxxY17">
        </van-cell>
      </div>

      <div class="channel-panel" style="margin-bottom:0;">
        <van-cell
          class="channel-panel-title"
          title="当前位置">
        </van-cell>
        <ul class="location-position">
          <li>{{address}}</li>
          <li>
            <span>经度：{{center.lng}}</span>
            <span>纬度：{{center.lat}}</span>
          </li>
        </ul>
      </div>

      <baidu-map 
          class="channel-map"
          :center="center" 
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          @ready="onReady"
          @click="getPoint">
          
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
    </div>
  </div>
  
  <div class="page-footer">
    <div class="location-bar">
      <van-button 
        class="location-submit"
        round
        :color="primary">提交渠道位置信息</van-button>
    </div>
  </div>
</div>
</template>

<script>
// vue-baidu-map api 使用地址
// https://dafrok.github.io/vue-baidu-map/#/zh/start/usage
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'GGq2cszWgcFIsAczly1ntjYNAbUw8R8P'    
})

import { theme } from '@/config';
export default {
  name: 'channel-location',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '渠道位置收集',
      address: '',
      center: {lng: 0, lat: 0},
      show: false,
      zoom: 3, //放大比例
      list: []
    }
  },
  methods: {
    onReady ({BMap, map}) {
      //console.log(BMap, map)
      const self = this
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        console.log('r===', r)
        self.address = r.address.province + r.address.city
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
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.channel {

  &-panel {
    margin-bottom:$margin;

    .van-cell {
      font-size:12px;
    }

    .van-cell__title {
      color:$color-32;
      flex:1;
    }

    .van-cell__value {
      flex:3;
      color:$color-7d;
      text-align:left;
    }

    &-title {
      
      .van-cell__title {
        color:$color-32;
        font-size:14px;
      }
    }
  }

  &-scroller {
    overflow:hidden;
  }

  &-map {
    width:100%;
    height:100%;
    min-height:200px;
  }
}

.location {

  &-position {
    padding:0 16px;
    background-color:$color-white;

    li {
      @include flex-row();
      padding:8px 0;
      font-size:12px;
      color:$color-7d;

      span {
        flex:1;
      }
    }
  }

  &-bar {
    text-align:center;
    padding:10px 0;
    background-color:$color-white;
  }

  &-submit {
    width:200px;
    margin:0 auto;
  }

}
</style>
