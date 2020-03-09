<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="knowledge-panel">
        <div class="knowledge-label">
          <span class="knowledge-label-key">回复类型</span>
          <div class="knowledge-label-val">
            <van-radio-group v-model="form.type">
              <van-radio 
                :checked-color="primary"
                v-for="(item,index) in radioOptions" 
                :key="item.value" 
                :name="item.value">{{item.name}}
              </van-radio>
            </van-radio-group>
          </div>
        </div>
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
            @click="submit">保存</van-button>
        </div>
      </section>
    </div>
  </div>
  
</div>
</template>

<script>
import { theme } from '@/config';  
export default {
  name: 'knowledge-repeat',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '回复',
      radioOptions: [{
        value: '1',
        name: '评论'
      }, {
        value: '2',
        name: '提问'
      }],
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

  &-label {
    padding:10px 0;
    @include flex-row();

    &-key {
      flex:1;
    }

    &-val {
      flex:3;

      .van-radio {
        margin-bottom:5px;
      }
    }
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