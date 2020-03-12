<template>
  <van-popup
    v-model="visible"
    :close-on-click-overlay="false"
    position="bottom">
    <div class="pop-header">
      <span class="pop-header-left" @click="onCancel">{{cancelText}}</span>
      <span class="pop-header-title">{{title}}</span>
      <span class="pop-header-right" @click="onConfirm">{{confirmText}}</span>
    </div>
    <div class="pop-main">
      <slot name="body"></slot>
    </div>
  </van-popup>
</template>
<script>
export default {
  name: "pop-bottom",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '请选择'
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
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel');
    },
    onConfirm() {
      this.$emit('confirm');
    }
  }
}
</script>
<style scoped lang="scss">
@import "../styles/_global.scss";

.pop {

  &-header {
    @include clearfix();
    height:44px;
    border-bottom:1px solid $color-border-gray;
    background-color:$color-f7;
    @include flex-row();
    align-items:center;
    font-size:$font-14;

    &-left,
    &-right {
      width:44px;
      text-align:center;
      color:$color-primary;
    }

    &-title {
      flex:4;
      text-align:center;
      color:$color-32;
      padding:0 5px;
    }
  }

  &-main {
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    scroll-behavior: smooth;
    @include scrollable();
    height:180px;
  }
}
</style>
