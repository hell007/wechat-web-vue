<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="notice-panel">
        <div class="notice-panel-title">
          关于2020年公告名称公告名称公告名称
        </div>
        <div class="notice-panel-author">
          创建人：sysAdmin
        </div>
        <div class="notice-panel-content">
          这是一个公告详情，这是一个公告详情，这是一个公告详情。这是一个公告详情，这是一个公告详情，这是一个公告详情。这是一个公告详情，这是一个公告详情，这是一个公告详情。
        </div>
      </section>
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config';

export default {
  name: 'notice-detail',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '公告详情',
    }
  },
  methods: {
    
  },
  created() {
    
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.notice {

  &-panel {
    margin-top:8px;
    padding:10px 16px;
    background-color:$color-white;
    
    &-title {
      @include flex-row();
      align-items:center;
      font-size:14px;
      color:$color-32;
      font-weight:bold;
      padding:8px 0;

      &::before {
        display:inline-block;
        content:'';
        width:4px;
        height:18px;
        margin-right:5px;
        background-color:$color-primary;
      }
    }

    &-author {
      font-size:12px;
      color:$color-96;
      padding:4px 0;
      border-bottom:1px solid $color-border-gray;
    }

    &-content {
      padding:10px 0;
      font-size:12px;
      color:$color-7d;
    }
  }
}
</style>