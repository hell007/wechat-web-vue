<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <van-tabs
        @click="onTab"
        @change="onTabChange"
        animated
        :color="primary"
        :title-active-color="primary">
        <van-tab 
          v-for="item in tabs" 
          :key="item.label"
          :title="`${item.label}(${item.num})`">
          <van-row gutter="10" class="channel-picture">
            <van-col 
              span="8" 
              class="channel-picture-item"
              v-for="item,index in list"
              :key="`picture-${index}`">
              <van-image
                @click="showBig(index)"
                fit="cover"
                :src="item"
              />
            </van-col>
          </van-row>
        </van-tab>
      </van-tabs>
    </div>
  </div>

  <!-- 图片预览 -->
  <van-image-preview
    v-model="show"
    :images="list"
    @change="onChange">
    <template v-slot:index>第{{ index }}页</template>
  </van-image-preview>

</div>
</template>

<script>
import Vue from 'vue';
import { ImagePreview } from 'vant';
Vue.use(ImagePreview);
import { theme } from '@/config';

export default {
  name: 'channel-picture',
  components: {
    
  },
  data() {
    return {
      primary: theme.primary,
      title: '渠道照片',
      tabs: [{
        label: '全部',
        num: 3
      }, {
        label: '门头',
        num: 0
      }, {
        label: '海报',
        num: 1
      }, {
        label: '灯箱',
        num: 0
      }, {
        label: '台卡',
        num: 0
      }, {
        label: '业务导图',
        num: 0
      }],
      show: false,
      startPosition: 1,
      index: 1,
      list: [
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg',
        'https://img.yzcdn.cn/vant/cat.jpeg',
        'https://img.yzcdn.cn/vant/apple-1.jpg',
        'https://img.yzcdn.cn/vant/apple-2.jpg'
      ]
    }
  },
  methods: {
    onTab(name, title) {
      console.log('name==', name, title)
    },
    onTabChange(index) {
      console.log('index==',index)
    },
    showBig(index) {
      this.show = true
      this.startPosition = index+1
    },
    onChange(index) {
      this.index = index+1;
    }
  },
  created() {
    
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.channel {

  &-picture {
    padding:10px;
    @include flex-row();
    flex-wrap: wrap;

    &-item {
      min-height:80px;
      margin-bottom:5px;
    }
  }

}
</style>