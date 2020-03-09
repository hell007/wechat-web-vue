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
        class="search-list">
        <van-pull-refresh
          v-model="refreshing"
          success-text="刷新成功"
          @refresh="onRefresh">
          <div class="search-custom">
            <span class="search-custom-header">杰克马</span>
            <div class="search-custom-text">知识百科</div>
          </div>

          <div class="search-client">
            <span class="search-client-header">
              <van-icon name="smart" class-prefix="xa-icon" size="30"/>
            </span>
            <div class="search-client-text">
              <h6>智能工作助理</h6>
              <div class="search-item">
                <div class="search-item-hd">你好，请直接点击</div>
                <div class="search-item-bd">知识百科</div>
              </div>
            </div>
          </div>

          <div class="search-custom">
            <span class="search-custom-header">杰克马</span>
            <div class="search-custom-text">知识百科</div>
          </div>

          <div class="search-client">
            <span class="search-client-header">
              <van-icon name="smart" class-prefix="xa-icon" size="30"/>
            </span>
            <div class="search-client-text">
              <h6>智能工作助理</h6>
              <div class="search-item">
                <div class="search-item-hd">你好，请直接点击</div>
                <div class="search-item-bd">知识百科</div>
              </div>
            </div>
          </div>

           <div class="search-custom">
            <span class="search-custom-header">杰克马</span>
            <div class="search-custom-text">你银行卡密码是多少你银行卡密码是多少你银行卡密码是多少</div>
          </div>

          <div class="search-client">
            <span class="search-client-header">
              <van-icon name="smart" class-prefix="xa-icon" size="30"/>
            </span>
            <div class="search-client-text">
              <h6>智能工作助理</h6>
              <div class="search-item">
                <div class="search-item-text">
                  这个问题好像超出我的知识范围了，我还在努力学习新技能，过两天再来试试吧！
                </div>
              </div>
            </div>
          </div>
        </van-pull-refresh>
      </content-with-empty>
    </div>
  </div>
  
  <div class="page-footer">
    <div class="search-bar">
      <span class="search-bar-icon" @click="type=!type">
        <van-icon :name="type ? 'speak' : 'keyboard'" class-prefix="xa-icon" size="32"/>
      </span>
      <form action="/" class="search-bar-text">
        <input v-if="!type" type="text"  placeholder="请输入文字" />
        <span v-if="type" class="input">按住 说话</span>
      </form>
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
      title: '智能工作助理',
      type: true,
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

.search {

  &-list {
    padding:10px;
    @include clearfix();
  }

  &-custom {
    font-size:12px;
    text-align:right;
    margin-top:25px;
    @include clearfix();
    
    &-text {
      float:right;
      margin-top:6px;
      max-width:200px;
      position:relative;
      display:inline-block;
      padding:8px 12px;
      background-color:$color-primary;
      color:$color-white;
      border-radius:5px;

      &::after {
        position:absolute;
        right:-4px;
        top:3px;
        z-index:3;
        color:$color-primary;
        @include triangle(right,1em);

      }
    }

    &-header {
      float:right;
      display:inline-block;
      width:40px;
      height:40px;
      border-radius:999px;
      background-color:$color-primary;
      font-size:12px;
      text-align:center;
      line-height:40px;
      color:$color-white;
      margin-left:10px;
      @include ellipsis();

      img {
        border-radius:999px;
      }
    }
  }

  &-client {
    @include flex-row();
    margin-top:30px;

    &-header {
      display:inline-block;
      width:40px;
      height:40px;
      border-radius:999px;
      background-color:$color-blue;
      font-size:12px;
      text-align:center;
      line-height:40px;
      color:$color-white;
      margin-right:10px;
    }

    &-text {

      h6 {
        font-size:12px;
        color:$color-7d;
        margin-bottom:4px;
        margin-left:-20px;
        transform:scale(.8);
      }
    }

  }

  
  &-item {
    min-width:200px;
    max-width:230px;
    background-color: $color-white;
    font-size:12px;
    border-radius:4px;
    box-shadow:0px 2px 5px rgba(0,0,0,.2);

    &-hd,
    &-bd {
      padding:8px 10px;
    }

    &-hd {
      color:$color-32;
      border-bottom:1px solid $color-border-gray;
    }

    &-bd {
      color:$color-primary;
      text-align:center;
    }

    &-text {
      padding:8px;
      color:$color-32;
    }
  }

  &-bar {
    padding:0 10px;
    background-color:$color-gray;
    @include flex-row();
    align-items:center;

    &-icon {
      color:$color-7d;
      margin-right:10px;
    }

    &-text {
      flex:5;

      input,
      .input {
        display: inline-block;
        width:100%;
        min-height:34px;
        line-height:34px;
        border:0;
        border-radius:4px;
        background-color:$color-white;
        text-align:center;
        font-size:12px;

        &:focus {
          padding:0 5px;
          text-align:left;
          line-height:20px;
        }
      }
    }
  }
}
</style>
