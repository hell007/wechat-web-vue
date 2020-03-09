<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="knowledge-panel">
        <div class="knowledge-text">
          <van-field v-model="form.text" 
            rows="5" 
            autosize 
            type="textarea" 
            maxlength="50" 
            placeholder="请输入其它原因理由" 
            show-word-limit />
        </div>
        <div class="knowledge-submit">
          <van-button 
            round 
            block 
            :color="primary" 
            size="normal" 
            @click="submit">提交回答</van-button>
        </div>
      </section>
    </div>
  </div>
  
</div>
</template>

<script>
import { theme } from '@/config';  
export default {
  name: 'knowledge-reply',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '回答',
      form: {
        type: '1',
        text:'这是一段文本编辑器内容。。。。',
      }
    }
  },
  methods: {
    collect() {
      this.isCollect = !this.isCollect
    },
    submit() {
      
    }
  },
  created() {
 
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.knowledge {

  &-panel {
    padding:10px;
  }

  &-text {
    border-bottom: 1px solid $color-border-gray;
    font-size:12px;
    color:$color-7d;
    border-radius:4px;
    box-shadow: inset 1px 2px 3px rgba(0,0,0,.8);
  }

  &-submit {
    margin:30px 0px;
    font-size:14px;
  }
}
</style>