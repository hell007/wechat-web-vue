<template>
  <div class="page">
    <div class="page-header">
      <page-title :title="title"></page-title>
      <div class="work-label">
        <van-icon 
          v-if="mobile.length==11"
          class="work-label-add"
          name="add" 
          size="22"
          @click="onAdd" />
        <van-field
          v-model="mobile"
          input-align="center"
          maxlength="11"
          placeholder="请输入号码"
          readonly
          @touchstart.native.stop="show = true" />
        <van-icon 
          v-if="mobile.length>0"
          class="work-label-clear"
          name="clear" 
          size="22"
          @click="onClear" />
      </div>  
    </div>

    <div class="page-main">
      <div class="page-scroller">
        <content-with-empty
          :icon="require('../../assets/images/marketingActivity/empty.png')"
          size="large"
          :empty="noData">
          <van-list
            class="work-list"
            v-model="loading"
            :finished="finished"
            finished-text="好像没有更多了"
            :immediate-check="false"
            :offset="10"
            @load="onLoad">
            <dl class="work-item"
              v-for="item,index in list"
              :key="index">
              <dt class="work-item-left">
                <img class="work-item-picture"
                  v-if="item.picture"
                  :src="item.picture"/>
                <div class="work-item-text"
                  v-else>{{item.name.substring(item.name.length-2,item.name.length)}}</div>
              </dt>
              <dd class="work-item-right">
                <div class="work-item-info">
                  <span>{{item.name}}</span>
                  <span class="mobile">{{
                    item.mobile.substring(0, 3) +
                    " " +
                    item.mobile.substring(3, 7) +
                    " " +
                    item.mobile.substring(7, 11)
                  }}</span>
                </div>
              </dd>
            </dl>
          </van-list>
        </content-with-empty>
      </div>
    </div>
    
    <!-- 软键盘 -->
    <van-number-keyboard
      class="work-keyboard"
      get-container="body"
      v-model="mobile"
      :show="show"
      :maxlength="11"
      @blur="show = false"
      @input="onInput">
      <!-- <span class="work-keyboard-paste" 
        slot="extra-key"
        @click="onPaste">粘贴</span> -->
      <div class="work-keyboard-call"
        disabled
        slot="title-left">
        <van-button
          icon-prefix="xa-icon"
          icon="tonghua"
          :disabled="mobile.length!=11"
          :color="primary"
          round 
          @click="onCall">立即通话</van-button>
      </div>
    </van-number-keyboard>

    <div class="page-footer">
      <ul class="work-bar">
        <li>
          <van-icon 
            class-prefix="xa-icon"
            name="tonghuajilu" 
            size="20" />
          <span>通话记录</span>  
        </li>
        <li class="on">
          <van-icon 
            class-prefix="xa-icon"
            name="jianpan" 
            size="20" 
            :color="primary"/>
          <span>拨号盘</span>  
        </li>
        <li>
          <van-icon 
            class-prefix="xa-icon"
            name="tongxunlu" 
            size="20" />
          <span>通讯录</span>  
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { theme } from '@/config';  
import contentWithEmpty from '@/components/contentWithEmpty';

export default {
  name: "work-number-dial",
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '工作号拨号',
      show: false,
      mobile: '',
      noData: false,
      loading: false,
      finished: false,
      list: []
    }
  },
  methods: {
    onAdd() {
      console.log('add')
    },
    onClear() {
      this.mobile = ''
    },
    onPaste() {

    },
    onInput() {
      console.log(this.mobile)
    },
    onCall() {
      this.$toast(this.mobile)
    },
    onLoad(){

    }
  },
  created() {
    this.list = [{
      picture: null,
      name: '杰克马',
      mobile: '13888888888'
    },{
      picture: null,
      name: '杰克马',
      mobile: '13888888888'
    }]
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

$size: 50px;

.page {
  background:#fff;
}

.work {

  &-label {
    @include flex-row();
    align-items:center;
    padding:10px;
    border-bottom:1px solid $color-border-gray;

    &-add,
    &-clear {
      //font-size:22px;
      color:$color-96;
    }

    /deep/ .van-cell {
      font-size:20px;
    }

    /deep/ .van-cell::after {
      border-bottom:0;
    }
  }

  &-keyboard {
    padding-bottom:60px;

    &-paste {
      font-size:12px;
    }

    &-call {
      
    }

    /deep/ .van-number-keyboard__header,
    /deep/ .van-number-keyboard__title-left {
      position:absolute;
      bottom:0;
      left:0;
      right:0;
      text-align:center;
    }

    /deep/ .van-number-keyboard__header {
      position:absolute;
      bottom:10px;
      z-index:100;
    }
  }

  &-item {
    @include flex-row();
    align-items:center;
    background-color:$color-white;
    padding:0px 10px;
    border-bottom:1px solid $color-border-gray;

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

      .mobile {
        color:$color-96;
      }
    }
  }
  
  &-bar {
    @include flex-row();
    align-items:center;

    li {
      flex:1;
      justify-content: center;
      text-align: center;
      @include flex-column();

      &.on {
        
        color:$color-primary;
      }
    }
  }
}
</style>
