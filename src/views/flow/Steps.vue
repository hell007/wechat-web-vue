<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="flow-panel">
        <h5 class="flow-title">流程进度</h5>
        <ul class="step-panel">
          <li class="step-item on">
            <div class="step-item-time">
              <!-- <b>02-14</b>
              <p>16:00</p> -->
              <span class="step-item-number">4</span>
            </div>
            <div class="step-item-title">
              <b>等待处理</b>
              <p>处理人是 杰克马等4人会签</p>
            </div>
          </li>
          <li class="step-item">
            <div class="step-item-time">
              <b>02-14</b>
              <p>16:00</p>
              <span class="step-item-number">3</span>
            </div>
            <div class="step-item-title">
              <b>通过</b>
              <p>通过人是 【张三】，已耗时【2天2小时】</p>
            </div>
          </li>
          <li class="step-item">
            <div class="step-item-time">
              <b>02-14</b>
              <p>16:00</p>
              <span class="step-item-number">2</span>
            </div>
            <div class="step-item-title">
              <b>通过</b>
              <p>通过人是 【张三】，已耗时【2天2小时】</p>
            </div>
          </li>
          <li class="step-item">
            <div class="step-item-time">
              <b>02-14</b>
              <p>16:00</p>
              <span class="step-item-number">1</span>
            </div>
            <div class="step-item-title">
              <b>发起流程</b>
              <p>处理人是 【杰克马】，已耗时【2天2小时】</p>
            </div>
          </li>
        </ul>
      </section> 
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config';
export default {
  name: 'flow-steps',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '流程进度',
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
.flow {

  &-panel {
    padding:10px;
    background-color:$color-white;
  }
  
  &-title {
    font-size:14px;
    color:$color-32;
  }
}
</style>
