<template>
  <header class="header">
    <div class="header-left" @click="navBack">
      <span class="header-btn header-btn-back">
        返回
      </span>
    </div>
    <div class="header-title">
      {{title}}
    </div>
    <slot name="right"></slot>
  </header>
</template>
<script>
export default {
  name: "pageTitle",
  props: {
    title: {
      type: String,
      default: ""
    },
    isBack: {
      type: Boolean,
      default: false
    },
    onBack: {
      type: Function,
      default: null    
    }
  },
  methods: {
    navBack() {
      //console.log('==',this.isBack) 
      this.isBack ? this.$emit('onBack') : this.$router.go(-1)
    }  
  }
}
</script>
<style scoped lang="scss">
</style>
