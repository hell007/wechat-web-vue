<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
    <van-tabs v-model="active"
      @click="onTab"
      :color="primary"
      :title-active-color="primary">
      <van-tab>
        <template #title> 
          <van-icon class-prefix="xa-icon" 
            name="handle"
            :color="primary" />
          我处理的
        </template>
      </van-tab>
      <van-tab>
        <template #title> 
          <van-icon class-prefix="xa-icon" 
            name="sponsor"
            :color="primary" />
          我发起的 
        </template>
      </van-tab>
      <van-tab>
        <template #title> 
          <van-icon class-prefix="xa-icon" 
            name="copy"
            :color="primary" />
          抄送我的 
        </template>
      </van-tab>
    </van-tabs>
    <ul class="flow-bar">
      <li class="flow-bar-item">
        <van-icon name="search" size="16"/>
        <span>搜索</span>
      </li>
      <li class="flow-bar-item">
        <span @click="filter.show=true">筛选</span>
        <van-icon name="filter-o" size="16"></van-icon>
      </li>
    </ul>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty
        :empty="noData">
        <van-list
          class="flow-list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="true"
          :offset="10"
          @load="onLoad">
          <div class="flow-item">
            <div class="flow-item-picture">
              <img src="../../assets/images/icons/pro_sjtq.png" />
            </div>
            <div class="flow-item-right">
              <h6 class="flow-item-title">数据提取</h6>
              <div class="flow-item-text">
                发起方：张三 2020-07-13 12:00:00
              </div>
              <div class="flow-item-text">
                流程中：张三 13888888888
              </div>
              <div class="flow-item-opt">
                <van-button 
                  :color="primary"
                  plain
                  round>去处理</van-button>
              </div>
            </div>
          </div>
          <div class="flow-item">
            <div class="flow-item-picture">
              <img src="../../assets/images/icons/pro_sjtq.png" />
            </div>
            <div class="flow-item-right">
              <h6 class="flow-item-title">数据提取</h6>
              <div class="flow-item-text">
                发起方：张三 2020-07-13 12:00:00
              </div>
              <div class="flow-item-text">
                流程中：待张三5人会签
              </div>
              <div class="flow-item-opt">
                <van-button 
                  :color="primary"
                  plain
                  round>去处理</van-button>
              </div>
            </div>
          </div>
          <div class="flow-item">
            <div class="flow-item-picture">
              <img src="../../assets/images/icons/pro_sjtq.png" />
            </div>
            <div class="flow-item-right">
              <h6 class="flow-item-title">智赋发起流程</h6>
              <div class="flow-item-text">
                发起方：张三 2020-07-13 12:00:00
              </div>
              <div class="flow-item-text">
                已完成
              </div>
              <div class="flow-item-opt">
                <van-button
                  round>查看详情</van-button>
              </div>
            </div>
          </div>
        </van-list>
      </content-with-empty>
    </div>
  </div>

  <!-- 右弹窗 -->
  <pop-right
    :visible.sync="filter.show"
    @confirm="popConfirm"
    @overlay="popOverlay"
    @cancel="popCancel">
    <section slot="body" class="flow-filter">
      <dl class="flow-filter-panel">
        <dt class="flow-filter-hd">
          <span>业务类型</span>
          <em :class="toggle.t1?'':'toggle'" 
            @click="onToggle(0)"></em>
        </dt>
        <dd class="flow-filter-bd"
          v-if="toggle.t1">
          <span v-for="item,index in filter.types" 
            :key="index"
            :class="{on:filter.type == item.value}"
            @click="popRadio(item.value)">{{item.label}}</span>
        </dd>
      </dl>
      <dl class="flow-filter-panel">
        <dt class="flow-filter-hd">
          <span>流程类型</span>
          <em :class="toggle.t2?'':'toggle'" 
            @click="onToggle(1)"></em>
        </dt>
        <dd class="flow-filter-bd"
         v-if="toggle.t2">
          <span class="on">流程类型流程类型11</span>
          <span>流程类型2</span>
          <span>流程类型3</span>
        </dd>
      </dl>
      <dl class="flow-filter-panel">
        <dt class="flow-filter-hd">
          <span>状态</span>
          <em :class="toggle.t3?'':'toggle'" 
            @click="onToggle(2)"></em>
        </dt>
        <dd class="flow-filter-bd"
          v-if="toggle.t3">
          <span class="on">待处理</span>
          <span>已完成</span>
        </dd>
      </dl>
      <dl class="flow-filter-panel">
        <dt class="flow-filter-hd">
          <span>发起时间</span>
          <em :class="toggle.t4?'':'toggle'" 
            @click="onToggle(3)"></em>
        </dt>
        <dd class="flow-filter-bd"
          v-if="toggle.t4">
          <span v-for="item,index in filter.times" 
            :key="index"
            :class="{on:filter.time == item.value}"
            >{{item.label}}</span>
        </dd>
      </dl>
    </section>
  </pop-right>

</div>
</template>

<script>
import contentWithEmpty from '@/components/contentWithEmpty';
import { theme } from '@/config';
import {fetchGet, fetchPost} from '@/api';
import popRight from '@/components/popRight';
export default {
  name: 'flow-index',
  components: {
    contentWithEmpty,
    popRight
  },
  data() {
    return {
      primary: theme.primary,
      title: '',
      active: 0,
      noData: false,// 没有数据
      loading: false,//上拉加载
      finished: false,//上拉加载完毕
      list: [],
      filter: {
        show: false,
        types: [{
          label: '倒三角流程',
          value: '1'
        },{
          label: '订单中心',
          value: '2',
        },{
          label: '我的报障',
          value: '3',
        },{
          label: '业务甩单',
          value: '4',
        },{
          label: '常规流程',
          value: '5',
        }],
        type: '1',
        times: [{
          label: '1周内',
          value: '1'
        },{
          label: '1月内',
          value: '2',
        },{
          label: '3月内',
          value: '3',
        },{
          label: '6月内',
          value: '4',
        },{
          label: '今年',
          value: '5',
        },{
          label: '2019年',
          value: '6',
        }],   
        time: null, //初始必须为null
      },
      toggle: {
        t1: true,
        t2: true,
        t3: true,
        t4: true
      }
    }
  },
  methods: {
    onTab(active) {
      this.active = active
    },
    onLoad() {

    },
    onToggle(index) {
      const self = this
      switch (index){
        case 0:
          self.toggle.t1 = !self.toggle.t1
          break;
        case 1:
          self.toggle.t2 = !self.toggle.t2
          break;
        case 2:
          self.toggle.t3 = !self.toggle.t3
          break; 
        case 3:
          self.toggle.t4 = !self.toggle.t4
          break;     
      }
    },
    popRadio(val) {
      this.filter.type = val
    },
    popConfirm() {
      this.$toast('确定')
    },
    popOverlay() {
      this.filter.show = false
      this.$toast('遮罩关闭')
    },
    popCancel() {
      this.filter.show = false
    },
  },
  created() {
    
  },
  mounted() {
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.flow {

  &-bar {
    @include flex-row();
    align-items:center;
    background-color:#fff;
    padding:8px 0;
    margin:8px 0;

    &-item {
      flex:1;
      @include flex-row();
      align-items:center;
      justify-content:center;
      font-size:14px;
      color:$color-7d;
    }
  }

  &-filter {
    padding:10px 0;

    &-panel {
      padding:0 12px;
      margin-bottom:8px;
      border-bottom:1px solid $color-border-gray;
    }

    &-hd {
      @include flex-row();
      align-items:center;
      font-size:14px;
      color:$color-32;
      font-weight:normal;
      margin-bottom:8px;

      span {
        flex:3;
      }

      em {
        text-align:center;
        width:30px;
        height:30px;
        line-height:30px;

        &::before {
          display:inline-blcok;
          @include arrow(up,1em,2px);
          color:$color-96;
        }

        &.toggle {
          &::before {
            @include arrow(down,1em,2px);
          }
        }
      }
    }

    &-bd {
      @include flex-row();
      flex-wrap:wrap;

      span {
        width:30%;
        text-align:center;
        padding:5px 0;
        font-size:13px;
        color:$color-32;
        border-radius:4px;
        background-color:$color-f2;
        margin-right:5%;
        margin-bottom:5%;
        cursor:pointer;

        &:nth-child(3n) {
          margin-right:0;
        }

        &.on {
          background-color:rgba(254,243,231,.8);
          color:$color-primary;
        }
      }
    }
  }

  &-list {
    padding:0 8px;
    @include clearfix();
  }

  &-item {
    @include flex-row();
    align-items:center;
    padding:8px;
    min-height:100px;
    margin-bottom:$margin;
    background-color: $color-white;
    border-radius: 8px;

    &-picture {
      flex:1;
      max-width:60px;
      overflow: hidden;
      margin-right:10px;

      img {
        border-radius:999px;
      }
    }

    &-right {
      flex:3;
      overflow:hidden;
      @include flex-column();
    }

    &-title {
      font-weight:normal;
      font-size:14px;
      color:$color-32;
      @include ellipsis();
    }

    &-text {
      margin-bottom:8px;
      font-size:12px;
      color:$color-7d;
      white-space:nowrap;
    }

    &-opt {
      text-align: right;

      .van-button {
        height:30px;
        line-height:30px;
        font-size:12px;
        color:$color-7d;
      }
    }
  }
}
</style>
