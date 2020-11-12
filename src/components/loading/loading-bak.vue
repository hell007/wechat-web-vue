<template>
  <!-- <van-overlay 
    :show="show" 
    @click="show = false" 
    z-index="3"> -->
    <div class="loading-panel"
      v-if="show">
      <van-loading 
        size="20px"
        vertical>{{ text }}</van-loading>
    </div>
  <!-- </van-overlay> -->
</template>
<script>
export default {
  name: 'loading',
  props: {
    show: Boolean
  },
  data() {
    return {
    	text: '加载中...'
    }
  }
}
</script>
<style lang="scss" scoped>

.loading {

  &-panel {
    position:absolute;
    left:50%;
    top:50%;
    width:60px;
    height:60px;
    margin-left:-30px;
    margin-top:-30px;
  }
}
</style>