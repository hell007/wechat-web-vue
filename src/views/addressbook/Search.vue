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
      <content-with-empty
        :empty="noData">
        <van-list
          class="addressbook-list"
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="true"
          :offset="10"
          @load="onLoad">
          <dl class="addressbook-item"
            v-for="it,i in list"
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
              <span class="addressbook-item-call"
                v-bind:class="{'on':it.checked}"
                v-if="isAdd"
                @click="onChecked(it)">
                <van-icon name="success" size="20" color="white" />
              </span>
              <a href="tel:13845678932" 
                class="addressbook-item-call"
                v-else>
                <van-icon name="phone" size="20" color="white" />
              </a>
            </dd>
          </dl>
        </van-list>
      </content-with-empty>
    </div>
  </div>
  
  <div class="page-footer" 
    v-if="isAdd">
    <div class="addressbook-submit"
      v-bind:class="{'on':commonList.length>0}">
      添加常用联系人
      <span v-if="commonList.length">({{commonList.length}})</span>
    </div>
  </div>
</div>
</template>

<script>
import { theme } from '@/config';
import contentWithEmpty from '@/components/contentWithEmpty';
import {fetchGet, fetchPost} from '@/api';
export default {
  name: 'addressbook-search',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '通讯录',
      searchKey: '',
      isAdd: true,// true 添加搜索； false 列表搜索
      noData: false,// 没有数据
      loading: false,//上拉加载
      finished: false,//上拉加载完毕
      list: [],
      commonList: [],
    }
  },
  methods: {
    onSearch() {
      this.$toast(this.searchKey)
    },
    onLoad() {
      this.$toast('onload')
    },
    onChecked(item) {
      item.checked = !item.checked
      if(item.checked) {
        this.commonList.push(item)
      } else {
        if(this.commonList.includes(item)){
          this.commonList = this.commonList.filter((ele)=>{
            return ele != item
          });
        }
      }
    }
  },
  created() {
    this.list = Array(8)
      .fill(null)
      .map(function() {
        return {
          url: null,
          name: '张三',
          //checked: false,
        }
      })
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

  &-item {
    @include flex-row();
    align-items:center;
    background-color:$color-white;
    padding:0px 10px;
    margin-top:8px;

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
      background-color:$color-c8;
      
      &.on {
        background-color:$color-primary;
      }
    }
  }

  &-submit {
    background-color:$color-f2;
    padding:10px 0;
    text-align:center;
    font-size:14px;
    color:$color-7d;

    &.on {
      background-color:$color-primary;
      color:$color-white;
    }
  }
}
</style>