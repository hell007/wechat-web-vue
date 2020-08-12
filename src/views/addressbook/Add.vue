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
      <van-index-bar
        class="addressbook-list"
        :sticky="false"
        :highlight-color="primary"
        @select="onSelect">
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
              <span class="addressbook-item-call"
                v-bind:class="{'on':it.checked}"
                @click="onChecked(it)">
                <van-icon name="success" size="20" color="white" />
              </span>
            </dd>
          </dl>
        </template>
      </van-index-bar>
    </div>
  </div>
  
  <div class="page-footer">
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
export default {
  name: 'addressbook-add',
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
    onSelect(index) {
      this.$toast(index)
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
    let list = Array(8)
      .fill(null)
      .map(function() {
        return {
          url: null,
          name: '张三',
          checked: false
        }
      })

    this.options = [{
      index: 'A',
      list: list
    },{
      index: 'B',
      list: list
    },{
      index: 'C',
      list: []
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

  &-list {

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