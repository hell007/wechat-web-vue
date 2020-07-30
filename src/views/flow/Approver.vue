<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <ul class="approver-list">
        <li class="approver-item"
          v-for="item,index in list"
          :key="index">
          <div class="icon">
            <img :src="item.url" />
          </div>
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>

<script>
import { theme } from '@/config';
import {fetchGet, fetchPost} from '@/api';

export default {
  name: 'flow-approver',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '审批人',
      list: [{
        url: require('../../assets/images/icons/pro_xqtbrcbs.png'),
        name: '张三'
      }, {
        url: require('../../assets/images/icons/pro_xqtbrcbs.png'),
        name: '张三'
      }, {
        url: require('../../assets/images/icons/pro_xqtbrcbs.png'),
        name: '张三'
      }, {
        url: require('../../assets/images/icons/pro_xqtbrcbs.png'),
        name: '张三'
      }, {
        url: require('../../assets/images/icons/pro_xqtbrcbs.png'),
        name: '张三'
      }]
    }
  },
  methods: {
  },
  created() {
  },
  mounted() {
  }
}
</script>
<style scoped lang="scss">
.approver {

  &-list {
    @include clearfix();
    background-color:#fff;
    padding:8px 16px;
  }

  &-item {
    float:left;
    width:20%;
    margin-bottom:15px;
    text-align:center;

    .icon {
      width:30px;
      height:30px;
      margin:0 auto;
    }

    span {
      font-size:12px;
      color:$color-c8;
      white-space:nowrap;
    }
  }
}
</style>
