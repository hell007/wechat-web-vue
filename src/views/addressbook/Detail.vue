<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="addressbook-head">
        <div class="addressbook-head-panel">
          <img class="addressbook-head-picture"
            v-if="detail.url"
            src="../../assets/images/icons/connect_icon.png"/>
          <div v-else class="addressbook-head-text">张三</div>
        </div>
        <p>张三</p>
      </section>
      <section class="addressbook-panel">
        <h6 class="addressbook-panel-title">电话</h6>
        <ul class="addressbook-panel-list">
          <li class="addressbook-panel-item">
            <div class="left">138 8888 8888</div>
            <div class="right">
              <a href="tel:13888888xx" 
                class="addressbook-panel-btn">
                <van-icon name="phone" size="10" color="white" />
              </a>
              <span 
                @click="doCopy('电话','13888888888')">
                <van-icon class-prefix="xa-icon" name="clipboard" size="22" :color="primary" />
              </span>
            </div>
          </li>
          <li class="addressbook-panel-item">
            <div class="left">138 8888 8888</div>
            <div class="right">
              <a href="tel:13888888xx" 
                class="addressbook-panel-btn">
                <van-icon name="phone" size="10" color="white" />
              </a>
              <span 
                @click="doCopy('电话','13888888888')">
                <van-icon class-prefix="xa-icon" name="clipboard" size="22" :color="primary" />
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section class="addressbook-panel">
        <h6 class="addressbook-panel-title">短号</h6>
        <ul class="addressbook-panel-list">
          <li class="addressbook-panel-item">
            <div class="left">54789</div>
            <div class="right">
              <span 
                @click="doCopy('短号','54789')">
                <van-icon class-prefix="xa-icon" name="clipboard" size="22" :color="primary" />
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section class="addressbook-panel">
        <h6 class="addressbook-panel-title">邮箱</h6>
        <ul class="addressbook-panel-list">
          <li class="addressbook-panel-item">
            <div class="left">jiekema@yn.chinamoblie.com</div>
            <div class="right">
              <span 
                @click="doCopy('邮箱','jiekema@yn.chinamoblie.com')">
                <van-icon class-prefix="xa-icon" name="clipboard" size="22" :color="primary" />
              </span>
            </div>
          </li>
        </ul>
      </section>
      <section class="addressbook-panel">
        <ul class="addressbook-panel-list normal">
          <li class="addressbook-panel-item">
            <div class="left">
              添加到常用联系人
            </div>
            <div class="right">
              <van-switch 
                v-model="detail.isCommon" 
                size="24"
                :active-color="primary" 
                inactive-color="#f2f2f2" 
                @click="onSwitch"/>
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
import {fetchGet, fetchPost} from '@/api';
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

export default {
  name: 'addressbook-detail',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '通讯录',
      detail: {
        url: null,
        isCommon: false
      }
    }
  },
  methods: {
    doCopy(flag, text) {
      this.$copyText(text).then(res => {
        this.$toast(`${flag}复制成功`);
      }).catch(err => {
        this.$toast(`${flag}复制失败`);
      })
    },
    onSwitch() {
      const self = this
      self.detail.isCommon = !self.detail.isCommon
      if(self.detail.isCommon) {
        self.$dialog.confirm({
          confirmButtonColor:this.primary,
          message: '是否将联系人添加到常用联系人列表？',
        })
          .then(() => {
            self.detail.isCommon = true
          })
          .catch(() => {
            self.detail.isCommon = false
          })
      }else {
        self.$dialog.confirm({
          confirmButtonColor:this.primary,
          message: '是否将联系人从常用联系人列表中删除？',
        })
          .then(() => {
            self.detail.isCommon = false
          })
          .catch(() => {
            self.detail.isCommon = true
          })
      }
    }
  },
  created() {

  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.addressbook {

  $size: 90px;

  &-head {
    padding:20px 0;
    background-color:$color-primary;
    text-align:center;

    &-text,
    &-picture {
      width:$size;
      height:$size;
      margin:0 auto 20px;
      overflow:hidden;
      text-align:center;
      white-space:nowrap;
      line-height:$size;
      border-radius:999px;
    }

    &-text {
      background-color:$color-f7;
      font-size:30px;
      font-weight:bold;
      color:$color-primary;
    }

    p {
      margin-bottom:0;
      font-size:14px;
      color:$color-white;
    }
  }

  &-panel {
    padding:10px 16px;

    &-title {
      color:$color-32;
      font-size:14px;
      font-weight:normal;
    }

    &-list {
      padding-bottom:12px;
      margin-bottom:0;
      border-bottom:1px solid $color-border-gray;

      &.normal {
        padding-bottom:0;
        border-bottom:0;
      }
    }

    &-item {
      @include flex-row();
      align-items:center;

      .left {
        flex:2;        
      }

      .right {
        flex:1;
        @include flex-row();
        align-items:center;
        justify-content: flex-end;
        text-align:right;
      }
    }

    &-btn {
      display:inline-block;
      width:20px;
      height:20px;
      margin-right:15px;
      overflow:hidden;
      text-align:center;
      white-space:nowrap;
      line-height:20px;
      border-radius:999px;
      background-color:$color-primary;
    }

  }
}
</style>