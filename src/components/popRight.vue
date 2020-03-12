<template>
  <van-popup 
    v-model="show" 
    @click-overlay="onOverlay"
    position="right"
    :style="{height:'100%',width:'80%'}"
    get-container="body">
    <section class="pop">
      <div class="pop-header">{{title}}</div>
      <div class="pop-main">
        <div class="pop-scroller">
          <slot name="body"></slot>
        </div>
      </div>
      <div class="pop-footer">
        <van-button
          color="#C6A775"
          @click="onCancel">{{cancelText}}</van-button>
        <van-button
          :color="primary"
          @click="onConfirm">{{confirmText}}</van-button>
      </div>
    </section>
  </van-popup>  
</template>
<script>
import { theme } from '@/config'
export default {
  name: "pop-right",
  data() {
    return {
      primary: theme.primary
    }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '筛选'
    },
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确定'
    },
    cancel: {
      type: Function,
      default: null
    },
    confirm: {
      type: Function,
      default: null
    },
    overlay: {
      type: Function,
      default: null
    }
  },
  computed: {
    show: {
      get() {
        return this.visible
      },
      set(val) {
        this.$emit('update:visible', val)
      }
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onConfirm() {
      this.$emit('confirm');
    },
    onOverlay() {
      this.$emit('overlay');
    }
  }
}
</script>
<style scoped lang="scss">
@import "../styles/_global.scss";

.pop {
    display: flex;
    flex-direction: column;
    height: 100%;

  &-header {
    height:44px;
    line-height:44px;
    border-bottom:1px solid $color-border-gray;
    background-color:$color-f7;
    font-size:$font-14;
    font-weight:bold;
    color:$color-32;
    padding:0 10px;
    position:relative;
    //z-index:20;
  }

  &-main {
    position:relative;
    flex:1;
    //z-index:20;
  }

  &-scroller {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    scroll-behavior: smooth;
    @include scrollable();
  }

  &-footer {
    height:40px;
    position:relative;
    //z-index:20;
    @include flex-row();
    align-items:center;
    border-top:1px solid $color-border-gray;
    background-color:$color-f7;

    .van-button {
      flex:1;
      border:0;
      border-radius:0;
      font-size:14px;
      height:40px;
      line-height:38px;
    }
  }
}
</style>
