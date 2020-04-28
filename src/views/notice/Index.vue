<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty 
        :empty="noData">
        <van-list
          v-model="loadding"
          :finished="finished"
          :immediate-check="false" 
          :offset="10"
          finished-text="没有数据了！"
          @load="onLoad">  
          <section class="notice-item">
            <span class="notice-item-time">04月28日 10:00</span>
            <div class="notice-item-box">
              <h5 class="notice-item-hd">关于2020年公告名称公告名称公告名称</h5>
              <div class="notice-item-bd">
                <div class="notice-item-picture">
                  <img src="../../assets/images/icons/snapshot-example.jpg"/>
                </div>
                <div class="notice-item-text">
                  这是一个公告详情，这是一个公告详情，这是一个公告详情。这是一个公告详情，这是一个公告详情，这是一个公告详情。
                </div>
              </div>
              <div class="notice-item-ft">查看详情</div>
            </div>
          </section>
          <section class="notice-item">
            <span class="notice-item-time">04月28日 10:00</span>
            <div class="notice-item-box">
              <h5 class="notice-item-hd">关于2020年公告名称公告名称公告名称</h5>
              <div class="notice-item-bd">
                <div class="notice-item-picture">
                  <img src="../../assets/images/icons/snapshot-example.jpg"/>
                </div>
                <div class="notice-item-text">
                  这是一个公告详情，这是一个公告详情，这是一个公告详情。这是一个公告详情，这是一个公告详情，这是一个公告详情。这是一个公告详情，这是一个公告详情，这是一个公告详情。
                </div>
              </div>
              <div class="notice-item-ft">查看详情</div>
            </div>
          </section>
          <section class="notice-item">
            <span class="notice-item-time">04月28日 10:00</span>
            <div class="notice-item-box">
              <h5 class="notice-item-hd">关于2020年公告名称公告名称公告名称</h5>
              <div class="notice-item-bd">
                <div class="notice-item-picture">
                  <img src="../../assets/images/icons/store-img.jpg"/>
                </div>
                <div class="notice-item-text">
                  这是一个公告详情，这是一个公告详情，这是一个公告详情。这是一个公告详情，这是一个公告详情，这是一个公告详情。
                </div>
              </div>
              <div class="notice-item-ft">查看详情</div>
            </div>
          </section>
        </van-list> 
      </content-with-empty>
    </div>
  </div>

</div>
</template>

<script>
import contentWithEmpty from '@/components/contentWithEmpty';
import { theme } from '@/config';

export default {
  name: 'notice-index',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '公告',
      noData: false,// 没有数据
      loadding: false,//上拉加载
      finished: false,//上拉加载完毕
      pageNum: 1,
      pageSize:30,
      list: []
    }
  },
  methods: {
    onLoad() {
      this.$toast('load')
    }
  },
  created() {
    
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.notice {

  &-item {
    text-align:center;
    margin:10px 8px;

    &-time {
      background-color:$color-f2;
      font-size:12px;
      color:$color-c8;
      padding:4px 8px;
      border-radius:4px;

    }

    &-box {
      margin-top:8px;
      padding-top:8px;
      border-radius:8px;
      background-color:$color-white;
      box-shadow:2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    &-hd {
      font-size:14px;
      color:$color-32;
      margin-bottom:0px;
      padding:0px 10px;
      @include ellipsis();
    }

    &-bd {
      padding:10px 10px 0;
    }

    &-picture {
      width:100%;
      min-height:100px;
      max-height:150px;
      margin:0 auto;
      overflow:hidden;
      margin-bottom:8px;
    }

    &-text {
      font-size:12px;
      color:$color-7d;
      @include ellipsis(2,20px);
    }

    &-ft {
      padding:8px 10px;
      font-size:16px;
      color:$color-primary;
    }
  }
}
</style>