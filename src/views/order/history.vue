<template>
<div class="page page-primary">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
    <form action="/" class="order-search">
     <van-search
        :background="primary"
        clearable
        v-model="key"
        placeholder="集团名称/订单类型/提单人/订单号/集团编码"
        shape="round"
        @search="onSearch">
      </van-search>
    </form>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="order-history">
        <div class="order-history-title">历史搜索</div>
        <div class="order-history-list">
          <span>物联网</span>
          <span>发票</span>
          <span>云南白药集团</span>
          <span>云南集团</span>
          <span>物联网</span>
          <span>发票</span>
          <span>云南白药集团</span>
          <span>云南集团</span>
        </div>
      </section>
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config';

export default {
  name: 'order-history',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '订单查询',
      key:'',
      list: []
    }
  },
  methods: {
    onSearch() {
      this.$toast('确定')
    },
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.page-scroller {
  background-color:$color-white;
}

.order {

  &-history {
    padding:12px;

    &-title {
      font-size:$font-14;
      color:$color-32;
      font-weight:bold;
      margin-bottom:15px;
    }

    &-list {
      @include flex-row();
      flex-wrap:wrap;

      span {
        padding:4px 12px;
        margin:0 16px 20px 0;
        border-radius:999px;
        font-size:$font-12;
        color:$color-7d;
        background-color:$color-f2;
        white-space:nowrap;
      }
    }

  }
  
}
</style>
