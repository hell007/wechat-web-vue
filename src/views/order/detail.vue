<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
    <div class="order-label">
      <b>在办单</b>
      <span>
        <van-icon 
          class-prefix="xa-icon"
          name="time" 
          color="#fff"
          size="50" />
      </span>
    </div>  
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <div class="order-time">
        <van-icon name="clock" :color="primary" size="28"/>
        <div class="order-time-text">
          <span>等待审核，处理人是【杰克马】，已耗时【2天2小时】，联系电话【138888888888】</span>
          <p>到达时间：2020-02-14 16:00</p>
        </div>
      </div>

      <div class="order-item">
        <div class="order-item-hd">
          <div class="order-item-name">
            <van-icon 
              class-prefix="xa-icon"
              :color="primary"
              name="company"
              size="18" />
            <h6>云南白药集团</h6>
          </div>
          <span class="order-item-state">在办单</span>
        </div>
        <div class="order-item-bd">
          <div class="order-item-picture">
            <img src="../../assets/images/icons/store-img.jpg" />
          </div>
          <div class="order-item-text">
            <div class="order-item-row">
              <span>千里眼</span>
              <em>官渡区分公司</em>
            </div>
            <p>已完成</p>
            <p>提单信息：逍遥子 2020-01-06 15:26</p>
          </div>
        </div>
        <div class="order-item-opt">
          <van-button 
            round 
            plain
            size="small"
            :color="primary"
            @click="go">查看进度</van-button>
        </div>
      </div>

      <section class="order-panel">
        <h5 class="order-panel-title">业务信息</h5>
        <div class="order-row">
          <span class="order-row-key">订单编号：</span>
          <span class="order-row-val">1234567890</span>
        </div>
        <div class="order-row">
          <span class="order-row-key">专线类型：</span>
          <span class="order-row-val">1234567890</span>
        </div>
        <div class="order-row">
          <span class="order-row-key">宽带：</span>
          <span class="order-row-val">1234567890</span>
        </div>
        <div class="order-row">
          <span class="order-row-key">A端地址：</span>
          <span class="order-row-val">云南省昆明市西山区广福路2号中国移动云南有限公司</span>
        </div>

        <div class="order-row">
          <span class="order-row-key">xxxxxxx：</span>
          <span class="order-row-val">xxxxxxxxxxxxxxxxx</span>
        </div>
        <div class="order-row">
          <span class="order-row-key">绿色通道开通时间：</span>
          <span class="order-row-val">2020-01-31 15：00</span>
        </div>
      </section>

      <section class="order-panel">
        <h5 class="order-panel-title">业务信息</h5>
        <div class="order-row">
          <span class="order-row-key">订单编号：</span>
          <span class="order-row-val">1234567890</span>
        </div>
        <div class="order-row">
          <span class="order-row-key">专线类型：</span>
          <span class="order-row-val">1234567890</span>
        </div>
        <div class="order-row">
          <span class="order-row-key">宽带：</span>
          <span class="order-row-val">1234567890</span>
        </div>
        <div class="order-row">
          <span class="order-row-key">A端地址：</span>
          <span class="order-row-val">云南省昆明市西山区广福路2号中国移动云南有限公司</span>
        </div>

        <div class="order-row">
          <span class="order-row-key">xxxxxxx：</span>
          <span class="order-row-val">xxxxxxxxxxxxxxxxx</span>
        </div>
        <div class="order-row">
          <span class="order-row-key">绿色通道开通时间：</span>
          <span class="order-row-val">2020-01-31 15：00</span>
        </div>
      </section>
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config';

export default {
  name: 'order-detail',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '订单详情',
    }
  },
  methods: {
    go() {
      this.$router.push('orderSteps')
    }
  },
  beforeRouteLeave(to, from, next) {
    console.log('不刷新', to)
    to.meta.keepAlive = true; // order不刷新
    next();
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.order {

  &-label {
    @include flex-row();
    align-items: center;
    background-color: $color-primary;

    b,
    span {
      flex:1;
      text-align: center;
    }

    b {
      font-size: 16px;
      color:$color-white;
    }
  }

  &-time {
    @include flex-row();
    align-items: center;
    padding:10px;
    margin-bottom:$margin;
    background-color:$color-white;

    &-text {
      margin-left:15px;
      font-size:12px;
      color:$color-primary;

      p {
        margin-bottom:0px;
        color:$color-999;
      }
    }
  }

  &-item {
    margin:$margin 5px;
    padding:10px;
    background-color: $color-white;
    border-radius: 8px;

    &-hd {
      margin-bottom:10px;
      @include flex-row();
    }

    &-name {
      flex:4;
      align-items: center;
      @include flex-row();

      h6 {
        flex:3;
        margin-left:4px;
        font-size:$font-14;
        overflow:hidden;
        margin-bottom:0;
      }
    }

    &-state {
      flex:1;
      font-size:$font-14;
      color:$color-primary;
      text-align:right;
    }

    &-bd {
      @include flex-row();
    }

    &-picture {
      flex:1;
      max-width:80px;
      overflow: hidden;
      margin-right:10px;

      img {
        border-radius:4px;
      }
    }

    &-text {
      flex:2.5;
      @include flex-column();
      font-size: 12px;
      color:$color-32;

      p {
        margin-bottom:8px;
        color:$color-7d;
      }
    }

    &-row {
      @include flex-row();
      margin-bottom:8px;

      span {
        flex:3;
        font-size:$font-14;
      }

      em {
        flex:2;
        font-style: normal;
        color:$color-7d;
      }
    }

    &-opt {
      text-align: right;

      .van-button {
        font-size:12px;
        color:$color-7d;
      }
    }
  }

  &-panel {
    padding:10px;
    margin:$margin 5px;
    border-radius: 8px;
    background-color:$color-white;

    &-title {
      font-size:14px;
      color:$color-32;
    }
  }

  &-row {
    @include flex-row();
    font-size: $font-14;
    margin-bottom:5px;

    &-key {
      flex:2;
      white-space: nowrap;;
    }

    &-val {
      flex:3;
      color:$color-7d;
    }
  }
}
</style>
