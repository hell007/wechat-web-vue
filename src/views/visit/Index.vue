<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
    <section class="visit-search">
      <div class="visit-search-label">
        <van-search
          v-model="key"
          shape="round"
          background="#fff"
          show-action
          placeholder="集团名称/集团编码">
          <div slot="action" @click="onSearch">
            <van-button 
              round 
              size="small" 
              :color="primary">搜索</van-button>
          </div>
        </van-search>
      </div>
      <div class="visit-search-btn">
        <van-icon name="clock-o" size="20" :color="primary" />
      </div>
    </section>
  </div>

  <div class="page-main">
    <div class="page-scroller">
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
      <section class="visit-company">
        <div class="visit-company-item">
          <div class="visit-company-hd">
            <div class="com-logo">
              <img src="../../assets/images/icons/store-img.jpg"/>
            </div>
            <div class="com-name">
              <b>云南白药集团</b>
              <p>距您393米 | 民航路76号附近</p>
            </div>
            <div class="com-way">
              <van-icon class-prefix="xa-icon" name="way" size="20" />
              <em>路线</em>
            </div>
          </div>
          <div class="visit-company-bd">
            <div class="com-text">
              <p>本月已拜访：0次</p>
              <p>最近一次拜访时间：2020-4-17 12:00</p>
              <p>关键人：张三 李四</p>
            </div>
            <div class="com-btn">
              <van-button
                round
                size="small"
                :color="primary">去拜访</van-button>
            </div>
          </div>
        </div>
        <div class="visit-company-item">
          <div class="visit-company-hd">
            <div class="com-logo">
              <img src="../../assets/images/icons/store-img.jpg"/>
            </div>
            <div class="com-name">
              <b>云南白药集团</b>
              <p>距您393米 | 民航路76号附近</p>
            </div>
          </div>
          <div class="visit-company-bd">
            <div class="com-text">
              <p>本月已拜访：0次</p>
              <p>最近一次拜访时间：2020-4-17 12:00</p>
              <p>关键人：张三 李四 张三 李四 张三 李四</p>
            </div>
            <div class="com-btn">
              <van-button
                round
                size="small"
                :color="primary">设置位置</van-button>
            </div>
          </div>
        </div>
        <div class="visit-company-item">
          <div class="visit-company-hd">
            <div class="com-logo">
              <img src="../../assets/images/icons/store-img.jpg"/>
            </div>
            <div class="com-name">
              <b>云南白药集团</b>
              <p>距您393米 | 民航路76号附近</p>
            </div>
            <div class="com-way">
              <van-icon class-prefix="xa-icon" name="way" size="20" />
              <em>路线</em>
            </div>
          </div>
          <div class="visit-company-bd">
            <div class="com-text">
              <p>本月已拜访：0次</p>
              <p>最近一次拜访时间：2020-4-17 12:00</p>
              <p>关键人：张三 李四</p>
            </div>
            <div class="com-btn">
              <van-button
                round
                size="small"
                :color="primary">去拜访</van-button>
            </div>
          </div>
        </div>
      </section>
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
  name: 'visit-index',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '客户拜访服务',
      center: {
        lng: 102.71460114, 
        lat: 25.0491531,
        address:'云南省昆明市五华区民权街67号'
      },
      show: false,
      zoom: 15, //放大比例
      key: ''
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
    onSearch() {
      this.$toast('搜索')
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

.visit {

  &-search {
    @include flex-row();
    align-items:center;
    background-color:$color-white;

    &-label {
      flex:8;
    }

    &-btn {
      flex:1;
      text-align:center;
    }

  }
  
  &-map {
    width:100%;
    height:200px;
    overflow:hidden;
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

  &-company {
    background-color:$color-white;

    &-item {
      padding:10px;
      border-bottom:1px solid $color-border-gray;
    }

    &-hd {
      @include flex-row();
      align-items:center;
      margin-bottom:8px;

      .com-logo {
        width:40px;
        height:40px;
        margin-right:10px;
        overflow:hidden;
      }

      .com-name {
        flex:4;

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

      .com-way {
        flex:1;
        @include flex-column();
        text-align:center;

        i {
          color:$color-96;
        }

        em {
          font-style:normal;
          font-size:12px;
          transform:scale(.8);
        }
      }
    }

    &-bd {
      @include flex-row();

      .com-text {
        flex:3;

        p {
          //font-size:12px;
          margin-bottom:8px;
          color:$color-7d;
        }
      }

      .com-btn {
        flex:1;
        position:relative;

        .van-button {
          position:absolute;
          bottom:0;
          right:0;
          width:70px;
        }
      }
    }
  }

}
</style>