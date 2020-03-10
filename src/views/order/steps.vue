<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="order-panel">
        <h5 class="order-title">订单进度</h5>

        <ul class="step-panel">
          <li class="step-item on">
            <div class="step-item-time">
              <b>02-14</b>
              <p>16:00</p>
              <span class="step-item-number">3</span>
            </div>
            <div class="step-item-title">
              <b>等待审核</b>
              <p>处理人是 【杰克马】，已耗时【2天2小时】，联系电话【138888888888】</p>
            </div>
          </li>
          <li class="step-item">
            <div class="step-item-time">
              <b>02-14</b>
              <p>16:00</p>
              <span class="step-item-number">2</span>
            </div>
            <div class="step-item-title">
              <b>等待审核</b>
              <p>处理人是 【杰克马】，已耗时【2天2小时】，联系电话【138888888888】</p>
            </div>
          </li>
          <li class="step-item">
            <div class="step-item-time">
              <b>02-14</b>
              <p>16:00</p>
              <span class="step-item-number">1</span>
            </div>
            <div class="step-item-title">
              <b>等待审核</b>
              <p>处理人是 【杰克马】，已耗时【2天2小时】，联系电话【138888888888】</p>
            </div>
          </li>
        </ul>

        
        <van-button @click="go" type="primary">去订单</van-button>
        
        <van-steps 
          class="order-steps"
          direction="vertical"
          :active-color="primary"
          :active="0">
          <van-step>
            <b>等待审核</b>
            <p>处理人是 【杰克马】，已耗时【2天2小时】，联系电话【138888888888】</p>
            <p>2020-2-14 16:00</p>
          </van-step>
          <van-step>
            <b>已提交</b>
            <p>处理人是 【杰克马】，已耗时【2天2小时】，联系电话【138888888888】</p>
            <p>2020-2-12 16:00</p>
          </van-step>
          <van-step>
            <b>已提交</b>
            <p>处理人是 【杰克马】，已耗时【2天2小时】，联系电话【138888888888】</p>
            <p>2020-2-10 16:00</p>
          </van-step>
        </van-steps> 
      </section> 
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config';

export default {
  name: 'order-steps',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '订单进度',
    }
  },
  methods: {
    onSearch() {
      this.$toast('确定')
    },
    onTab(index) {
      this.$toast(index)
    },
    onLoad() {
      this.$toast(load)
    },
    go() {
      this.$router.push('/order')
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('刷新', to)
    to.meta.keepAlive = false; // order刷新
    next();
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";
.order {

  &-panel {
    padding:10px;
    background-color:$color-white;
  }
  
  &-title {
    font-size:14px;
    color:$color-32;
  }

  &-steps {

    b {
      font-size:13px;
    }

    p {
      font-size:12px;
      margin-bottom:0px;
    }
  }
}
</style>
