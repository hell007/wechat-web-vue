<template>
  <div class="page">
    <div class="page-header">
      <page-title :title="title"></page-title>
    </div>

    <div class="page-main">
      <div class="page-scroller">
        <section class="visit-panel">
          <div class="visit-panel-cell">
            <b>当前位置</b>
            <dl class="visit-panel-info">
              <dt>
                <p>{{ center.address }}</p>
                <p>
                  <span>{{ "经度：" + center.lng }}</span>
                  <span>{{ "纬度：" + center.lat }}</span>
                </p>
              </dt>
            </dl>
          </div>
          <div class="visit-panel-cell">
            <b>范围大小</b>
            <van-radio-group
              style="padding: 6px 0"
              @change="radioChange"
              v-model="radius"
              direction="horizontal"
            >
              <van-radio checked-color="rgb(243, 152, 0)" name="500">500米</van-radio>
              <van-radio checked-color="rgb(243, 152, 0)" name="1000">1km</van-radio>
              <van-radio checked-color="rgb(243, 152, 0)" name="2000">2km</van-radio>
            </van-radio-group>
          </div>
        </section>

        <!-- 地图 -->
        <baidu-map
          class="visit-map"
          :center="center"
          :zoom="zoom"
          :scroll-wheel-zoom="true"
          @ready="onReady"
          @click="clickMapEvt"
          @dragend="dragEndEvt"
        >
          <bm-circle
            ref="cir"
            :center="center"
            :radius="radius"
            :fillOpacity="0.5"
            strokeColor="grey"
            :strokeOpacity="0.5"
            :strokeWeight="2"
          ></bm-circle>
          <section class="visit-search">
            <van-search
              v-model="key"
              shape="round"
              background="#fff"
              @search="onSearch"
              :clearable="false"
              show-action
              @focus="onFocus"
              @input="onChange"
              placeholder="输入关键字搜索"
              ref="search"
            >
              <span slot="action" @click="onClear">
                <van-icon name="clear" size="16" color="#c8c9cc" />
              </span>
            </van-search>
            <!-- 搜索历史 -->
            <div class="visit-search-history" v-if="historyShow">
              <ul>
                <li
                  class="history-item"
                  v-for="(item, index) in historyList"
                  @click="searchHistory(item.name)"
                  :key="index"
                >
                  <van-icon class="history-item-icon" name="search" size="16" />
                  <span class="history-item-name">{{ item.name }}</span>
                </li>
              </ul>
            </div>
            <!-- 搜索结果 -->
            <div class="visit-search-result" v-if="resultShow">
              <content-with-empty :empty="noData" tips="暂无数据！">
                <van-list
                  class="visit-company"
                  v-model="loadding"
                  :finished="finished"
                  :immediate-check="false"
                  :offset="10"
                  finished-text="没有更多数据了！"
                  @load="onLoad"
                >
                  <li
                    class="result-item"
                    v-for="record in locationList"
                    @click="goLocation(record.point, record.address)"
                  >
                    <span class="result-item-name">{{ record.name }}</span>
                    <span class="result-item-info"
                      >{{ record.distance + "m" }} | {{ record.address }}</span
                    >
                  </li>
                </van-list>
              </content-with-empty>
            </div>
          </section>

          <!-- 当前位置 -->
          <div class="visit-map-center" @click="showInfo()">
            <img src="../../assets/images/map/map-center.png" />
          </div>
        </baidu-map>
      </div>
    </div>

    <div class="page-footer" style=" background-color:transparent;">

        <van-button block :color="primary" @click="onSubmit"
          >确定</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { fetchGet, fetchPost } from '@/api';
import BaiduMap from 'vue-baidu-map'
import contentWithEmpty from '@/components/contentWithEmpty'
import { isEmpty } from '@/utils'
Vue.use(BaiduMap, {
  ak: 'GGq2cszWgcFIsAczly1ntjYNAbUw8R8P'
})

import { theme } from '@/config'
export default {
  name: 'flow-position',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      radius: "500",
      primary: theme.primary,
      title: '选择位置',
      map: null,
      center: { lng: 102.743007, lat: 25.03255, address: '云南省昆明市五华区' },
      show: false,
      zoom: 15, //放大比例
      param: null,
      path: '',
      range: '',
      positionArea: null,
      key: '',
      historyList: [],
      historyShow: false,
      resultList: [],
      resultShow: false,
      noData: false,// 没有数据
      loadding: false,//上拉加载
      finished: false,//上拉加载完毕
      pageNum: 1,//页码
      pageSize: 10, //数据条数
      locationAll: [],
      locationList: [],
    }
  },
  methods: {
    radioChange() {
      this.$refs.cir.reload()
    },
    onReady({ BMap, map }) {
      this.map = map;
      this.startPositionAddress();
    },
    // onReady ({BMap, map}) {
    //   let self = this;
    //   this.map = map
    //   let geolocation = new BMap.Geolocation()
    //   geolocation.getCurrentPosition(function(r){
    //     self.center.lng = r.point.lng
    //     self.center.lat = r.point.lat
    //   },{enableHighAccuracy: true})
    // },
    getPoint({ type, target, point, pixel, overlay }) {
      //console.log('point=',point)
      this.center = { lng: point.lng, lat: point.lat }
       this.$refs.cir.reload()
    },
    dragEndEvt() {


      let self = this;
      let centerPoint = this.map.getCenter();
      let geoCoder = new BMap.Geocoder();

      geoCoder.getLocation(centerPoint, function ({ address }) {
        self.dragCheck(centerPoint.lng, centerPoint.lat, address);
      });

    },
    showInfo() {
      this.$toast(this.center.address)
    },
    //IOS定位回调
    getCoordinatesInfo(jsonData) {
      const self = this;
      let result = JSON.parse(jsonData);
      self.center.lat = result.latitude;//纬度
      self.center.lng = result.longitude;//经度
      self.center.address = result.locationAddress;//定位地址
      self.center.adCode = result.adCode;
      self.dragCheck(self.center.lng, self.center.lat, self.center.address);
       this.$refs.cir.reload()
    },
    onSubmit() {
     this.$emit("changepositionShow",false,{
        longitude: this.center.lng,
        latitude: this.center.lat,
        radius:this.radius,
       address: this.center.address
     })
    },
    dragCheck(lng, lat, address) {
      let self = this;
      let param = {
        longitude: lng,
        latitude: lat,
        range: self.range
      }
      self.center.lng = lng;
      self.center.lat = lat;
      self.center.address = address
       this.$refs.cir.reload()
      fetchGet('/flep/app/api/process/track/dragCheck', param).then(response => {
        const data = response.data;
        if (data.status == 200) {
          self.positionArea = data.body;
        } else {
          self.$toast(data.body);
          //self.map.centerAndZoom(new BMap.Point(self.center.lng, self.center.lat), self.zoom);
        }
      }).catch(() => {
        self.$toast('网络异常');
      });
      this.$refs.cir.reload()
    },
    startPositionAddress() {
      const self = this;
      if (this.$route.query.center) {
        this.center = this.$route.query.center;
           this.$refs.cir.reload()
        return;
      }
      let componentResult = JSON.parse(sessionStorage.getItem("componentResult"));
      if (componentResult) {
        for (let i = 0; i < componentResult.length; i++) {
          let item = componentResult[i];
          if ("positionfield" == item.componentName && item.componentValue) {
            this.center = JSON.parse(item.componentValue);
               this.$refs.cir.reload()
            return;
          }
        };
      }
      fetchGet('/flep/app/api/sys/getLoginUser', null).then(response => {
        const data = response.data;
        if (data.status == 200) {
          if (JSON.stringify(data.body.userAgent) != JSON.stringify({})) {
            const platForm = data.body.userAgent.platForm;
            if (platForm == 'iOS') {
              if (!window || !window.webkit) {
                self.$toast("未获取到iso对象");
                return;
              }
              window.webkit.messageHandlers.getLocation.postMessage("");
            } else if (platForm == 'Android') {
              if (!window || !window.android) {
                self.$toast("未获取到android对象");
                return;
              }
              let jsonString = window.android.getLocation();
              let result = JSON.parse(jsonString);
              self.center.lat = result.latitude;//纬度
              self.center.lng = result.longitude;;//经度
              let address = result.province + result.city + result.district + result.street + result.streetNumber;
              self.center.address = address;//定位地址
              self.center.adCode = result.adCode;
              self.dragCheck(self.center.lng, self.center.lat, self.center.address);
            }
          }
        } else {
          self.$toast(data.body);
        }
      }).catch(() => {
        self.$toast('定位失败');
      });
      this.$refs.cir.reload()
    },

    compare: (x, y) => {//比较函数
      if (parseFloat(x.distance) < parseFloat(y.distance)) {
        return -1;
      } else if (parseFloat(x.distance) > parseFloat(y.distance)) {
        return 1;
      } else {
        return 0;
      }
    },
    searchHistory(key) {
      this.key = key;
      if (!isEmpty(key)) {
        this.onSearch();
      }
    },
    onSearch() {
      if (isEmpty(this.key)) {
        this.$toast("请输入关键字")
        return;
      }
      let vanToast = this.$toast.loading({
        message: '正在查询...',
        forbidClick: true,
        duration: 0, // 持续展示 toast
        loadingType: 'spinner'
      });

      //console.log(this.key)
      var flag = false;
      this.historyList.some(h => {
        if (h.name == this.key) {
          flag = true;
          return true;
        }
      })
      if (!flag)//不包含关键字
        this.historyList[this.historyList.length % 2] = { name: this.key };
      this.finished = false;
      this.historyShow = false
      this.resultShow = false;
      this.locationAll.splice(0);
      this.locationList.splice(0);
      this.pageNum = 1;
      let currentPoint = new BMap.Point(this.center.lng, this.center.lat);
      var options = {
        pageCapacity: 50,
        onSearchComplete: (results) => {
          // 判断状态是否正确
          if (localSearch.getStatus() == BMAP_STATUS_SUCCESS) {
            var totalPages = results.getNumPages();
            var currPage = results.getPageIndex();// 获取当前是第几页数据
            //console.log("totalPages"+totalPages+",currPage="+currPage);
            if (currPage < totalPages - 1) {
              for (let i = 0; i < results.getCurrentNumPois(); i++) {
                this.locationAll.push({
                  "name": results.getPoi(i).title, "address": results.getPoi(i).address, "point": results.getPoi(i).point,
                  "distance": this.map.getDistance(results.getPoi(i).point, currentPoint).toFixed(0)
                });
              }
              localSearch.gotoPage(currPage + 1); // 遍历到最后一页之后不再进行下一页搜索，此时，已经获取到全部的搜索结果，
            } else {// 已经到达最后一页结果
              for (let i = 0; i < results.getCurrentNumPois(); i++) {
                this.locationAll.push({
                  "name": results.getPoi(i).title, "address": results.getPoi(i).address, "point": results.getPoi(i).point
                  , "distance": this.map.getDistance(results.getPoi(i).point, currentPoint).toFixed(0)
                });
              }
              this.locationAll.sort(this.compare);
              this.locationList.push(...this.getPageData(this.pageSize, 1));
              this.pageNum++;
              this.resultShow = true;
              vanToast.clear();
            }
          } else {
            this.locationList.splice(0);
            this.resultShow = false;
            this.historyShow = false;
            this.$toast.fail({ message: '未搜索到结果', duration: 1000 });
          }
        }
      };
      let localSearch = new BMap.LocalSearch(this.map, options);
      localSearch.searchNearby(this.key, currentPoint, 10000);
      this.$refs.cir.reload()
    },
    onChange(str) {
      if (isEmpty(str)) {
        this.locationList.splice(0);
        this.resultShow = false;
        if (this.historyList.length > 0) this.historyShow = true;
      } else {
        if (this.locationList.length > 0) {
          this.historyShow = false;
          this.resultShow = true;
        } else {
          if (this.historyList.length > 0) {
            this.historyShow = true;
            this.resultShow = false;
          } else {
            this.historyShow = false;
            this.resultShow = false;
          }
        }
      }
    },
    onClear() {
      this.key = '';
      this.locationList.splice(0);
      if (this.historyList.length > 0) {
        this.historyShow = true
      } else {
        this.historyShow = false;
      }
      this.resultShow = false;
    },
    onFocus() {
      if (isEmpty(this.key)) {
        if (this.historyList.length > 0) {
          this.historyShow = true
        }
        this.resultShow = false;
      }
      else {
        if (this.locationList.length > 0) {
          this.historyShow = false;
          this.resultShow = true;
        } else {
          if (this.historyList.length > 0) {
            this.historyShow = true;
            this.resultShow = false;
          } else {
            this.historyShow = false;
            this.resultShow = false;
          }
        }
      }
    },
    hide() {
      this.resultShow = false;
      this.historyShow = false;
    },
    goLocation(point, address) {
      this.map.centerAndZoom(point, this.zoom);
      this.center = { lng: point.lng, lat: point.lat, address: address };
      this.resultShow = false;
    },
    onLoad() {
      this.loadding = true;
      this.finished = false;
      var list = this.getPageData(this.pageSize, this.pageNum);
      this.loadding = false;
      if (list.length == 0) {
        this.finished = true;
      } else {
        this.pageNum++;
        this.finished = false;
      }
      this.locationList.push(...list);
    },
    getPageData(pageSize, pageNum) {
      let location;
      var result = [];
      for (var i = (pageNum - 1) * pageSize, j = 1; j <= pageSize && i <= this.locationAll.length - 1;
        j++, i++) {
        location = this.locationAll[i];
        result.push({ "name": location.name, "address": location.address, "distance": location.distance, "point": location.point })
      }
      return result;
    },
    clickMapEvt({ type, target }) {
      this.hide();
      this.$refs.cir.reload()
    }
  },
  created() {
    let self = this;
    if (this.$route.query.path) {
      this.path = this.$route.query.path;
      this.range = this.$route.query.range;
      if (this.$route.query.param) {
        this.param = JSON.parse(this.$route.query.param);
      }
      if (this.$route.query.center) {
        this.center = this.$route.query.center;
      } else {
        let componentResult = JSON.parse(sessionStorage.getItem("componentResult"));
        if (componentResult) {
          componentResult.forEach(e => {
            if ("positionfield" == e.componentName && e.componentValue) {
              this.center = JSON.parse(e.componentValue);
            }
          });
        }
      }
    }
  },
  mounted() {
    window['getCoordinatesInfo'] = (jsonData) => {
      this.getCoordinatesInfo(jsonData);
    }
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.visit {
  &-panel {
    //margin:8px 0;
    padding: 0 16px;
    background-color: $color-white;

    &-cell {
      padding: 8px 0;
    }

    &-info {
      font-size: 14px;
      @include flex-row();
      align-items: center;
      margin-top: 8px;
      margin-bottom: 0;

      dt,
      dd {
        font-weight: normal;
        margin-bottom: 0;
      }

      dt {
        flex: 6;
      }

      dd {
        flex: 1;
        text-align: center;
      }

      p {
        margin-bottom: 4px;
        color: $color-7d;
        font-size: 12px;
      }

      span {
        margin-right: 10px;
      }
    }
  }

  &-search {
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    z-index: 100;

    .van-search {
      padding: 0;
      border-radius: 4px;
      box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
    }
    .van-search__content {
      background: #fff;
    }

    .van-search__action,
    .van-search__action:active {
      margin-top: 6px;
      background: #fff;
    }

    &-history,
    &-result {
      max-height: calc(100vh - 200px);
      margin-top: 5px;
      padding: 0 8px;
      border-radius: 4px;
      background: #fff;
      overflow-x: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
      scroll-behavior: smooth;

      ul {
        margin-bottom: 0;
      }

      li {
        padding: 8px 0px;
        border-top: 1px solid $color-border-gray;

        &:first-child {
          border-top: 0;
        }
      }

      .history-item {
        @include flex-row();
        align-items: center;

        &-icon {
          margin-right: 5px;
        }

        &-name {
          flex: 3;
          font-size: 12px;
          color: $color-96;
        }
      }

      .result-item {
        @include flex-column();

        &-name {
          font-size: 12px;
          color: $color-32;
        }

        &-info {
          font-size: 10px;
          color: $color-96;
        }
      }
    }
  }

  &-map {
    width: 100%;
    height: calc(100vh - 100px);
    min-height: 260px;
    position: relative;

    &-center {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 18px;
      height: 30px;
      margin-left: -9px;
      margin-top: -30px;
    }
  }

  &-submit {
    background-color: $color-white;
    margin: 10px;
  }
}
</style>
