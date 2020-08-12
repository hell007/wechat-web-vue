<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
    <form action="/" class="addressbook-search">
      <van-search
        clearable
        show-action
        v-model="searchKey"
        placeholder="请输入姓名、电话"
        shape="round">
        <template #action>
          <div class="addressbook-search-btn" 
            @click="onSearch">搜索</div>
        </template>
      </van-search>
    </form>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <div class="addressbook-title">常用联系人</div>
      <section class="addressbook-common">
        <div class="addressbook-common-add">
          <van-icon name="plus" size="30" />
        </div>
        <div class="addressbook-common-list">
          <van-swipe 
            :loop="false" 
            :show-indicators="false"
            :width="60">
            <van-swipe-item 
              v-for="item,index in commonList"
              :key="index">
              <img class="addressbook-common-picture"
                v-if="item.url"
                src="../../assets/images/icons/connect_icon.png"/>
              <div class="addressbook-common-text"
                v-else>{{item.name}}</div>
            </van-swipe-item>
          </van-swipe>
        </div>
      </section>
      <van-index-bar
        :sticky="false"
        :highlight-color="primary"
        class="addressbook-list">
        <template v-for="item,index in options">
          <van-index-anchor :index="item.index" />
          <dl class="addressbook-item"
            v-for="it,i in item.list"
            :key="i">
            <dt class="addressbook-item-left">
              <img class="addressbook-item-picture"
                v-if="it.url"
                src="../../assets/images/icons/connect_icon.png"/>
              <div class="addressbook-item-text"
                v-else>{{it.name}}</div>  
            </dt>
            <dd class="addressbook-item-right">
              <div class="addressbook-item-info">
                <span>张三</span>
                <span>138xxxxxxxxx</span>
              </div>
              <a href="tel:13845678932" class="addressbook-item-call">
                <van-icon name="phone" size="20" color="white" />
              </a>
            </dd>
          </dl>
        </template>
      </van-index-bar>
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config';
export default {
  name: 'addressbook',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '通讯录',
      searchKey: '',
      commonList: [],
      options: []
    }
  },
  methods: {
    onSearch() {
      this.$toast(this.searchKey)
    },
  },
  created() {
    this.commonList = Array(8)
      .fill(null)
      .map(function() {
        return {
          url: null,
          name: '张三'
        }
      })

    this.options = [{
      index: 'A',
      list: this.commonList
    }]
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.addressbook {

  $size: 50px;

  &-search {
    
    /deep/ .van-search__action {
      border-radius:999px;
      padding:0 12px;
      margin:0 8px;
    }
  }

  &-title {
    padding:5px 16px;
    color:$color-7d;
  }

  &-common {
    @include flex-row();
    align-items:center;
    padding:10px 0;
    background-color:$color-white;

    &-list {
      overflow:hidden;
      flex:4;

      /deep/ .van-swipe-item {
        width:$size;
        height:$size;
      }
      
    }
    
    &-add,
    &-text,
    &-picture {
      width:$size;
      height:$size;
      overflow:hidden;
      text-align:center;
      white-space:nowrap;
      line-height:$size;
      font-size:14px;
      font-weight:bold;
      color:$color-white;
      border-radius:999px;
    }

    &-text {
      background-color:$color-primary;
    }

    &-add {
      margin:0 10px;
      line-height:70px;
      background-color:$color-f2;
    }
  }

  &-list {
    /deep/ .van-index-bar__sidebar {
      top:60%;
    }

    /deep/ .van-index-bar__index {
      font-size:12px;
    }
  }

  &-item {
    @include flex-row();
    align-items:center;
    background-color:$color-white;
    padding:0px 10px;

    &:last-child {

      .addressbook-item-right {
        border-bottom:0;
      }
    }

    &,dt,dd {
      margin-bottom:0;
      font-weight:normal;
    }

    &-text,
    &-picture {
      width:$size;
      height:$size;
      overflow:hidden;
      text-align:center;
      white-space:nowrap;
      line-height:$size;
      font-size:14px;
      font-weight:bold;
      color:$color-white;
      border-radius:999px;
    }

    &-text {
      background-color:$color-primary;
    }

    &-left {
      margin-right:10px;
    }

    &-right {
      padding:12px 0;
      flex:4;
      padding-right:30px;
      @include flex-row();
      align-items:center;
      border-bottom:1px solid $color-border-gray;
    }

    &-info {
      flex:3;
      @include flex-column();
      font-size:14px;
      color:$color-32;
    }

    &-call {
      overflow:hidden;
      width:30px;
      height:30px;
      text-align:center;
      line-height:40px;
      border-radius:999px;
      background-color:$color-primary;
    }
  }
}
</style>