<template>
  <div class="empty">
    <div v-if="empty" class="empty-panel">
      <span class="empty-panel-icon">
        <img :src="icon" />
      </span>
      <span>{{tips}}</span>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
  export default {
    name: "contentWithEmpty",
    props: {
      empty: {
        type: Boolean,
        default: false
      },
      icon: {
        type: String,
        default: require('@/assets/images/empty.png')
      },
      tips: {
        type: String,
        default: '暂无数据'
      }
    }
  }
</script>

<style scoped lang="scss">
@import "../styles/_global.scss";

.empty {
  //height:100%;

  &-panel {
    padding:50px 12px;
    text-align:center;
    color:$color-7d;
    font-size:12px;

    &-icon {
      display:block;
      //content:'';
      width:160px;
      height:160px;
      margin:0 auto;
      //background-image:url(../assets/images/empty.png);
      //background-size:100%;
    }
  }
}
</style>
