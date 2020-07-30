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
    <form action="/" class="flow-search">
     <van-search
        clearable
        show-action
        v-model="searchKey"
        placeholder="输入发起人姓名、流程名称、正文内容"
        shape="round"
        @search="onSearch"
        @cancel="onCancel">
      </van-search>
    </form>
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
</div>
</template>

<script>
import contentWithEmpty from '@/components/contentWithEmpty';
import { theme } from '@/config';
import {fetchGet, fetchPost} from '@/api';
export default {
  name: 'flow-search',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '',
      active: 0,
      searchKey: '',
      noData: false,// 没有数据
      loading: false,//上拉加载
      finished: false,//上拉加载完毕
      list: []
    }
  },
  methods: {
    onTab(active) {
      this.active = active
    },
    onSearch() {

    },
    onCancel() {
      
    },
    onLoad() {

    }
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

  &-search {
    margin:8px 0;

    /deep/ .van-search__action {
      background:none;
      color:$color-primary;
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
