<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty 
        :empty="noData"
        class="message-list">
        <van-pull-refresh
          v-model="refreshing"
          success-text="刷新成功"
          @refresh="onRefresh">
          <div class="message-item-date">2020/02/21 08:35</div>
          <div class="message-item">
            <span class="message-item-header">
              <van-icon name="company" class-prefix="xa-icon" size="32" :color="primary"/>
            </span>
            <div class="message-item-detail">
              <h6 class="message-item-hd">2月份集团数据已更新</h6>
              <div class="message-item-bd">2月份数据新鲜出炉，赶快来查看您上月的业绩情况吧！</div>
              <div class="message-item-ft">查看详情</div>
            </div>
          </div>

          <div class="message-item-date">2020/02/21 08:35</div>
          <div class="message-item">
            <span class="message-item-header">
              <van-icon name="company" class-prefix="xa-icon" size="32" :color="primary"/>
            </span>
            <div class="message-item-detail">
              <h6 class="message-item-hd">2月份集团数据已更新</h6>
              <div class="message-item-bd">2月份数据新鲜出炉，赶快来查看您上月的业绩情况吧！</div>
              <div class="message-item-ft">查看详情</div>
            </div>
          </div>
        </van-pull-refresh>
      </content-with-empty>
    </div>
  </div>
  
</div>
</template>

<script>
import contentWithEmpty from '@/components/contentWithEmpty';
import { theme } from '@/config';

export default {
  name: 'search-index',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '我的集团',
      noData: false,// 没有数据
      loadding: false,//上拉加载
      refreshing: false,//下拉刷新
      pageNum: 1,
      pageSize:10,
      list: []
    }
  },
  methods: {
    onRefresh() {
      this.$toast('refreshing')
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.message {

  &-list {
    padding:10px;
    @include clearfix();
  }

  &-item {
    @include flex-row();

    &-header {
      display:inline-block;
      width:40px;
      height:40px;
    }

    &-detail {
      min-width:200px;
      max-width:85%;
      margin-bottom:5px;
      background-color: $color-white;
      font-size:12px;
      border-radius:4px;
      box-shadow:0px 2px 5px rgba(0,0,0,.2);
    }

    &-date {
      width:120px;
      min-width:120px;
      max-width: 130px;
      text-align:center;
      margin:20px auto 15px;
      background-color: rgba(0,0,0,.2);
      font-size:12px;
      color:$color-white;
      border-radius:999px;
    }

    &-hd,
    &-ft {
      padding:8px 10px;
    }

    &-hd {
      color:$color-32;
      font-size:13px;
      margin-bottom: 0;
    }

    &-bd {
      padding:2px 10px 8px;
      color:$color-32;
      border-bottom:1px solid $color-border-gray;
    }

    &-ft {
      color:$color-primary;
      font-size:13px;
      text-align:center;
    }
  }

}
</style>
