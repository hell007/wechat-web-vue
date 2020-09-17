<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <!-- 地图 -->
      <baidu-map
        class="position-map"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="onReady"
        @click="getPoint"
        @dragend="dragEndEvt">

        <div class="position-location">
          <b>当前位置</b>
          <div class="position-location-address">
            {{center.address}}
          </div>
          <div class="position-location-text">
            <span>经度：{{center.lng}}</span>
            <span>维度：{{center.lat}}</span>
          </div>
        </div>

        <!-- 当前位置 -->
        <div class="position-map-center" 
          @click="showInfo()">
          <img src="../../assets/images/map/map-center.png" />
        </div>
      </baidu-map>
    </div>
  </div>
  
  <div class="page-footer">
    <div class="position-bar">
      <van-button  
        block 
        round
        :color="primary" 
        @click="onSubmit">确定</van-button>
    </div>
  </div>
</div>
</template>

<script>
import Vue from 'vue'
import BaiduMap from 'vue-baidu-map'
Vue.use(BaiduMap, {
  ak: 'GGq2cszWgcFIsAczly1ntjYNAbUw8R8P'
})

import { theme } from '@/config'
export default {
  name: 'flow-position',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '选择位置',
      map:null,
      center: {
        lng: '', 
        lat: '',
        address:''
      },
      show: false,
      zoom: 15, //放大比例
    }
  },
  methods: {
    onReady ({BMap, map}) {
      var self = this;
      this.map = map
      let geolocation = new BMap.Geolocation()

      geolocation.getCurrentPosition(function(r){
        self.center.lng = r.point.lng
        self.center.lat = r.point.lat
      },{enableHighAccuracy: true})
    },
    getPoint({type, target, point, pixel, overlay}) {
      console.log('point=',point)
      this.center = {lng:  point.lng, lat: point.lat}
    },
    dragEndEvt(){
      var self = this;
      let centerPoint = this.map.getCenter();
      this.center.lng = centerPoint.lng;
      this.center.lat = centerPoint.lat;
      //地址解析器
      let geoCoder = new BMap.Geocoder();
      geoCoder.getLocation(centerPoint,function ({address}) {
        self.center.address = address;
      });
    },
    showInfo() {
      this.$toast(this.center.address)
    },
    onSubmit() {
      this.$toast('确定')
    }
  },
  created() {
    
  },
  mounted() {
    console.log(this.center)
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.page-scroller {
  overflow:hidden;
}

.position {
  
  &-map {
    flex:1;
    width:100%;
    height:100%;
    position:relative;

    &-center {
      position:absolute;
      left:50%;
      top:50%;
      width:18px;
      height:30px;
      margin-left:-9px;
      margin-top:-15px;
    }
  }

  &-location {
    position:fixed;
    left:0px;
    right:0px;
    top:0px;
    padding:10px;
    background-color:$color-white;
    @include flex-column();

    b {
      font-size:14px;
      color:$color-32;
      margin-bottom:3px;
    }

    &-address,
    &-text {
      font-size:12px;
      color:$color-7d;
      margin-bottom:3px;
    }

    &-text {
      span {
        margin-right:20px;
      }
    }
  }

  &-bar {
    background-color:$color-white;
    padding:10px;
  }
}
</style>