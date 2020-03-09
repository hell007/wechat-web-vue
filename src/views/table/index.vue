<template>
<div class="page">
  <div class="page-header" style="box-shadow:none;">
    <page-title :title="title">
    </page-title>
    <section class="data-header">
      <div class="data-manager">
        <van-icon class-prefix="xa-icon" name="manager" size="20" :color="primary" />
        <span class="data-manager-name">杰克马 A10A31</span>
        <van-icon name="arrow-down" size="12" :color="primary" />
      </div>
      <div class="data-time">
        <van-icon class-prefix="xa-icon" name="date" size="20" :color="primary" />
        <span class="data-time-date" @click="date.show=true">{{time}}</span>
        <van-icon name="arrow-down" size="12" :color="primary" />
      </div>
    </section>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="data-tab">
        <van-tabs v-model="active"
          ref="vtabs"
          background="#fff"
          :border="false"
          @click="onTab"
          :color="primary"
          :title-active-color="primary">
          <van-tab title="综合情况">
            <section class="data-panel" >
              <ul class="data-grid">
                <li>
                  <div class="data-grid-col">
                    <span>集团数量</span>
                    <span><b>37</b><em>个</em></span>
                  </div>
                  <div class="data-grid-col">
                    <span>集团成员</span>
                    <span><b>545337</b><em>个</em></span>
                  </div>
                  <div class="data-grid-col">
                    <span>成员宽带数</span>
                    <span><b>2537</b><em>个</em></span>
                  </div>
                </li>
                <li>
                  <div class="data-grid-col">
                    <span>欠费总额</span>
                    <span><b>37</b><em>万</em></span>
                  </div>
                  <div class="data-grid-col">
                    <span>上月销账总额</span>
                    <span><b>545337</b><em>万</em></span>
                  </div>
                  <div class="data-grid-col">
                    <span>专线本网数</span>
                    <span><b>2537</b><em>个</em></span>
                  </div>
                </li>
                <li>
                  <div class="data-grid-col">
                    <span>专线覆盖率</span>
                    <span><b>69</b><em>%</em></span>
                  </div>
                  <div class="data-grid-col">
                    <span>宽带融合率</span>
                    <span><b>14</b><em>%</em></span>
                  </div>
                  <div class="data-grid-col">
                    <span>营销活动捆绑率</span>
                    <span><b>20</b><em>%</em></span>
                  </div>
                </li>
              </ul>
              <div class="data-tables">
                <div class="data-tables-title">
                  <h5>集团级明细数据</h5>
                  <span @click="show=true">指标自定义</span>
                </div>
                <iscroll-table
                  id="scroller1"
                  :xList="xList1"
                  :xField="xField1"
                  :yList="yList1"
                  option="查看"
                  @action="onAction" />
              </div>
            </section>
          </van-tab>
          <van-tab title="排名情况">  
            <section class="data-panel" >
              <div class="data-tables">
                <div class="data-tables-title">
                  <h5>个人情况排名</h5>
                </div>
                <iscroll-table
                  id="scroller2"
                  :xList="xList2"
                  :xField="xField2"
                  :yList="yList2" />
              </div>
            </section>  
          </van-tab>
          <van-tab title="产品情况">
            <section class="data-panel" >
              <div class="data-tables">
                <div class="data-tables-title">
                  <h5>云南白药集团</h5>
                </div>
                <iscroll-table
                  id="scroller3"
                  :xList="xList3"
                  :xField="xField3"
                  :yList="yList3" />
              </div>
            </section> 
          </van-tab>
        </van-tabs>
      </section>
    </div>
  </div>
  
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

  <!-- 底部弹窗 -->
  <pop-bottom 
    :visible="show"
    @confirm="popConfirm"
    @cancel="popCancel">
    <div class="data-pop-body" slot="body">
      <ul class="data-pop-list">
        <li 
          v-for="(item,index) in popList"
          :key="index"
          :class="item.checked ? 'on' : ''"
          @click="onSelect(item)">{{item.text}}</li>
      </ul>
      <p class="data-pop-tips">*至少选择一项指标</p>
    </div>
  </pop-bottom>
</div>
</template>

<script>

import { theme } from '@/config';
import * as utils from '@/utils';
import popBottom from '@/components/popBottom';
import iscrollTable from '@/components/iscrollTable/index';

export default {
  name: 'data',
  components: {
    popBottom,
    iscrollTable
  },
  data() {
    return {
      primary: theme.primary,
      title: '数据详情',
      active: 0,
      time: '2020-02',
      date: {
        show: false,
        currentDate: new Date(),
        minDate: new Date(utils.getDate('YYYY'), utils.getDate('MM')-6),
        maxDate: new Date(utils.getDate('YYYY'), utils.getDate('MM')-2),
      },
      show: false,
      popList: [{
        text: '测试数据1',
        checked: false,
      }, {
        text: '测试数据2',
        checked: false,
      }, {
        text: '测试数据3',
        checked: false,
      }, {
        text: '测试数据4',
        checked: false,
      },{
        text: '测试数据5',
        checked: false,
      }],
      xList1: [
        {
          field_name: "x",
          name: "集团名称"
        },
        {
          field_name: "x1",
          name: "客户等级"
        },
        {
          field_name: "x2",
          name: "集团编码"
        },
        {
          field_name: "x3",
          name: "成员数量(个)"
        },
        {
          field_name: "x4",
          name: "宽带办理数(笔)"
        },
        {
          field_name: "x5",
          name: "宽带融合率(%)"
        },
        {
          field_name: "x6",
          name: "欠费总额(万元)"
        },
        {
          field_name: "x7",
          name: "上月销账(万元)"
        },
        {
          field_name: "x8",
          name: "专线本网数(个)"
        },
        {
          field_name: "x9",
          name: "集团产品情况"
        }
      ],
      xField1: ['x', 'x1', "x2", "x3", "x4", "x5", "x6", "x7", "x8", "x9"],
      yList1: [
        {
          x: '云南白药集团 云南白药集团 云南白药集团',
          x1: "A",
          x2: "363672",
          x3: 965,
          x4: 965,
          x5: 33.65,
          x6: 100,
          x7: 200, 
          x8: 300,
          x9: 'event'
        },
        {
          x: '云南白药集团云南白药集团',
          x1: "A",
          x2: "363672",
          x3: 965,
          x4: 965,
          x5: 33.65,
          x6: 100,
          x7: 200, 
          x8: 300,
          x9: 'event'
        },
        {
          x: '云南白药集团',
          x1: "A",
          x2: "363672",
          x3: 965,
          x4: 965,
          x5: 33.65,
          x6: 100,
          x7: 200, 
          x8: 300,
          x9: 'event'
        },
        {
          x: '云南白药集团',
          x1: "A",
          x2: "363672",
          x3: 965,
          x4: 965,
          x5: 33.65,
          x6: 100,
          x7: 200, 
          x8: 300,
          x9: 'event'
        }
      ],
      xList2: [
        {
          field_name: "x",
          name: "指标名称"
        },
        {
          field_name: "x1",
          name: "办理数量(个)/上月出账(万元)"
        },
        {
          field_name: "x2",
          name: "排名"
        }
      ],
      xField2: ['x', 'x1', "x2"],
      yList2: [
        {
          x: '产品办理量',
          x1: 2535,
          x2: 27
        },
        {
          x: '业务办理量',
          x1: 2535,
          x2: 27 
        },
        {
          x: '云视讯',
          x1: 2535,
          x2: 27 
        },
        {
          x: '千里眼',
          x1: 2535,
          x2: 27 
        },
        {
          x: '移动云',
          x1: 2535,
          x2: 27 
        }
      ],
      xList3: [
        {
          field_name: "x",
          name: "产品名称"
        },
        {
          field_name: "x1",
          name: "计费号码"
        },
        {
          field_name: "x2",
          name: "当前欠费(万元)"
        },
        {
          field_name: "x3",
          name: "上月销账(万元)"
        },
        {
          field_name: "x4",
          name: "开通时间"
        }
      ],
      xField3: ['x', 'x1', "x2", "x3", "x4"],
      yList3: [
        {
          x: '千里眼',
          x1: '13987654321',
          x2: 27,
          x3: 1.64,
          x4: '2020/01/31'
        },
        {
          x: '千里眼',
          x1: '13987654321',
          x2: 27,
          x3: 1.64,
          x4: '2020/01/31'
        },
        {
          x: '千里眼',
          x1: '13987654321',
          x2: 27,
          x3: 1.64,
          x4: '2020/01/31'
        }
      ]
    }
  },
  methods: {
    dateConfirm(value) {
      console.log(value)
      this.date.show = false
      this.time = utils.formatDate(value, 'YYYY-MM')
    },
    onTab(index) {
      this.$toast(index);
    },
    onSelect(item) {
      item.checked = !item.checked
      this.$toast(item.text)
    },
    popCancel() {
      this.show = false
    },
    popConfirm() {
      this.$toast('确定')
    },
    onAction() {
      this.$toast('查看')
    }
  },
  created() {
    
  },
  mounted() {
    this.$refs.vtabs.resize();
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.data {

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
      overflow:hidden;
      @include ellipsis();
      flex:4;
    }
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
      font-size:12px;
      color:$color-7d;
      border-right:1px solid $color-primary;

      &:last-child {
        border-right:0;
      }

      b {
        font-size:14px;
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

  &-panel {
    margin-top:$margin;
  }

  &-tables {
    margin-top:$margin;
    -webkit-overflow-scrolling: touch;
    position: relative;
    background-color:$color-white;

    &-title {
      padding:0 10px;
      height:54px;
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

  &-pop {

    &-body {
      padding:20px 10px 10px;
    }

    &-list {
      @include clearfix();
      
      li {
        float:left;
        width:29%;
        margin:0 2% 4%;
        text-align:center;
        padding:5px 0;
        font-size:12px;
        border-radius:3px;
        background-color:$color-primary;
        border:1px solid $color-primary;
        color:$color-white;

        &.on {
          background-color: $color-white;
          color:$color-primary;
          border-color:$color-primary;
        }
      }
    }

    &-tips {
      font-size:$font-12;
      margin-left:-8px;
      transform:scale(.9);
    }
  }
}
</style>