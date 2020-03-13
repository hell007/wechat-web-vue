<template>
<div class="page">
  <div class="page-header" style="box-shadow:none;">
    <page-title :title="title">
    </page-title>
    <section class="reward-header">
      <div class="reward-manager fl">
        <van-icon class-prefix="xa-icon" name="store" size="20" :color="primary" />
        <span class="reward-manager-name" @click="picker.show=true">官渡区经开区世纪城手机专卖店</span>
        <van-icon name="arrow-down" size="12" :color="primary" />
      </div>
      <div class="reward-time fr">
        <van-icon class-prefix="xa-icon" name="date" size="20" :color="primary" />
        <span class="reward-time-date" @click="date.show=true">{{time}}</span>
        <van-icon name="arrow-down" size="12" :color="primary" />
      </div>
    </section>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="reward-tab">
        <van-tabs v-model="active"
          ref="vtabs"
          background="#fff"
          :border="false"
          @click="onTab"
          :color="primary"
          :title-active-color="primary">
          <van-tab title="综合情况">
            <section class="reward-panel" >
              <ul class="reward-grid">
                <li>
                  <div class="reward-grid-col">
                    <span>开头</span>
                    <span><b>37</b><em>元</em></span>
                  </div>
                  <div class="reward-grid-col">
                    <span>终端</span>
                    <span><b>545337</b><em>元</em></span>
                  </div>
                  <div class="reward-grid-col">
                    <span>数字家庭</span>
                    <span><b>2537</b><em>元</em></span>
                  </div>
                </li>
                <li>
                  <div class="reward-grid-col">
                    <span>套餐合约</span>
                    <span><b>37</b><em>元</em></span>
                  </div>
                  <div class="reward-grid-col">
                    <span>其他营销活动</span>
                    <span><b>545337</b><em>元</em></span>
                  </div>
                  <div class="reward-grid-col">
                    <span>业务办理</span>
                    <span><b>2537</b><em>元</em></span>
                  </div>
                </li>
                <li>
                  <div class="reward-grid-col">
                    <span>激励酬金</span>
                    <span><b>69</b><em>元</em></span>
                  </div>
                  <div class="reward-grid-col">
                    <span>集团业务</span>
                    <span><b>14</b><em>元</em></span>
                  </div>
                  <div class="reward-grid-col">
                    <span>考核扣款</span>
                    <span><b>20</b><em>元</em></span>
                  </div>
                </li>
              </ul>
              <div class="reward-echarts">
                <div class="reward-echarts-title">
                  <h5>酬金变化</h5>
                </div>
                <p class="reward-echarts-desc">最新已结酬金：856.56万元</p>
                <div class="reward-echarts-line" id="js-reward-line"></div>
              </div>
            </section>
          </van-tab>

          <van-tab title="结算笔数">
            <section class="reward-panel" >
              <div class="reward-tables">
                <div class="reward-tables-title" style="padding:3px 0;">
                </div>
                <iscroll-table
                  id="scroller1"
                  :xList="xList1"
                  :xField="xField1"
                  :yList="yList1"
                  @action="onAction" />
              </div>
            </section> 
          </van-tab>
        </van-tabs>
      </section>
    </div>
  </div>

  <!--picker-->
  <van-popup 
    v-model="picker.show" 
    position="bottom">
    <van-picker
      value-key="name"
      show-toolbar
      :columns="picker.columns"
      @cancel="picker.show = false"
      @confirm="pickerConfirm">
    </van-picker>
  </van-popup>
  
  <!-- 日期 -->
  <van-popup
    v-model="date.show"
    position="bottom">
    <van-datetime-picker
      type="year-month"
      v-model="date.currentDate"
      :min-date="date.minDate"
      :max-date="date.maxDate"
      @cancel="date.show = false"
      @confirm="dateConfirm"
    />
  </van-popup>

</div>
</template>

<script>

import { theme } from '@/config';
import * as utils from '@/utils';
import iscrollTable from '@/components/iscrollTable/index';

export default {
  name: 'echarts-index',
  components: {
    iscrollTable
  },
  data() {
    return {
      primary: theme.primary,
      title: '酬金详情',
      active: 0,
      time: utils.lastDate(1, 'months', 'YYYY-MM'), //上一个月，返回2020-xx,
      picker: {
        show: false,
        columns: [{
          name: '选项1',
          id: '1'
        }, {
          name:  '选项2',
          id: '2'
        }]
      },
      date: {
        show: false,
        currentDate: new Date(),
        minDate: new Date(utils.getDate('YYYY'), utils.getDate('MM')-6),
        maxDate: new Date(utils.getDate('YYYY'), utils.getDate('MM')-2)
      },
      xList1: [
        {
          field_name: "x",
          name: "酬金类目"
        },
        {
          field_name: "x1",
          name: "已发金额"
        },
        {
          field_name: "x2",
          name: "结算比列"
        },
        {
          field_name: "x3",
          name: "结算(笔)"
        },
        {
          field_name: "x4",
          name: "未达标准(笔)"
        },
        {
          field_name: "x5",
          name: "详细情况"
        }
      ],
      xField1: ['x', 'x1', "x2", "x3", "x4", "x5"],
      yList1: [
        {
          x: '开户',
          x1: '965万',
          x2: '100%',
          x3: 965,
          x4: 128,
          x5: 'event'
        },
        {
          x: '终端',
          x1: '965万',
          x2: '100%',
          x3: 965,
          x4: 128,
          x5: 'event'
        },
        {
          x: '数字家庭',
          x1: '965万',
          x2: '100%',
          x3: 965,
          x4: 128,
          x5: 'event'
        },
        {
          x: '套餐合约',
          x1: '965万',
          x2: '100%',
          x3: 965,
          x4: 128,
          x5: 'event'
        }
        //....
      ],
      lineOption: {
        tooltip: {
          trigger: 'axis',
          backgroundColor: '#fff',
          extraCssText: 'box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);',
          textStyle: {
            fontSize: '12px',
            color: '#7d7e80',
          }
        },
        color: ['#F39800'],
        grid: {
          left: '0%',
          right: '3%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['7月', '8月', '9月', '10月', '11月', '12月' ]
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series:[
          {
            name: '已结酬金',
            type: 'line',
            stack: '万元',
            data: [100, 640, 400, 630, 1000, 500, 640]
          }
        ]
      }
    }
  },
  methods: {
    dateConfirm(value) {
      this.date.show = false
      this.time = utils.formatDate(value, 'YYYY-MM')
    },
    pickerConfirm(item) {
      console.log('item==',item);
      this.picker.show = false
    },
    onTab(index) {
      //this.$toast(index);
    },
    onAction(item) {
      console.log('item==',item)
    },
    init() {
      let lineChart = echarts.init(document.getElementById('js-reward-line'))
      window.onresize = lineChart.resize
      lineChart.setOption(this.lineOption)
    },
  },
  created() {
    
  },
  mounted() {
    const self = this
    self.$refs.vtabs.resize();
    setTimeout(function(){
      self.init()
    },200)
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.reward {

  &-header {
    @include flex-row();
    align-items: center;
    background-color:$color-white;
    padding:0 10px;
    overflow:hidden;
  }

  &-manager,
  &-time {
    @include flex-row();
    align-items: center;
    padding:5px 0;
    overflow:hidden;
    flex:1.6;

    &-name,
    &-date {
      font-size:$font-14;
      color:$color-32;
      padding-left:5px;
      @include ellipsis();
    }
  }

  &-tab {
    margin-bottom:30px;
  }

  &-manager {
    flex:3;
    margin-right:20px;
  }

  &-grid {
    margin-top:$margin;
    margin-bottom:0;
    background-color: $color-white;
    
    li {
      @include flex-row();
      align-items: center;
      height:86px;
      border-bottom:1px solid $color-primary;

      &:last-child {
        border-bottom:0;
      }
    }

    &-col {
      flex:1;
      height:42px;
      @include flex-column();
      justify-content:center;
      text-align: center;
      font-size:$font-12;
      color:$color-7d;
      border-right:1px solid $color-primary;

      &:last-child {
        border-right:0;
      }

      b {
        font-size:$font-14;
        color:$color-primary;
      }

      em {
        font-style: normal;
        font-size:10px;
        transform:scale(.8);
        margin-left:4px;
      }
    }
  }

  &-echarts {
    margin-top:$margin;
    padding:0 10px 10px;
    background-color:$color-white;

    &-title {
      padding:10px 0;
      @include flex-row();
      align-items: center;

      h5 {
        flex:2;
        font-size:$font-14;
        margin-bottom:0;
      }
    }

    &-desc {
      font-size:$font-12;
      color:$color-7d;
      margin-bottom:0;
    }

    &-line {
      padding:0 8px;
      min-height: 16.66666667rem;
    }
  }

  &-tables {
    margin-top:10px;
    -webkit-overflow-scrolling: touch;
    position: relative;
    background-color:$color-white;

    &-title {
      padding:10px;
      @include flex-row();
      align-items: center;

      h5 {
        flex:2;
        font-size:$font-14;
        margin-bottom:0;
        font-weight:normal;
      }

      span {
        font-size:$font-12;
        color:$color-32;

        &::after {
          display: inline-block;
          content: '';
          @include arrow(right, 1em, 1px);
          color:$color-7d;
          margin-left:2px;
        }
      }
    }
  }
}
</style>