<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
      <div slot="right" class="header-right" @click="navOption">
        <span class="header-right-text">
          操作
        </span>
      </div>
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <ul class="demo">
        <li class="demo-item"
          v-for="item in list"
          :key="item.name"
          @click="go(item)">{{item.name}}</li>
      </ul>
    </div>
  </div>

  <div class="page-footer">
    <div class="btn-bar">
      <van-button 
        class="btn btn-gray">取消</van-button>
      <van-button 
        class="btn btn-primary"
        :color="primary">确定</van-button>
    </div>
  </div>
</div>
</template>

<script>
import {fetchGet, fetchPost} from '@/api';  
import * as storage from '@/utils/storage';
import { theme } from '@/config';

export default {
  name: 'unit-index',
  components: {
    
  },
  data() {
    return {
      primary: theme.primary,
      title: '模板',
      list: [{
        name: '弹窗',
        url: '/dialog'
      }, {
        name: '下拉刷新上拉加载',
        url: '/refresh'
      }, {
        name: '上拉加载',
        url: '/list'
      }, {
        name: '表格',
        url: '/table'
      }, {
        name: '表单筛选',
        url: '/filter'
      },  {
        name: '表单填写',
        url: '/register'
      }, {
        name: '表单联动',
        url: '/address'
      }, {
        name: '表单展示',
        url: '/formDetail'
      }, {
        name: '图片',
        url: '/picture'
      }, {
        name: '图表',
        url: '/echarts'
      }, {
        name: '百度地图',
        url: '/location'
      }, {
        name: '我的收藏',
        url: 'collection'
      }, {
        name: '我的消息',
        url: 'message'
      }, {
        name: '我的订单',
        url: 'order'
      }, {
        name: '搜索',
        url: 'search'
      }, {
        name: '智能搜索',
        url: 'smart'
      }]
    }
  },
  methods: {
    navBack() {
      this.$router.back();
    },
    navOption() {
      this.$toast('操作');
    },
    go(item) {
      this.$router.push(item.url);
    },
    login() {
      const self = this 
      const user = {
        'loginId': '13988234913',//' 13988234913',
        'verifyCode': '708090'
      }
      fetchPost('/flep/app/api/sys/login', user).then(function (res) {
        console.log('login==', res)
        let data = res.data.body
        storage.set('token', data.token)
      }).catch(() => {
        self.$toast({type: 'error', message: '网络异常'});
      });
    }
  },
  created() {
    this.login()
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.demo {

  &-item {
    padding:10px;
    background-color:$color-white;
    border-bottom:1px solid $color-border-gray;
  }
}

.btn {
  flex:1;
  border-radius:0;

  &-bar {
    @include flex-row();
    background:$color-white;
  }
}
</style>