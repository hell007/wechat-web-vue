<template>
  <div class="home">
    <span class="home-text" @click="test">{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'index',
  data() {
    return {
      title: '首页',
    }
  },
  methods: {
    test() {
      this.title = '你伤害了我！'
    }
  }
}
</script>

<style scoped lang="scss">
.home {
  width:100px;
  height:100px;
  background-color:blue;
  border-radius:4px;

  &-text {
    font-size:20px;
  }
}
</style>
