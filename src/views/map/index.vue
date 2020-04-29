<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <!-- 地图 -->
      <baidu-map
        class="network-map"
        :center="center"
        :zoom="zoom"
        :scroll-wheel-zoom="true"
        @ready="onReady"
        @click="getPoint"
        @dragend="dragEndEvt">

        <div class="network-map-search" 
          @click="goSearch()">
          <van-search
            shape="round"
            readonly
            background="none"
            placeholder="">
          </van-search>
        </div>

        <!-- 搜索 -->
        <bm-local-search
          style="display:none" 
          :keyword="key" 
          @searchcomplete="onComplete" 
          :auto-viewport="true"></bm-local-search>

        <!-- 当前位置 -->
        <div class="network-map-center" 
          @click="showInfo()">
          <img src="../../assets/images/map/map-center.png" />
        </div>
      </baidu-map>
      
      <!-- 搜索 -->
      <section class="network-panel"
        v-if="searching">
        <div class="network-panel-mask"
          @click="closeSearch"></div>
        <div class="network-address">
          <van-search
            v-model="key"
            shape="round"
            background="#fff"
            show-action
            placeholder="请输入">
            <div slot="action" @click="onSearch">搜索</div>
          </van-search>

          <div class="network-address-list">  
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
            <div class="network-address-item">
              <van-icon name="location-o" :color="primary" size="20" />
              <div class="network-address-text">
                <b>云南白药集团</b>
                <p>云南省昆明市呈贡区呈贡大街8号</p>
              </div>
            </div>
          </div> 
          <p class="network-address-white"></p>
        </div>
      </section>
      
      <!-- 底部 -->
      <div class="network-bar">
        <div class="network-bar-location">
          <span>当前位置</span>
          <p>云南省昆明市西山区广福路2号广福路2号广福路2号</p>
        </div>
        <van-button  
          block 
          round
          :color="primary" 
          @click="onSubmit">确认位置</van-button>
      </div>
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
  name: 'network-confirm',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '确认上报',
      map:null,
      center: {
        lng: 102.71460114, 
        lat: 25.0491531,
        address:'云南省昆明市五华区民权街67号'
      },
      show: false,
      zoom: 15, //放大比例
      searchList: [],
      key: '',
      searching: false
    }
  },
  methods: {
    onReady ({BMap, map}) {
      var self = this;
      this.map = map
      const geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r){
        self.center = {lng: r.point.longitude, lat: r.point.latitude,address:r.address.province}
      },{enableHighAccuracy: true})
    },
    getPoint({type, target, point, pixel, overlay}) {
      console.log('point=',point)
      this.center = {lng:  point.lng, lat: point.lat}
    },
    dragEndEvt({type, target, pixel, point}){
      let centerPoint = this.map.getCenter();
      console.log(centerPoint);
      // this.center.lng = centerPoint.lng;
      // this.center.lat = centerPoint.lat;
      // this.pageNum = 1;
    },
    showInfo() {
      this.$toast(this.center.address)
    },
    goSearch() {
      this.searching = true
    },
    closeSearch() {
      this.searching = false
    },
    onComplete(e) {
      if(!this.key) return
      console.log('===',e)
      this.searchList = e.Ir
    },
    onSearch() {
      this.list = this.searchList
      this.$toast('搜索')
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
.page .van-search__action, 
.page .van-search__action:active {
  color: $color-primary;
  background-color: #fff;
}

.page-footer {
  box-shadow:none;
}

.network {
  
  &-map {
    width:100%;
    height:100%;
    position:relative;

    &-search {
      position:fixed;
      left:20px;
      right:20px;
      top:50px;

      .van-search {
        padding:0;
        border-radius:999px;
        border:1px solid $color-border-gray;
      }
    }

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

  &-panel {
    position:absolute;
    left:0;
    right:0;
    top:0;
    bottom:0;
    z-index:10;
    height:100%;

    &-mask {
      position:absolute;
      left:0;
      right:0;
      top:0;
      bottom:0;
      z-index:11;
      height:100%;
      background-color:rgba(0,0,0,.3);
    }
  }

  &-address {
    position:relative;
    z-index:12;

    &-list {
      height:340px;
      @include scrollable();
      scroll-behavior: smooth;
      @include clearfix();
      margin-top:8px;
      background-color:$color-white;
    }

    &-item {
      @include flex-row();
      align-items:center;
      padding:8px;
      border-bottom:1px solid $color-border-gray;

      &:last-child {
        border-bottom:0;
      }
    }

    &-text {
      margin-left:10px;

      b {
        font-size:14px;
        color:$color-32;
      }

      p {
        font-size:12px;
        color:$color-7d;
        margin-bottom:0;
      }
    }

    &-white {
      height:30px;
      background-color:$color-white;
    }
  }

  &-bar {
    background-color:$color-white;
    padding:10px;
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    z-index:3;

    &-location {
      @include flex-column();

      span {
        font-size:12px;
        color:$color-7d;
        margin-bottom:5px;
      }

      p {
        font-size:14px;
        color:$color-32;
        margin-bottom:8px;
      }
    }
  }
}
</style>