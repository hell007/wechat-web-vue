<template>
  <!--城市多级联动-->
  <van-popup 
    class="multiPicker"
    v-model="multiPicker.show" 
    :close-on-click-overlay="false"
    position="bottom">
    <div class="multiPicker-hd">
      <span class="multiPicker-hd-title">{{title}}</span>
      <span class="multiPicker-hd-close"
        @click="onCancel">
        <van-icon name="cross" size="20" />
      </span>
    </div>
    <van-tabs 
      :color="primary"
      :title-active-color="primary"
      :border="false"
      v-model="multiPicker.active"
      animated
      class="multiPicker-tabs">
      <van-tab 
        class="multiPicker-panel"
        v-for="mpList,mpIndex in multiPicker.columns"
        :key="mpIndex"
        :title="mpList.length>0 ? multiPicker.selected[mpIndex].name : ''" 
        :name="mpIndex">
        <ul class="multiPicker-panel-list"
          v-if="!multiPicker.loading">
          <li class="multiPicker-panel-item"
            v-for="item,index in mpList"
            :key="item.name"
            @click="multiPickerSelect(mpIndex, item)">
            <van-icon 
              class="multiPicker-panel-item-check"
              v-if="multiPicker.selected[mpIndex] && multiPicker.selected[mpIndex].name == item.name"
              name="success" 
              :color="primary"
              size="12" />
            <span>{{item.name}}</span>
          </li>
        </ul>
        <div class="multiPicker-panel-loading"
           v-if="multiPicker.loading">
          <van-loading 
            size="28px"
            :color="primary" 
            vertical>
            {{tips}}
          </van-loading>
        </div>
      </van-tab>
    </van-tabs>
  </van-popup>
</template>
<script>
import { theme } from '@/config'  
export default {
  name: "vant-multi-picker",
  data() {
    return {
      primary: theme.primary,
      multiPicker: {
        show: false,
        level: 2, // 层级 根据需求自定义
        active: 0,
        loading: false,
        columns: [],
        selected: []
      },
      tips: '加载中...'
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '请选择地址'
    },
    options: {
      type: Object,
      default: {}
    },
    cancel: {
      type: Function,
      default: null
    },
    change: {
      type: Function,
      default: null
    }
  },
  watch: {
    visible() {
      this.multiPicker.show = this.visible;
    },
    multiPicker() {
      this.multiPicker = this.options
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    multiPickerSelect(mpIndex, item) {
      this.$emit('change', mpIndex, item);
    }
  },
  created() {
    this.multiPicker = this.options
  }
}
</script>
<style scoped lang="scss">
@import "../styles/_global.scss";

.multiPicker {

  &-hd {
    @include flex-row();
    align-items:center;
    height:40px;

    &-title {
      flex:4;
      text-align: center;
      font-size:14px;
      color:$color-32;
      transform:translate(20px,0);
    }

    &-close {
      width:40px;
      height:100%;
      text-align:center;
      padding-top:10px;
      overflow:hidden;
      color:$color-7d;
    }
  }

  &-tabs {
    margin-top:-2px;

    /deep/ .van-tabs{
      
      &__wrap {
        height:40px;
      }
    }

    /deep/ .van-tab {
      flex:none;
      width:80px;
    }
  }

  &-panel {
    position:relative;
    height:220px;

    &-list {
      margin-top:5px;
      padding:0 10px;
      height:200px;
      @include scrollable();
      scroll-behavior: smooth;
    }

    &-item {
      line-height:40px;
      font-size:14px;
      color:$color-32;

      &-check {
        margin-right:5px;
      }
    }

    &-loading {
      position:absolute;
      left:50%;
      top:50%;
      min-width:60px;
      height:60px;
      margin-left:-30px;
      margin-top:-30px;

      .van-loading__text {
        font-size:12px;
        color:$color-primary;
      }
    }
  } 
}
</style>
