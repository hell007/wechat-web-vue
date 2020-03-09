<template>
  <div class="test">
    <span class="test-text" @click="test">{{title}}</span>
  </div>
</template>
<script>
export default {
  name: 'todo',
  data() {
    return {
      title: '测试页面',
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
.test {
  width:100px;
  height:100px;
  background-color:red;
  border-radius:4px;

  &-text {
    font-size:20px;
  }
}
</style>
