<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="visit-panel">
        <div class="visit-panel-row">
          <b>客户信息</b>
          <span>云南白药集团</span>
        </div>
        <div class="visit-panel-row">
          <b>客户编码</b>
          <span>123456</span>
        </div>
      </section>

      <section class="visit-panel">
        <div class="visit-panel-cell">
          <b>客户位置信息</b>
          <dl class="visit-panel-info">
            <dt>
              <p>昆明市呈贡新区呈贡路呈贡新区呈贡路</p>
              <p>
                <span>经度：102</span>
                <span>维度：25</span>
              </p>
            </dt>
            <dd>
              <van-icon name="close" size="20" :color="primary"/>
            </dd>
          </dl>
        </div>
      </section>

      <section class="visit-panel" style="margin-bottom:0;">
        <div class="visit-panel-cell">
          <b>当前位置</b>
          <dl class="visit-panel-info">
            <dt>
              <p>昆明市呈贡新区呈贡路呈贡新区呈贡路</p>
              <p>
                <span>经度：102</span>
                <span>维度：25</span>
              </p>
            </dt>
          </dl>
        </div>
      </section>

      <!-- 地图 -->
      <baidu-map
        class="visit-map"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @click="getPoint">

        <div class="visit-map-center" 
          @click="showInfo()">
          <img src="../../assets/images/map/map-center.png" />
        </div>
      </baidu-map>
      
    </div>
  </div>

  <div class="page-footer">
    <div class="visit-submit">
      <van-button  
        block 
        :color="primary" 
        @click="onSubmit">提交客户位置</van-button>
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
  name: 'visit-location',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '客户位置维护',
      center: {
        lng: 102.71460114, 
        lat: 25.0491531,
        address:'云南省昆明市五华区民权街67号'
      },
      show: false,
      zoom: 15, //放大比例
    }
  },
  methods: {
    onReady ({BMap, map}) {
      var self = this;
      const geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        self.center = {lng: r.point.longitude, lat: r.point.latitude,address:r.address.province}
      },{enableHighAccuracy: true})
    },
    getPoint({type, target, point, pixel, overlay}) {
      console.log('point=',point)
      this.center = {lng:  point.lng, lat: point.lat}
    },
    showInfo() {
      this.$toast(this.center.address)
    },
    onSubmit() {
      this.$toast('手工上报')
    }
  },
  created() {
    
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.visit {

  &-panel {
    margin:8px 0;
    padding:0 16px;
    background-color:$color-white;

    &-row {
      @include flex-row();
      align-items:center;
      padding:10px 0;
      font-size:14px;
      border-bottom:1px solid $color-border-gray;

      &:last-child {
        border-bottom:0;
      }

      b {
        flex:1.5;
      }

      span {
        flex:3;
        text-align:right;
        color:$color-7d;
      }
    }

    &-cell {
      padding:8px 0;
    }

    &-info {
      font-size:14px;
      @include flex-row();
      align-items:center;
      margin-top:8px;
      margin-bottom:0;

      dt,dd {
        font-weight:normal;
        margin-bottom:0;
      }

      dt {
        flex:6;
      }

      dd {
        flex:1;
        text-align:center;
      }

      p {
        margin-bottom:4px;
        color:$color-7d;
        font-size:12px;
      }

      span {
        margin-right:10px;
      }
    }
  }
  
  &-map {
    width:100%;
    height:70%;
    min-height:260px;
    position:relative;

    &-center {
      position:absolute;
      left:50%;
      top:50%;
      width:18px;
      height:30px;
      margin-left:-9px;
      margin-top:-38px;
    }
  }

  &-submit {
    background-color:$color-white;
    margin:10px;
  }
}
</style>