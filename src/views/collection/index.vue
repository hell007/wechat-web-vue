<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="collection-tab">
        <van-tabs v-model="active"
          ref="vtabs"
          background="#fff"
          :border="false"
          @click="onTab"
          :color="primary"
          :title-active-color="primary">
          <van-tab title="能力测评">
            <content-with-empty 
              :empty="noData">
              <van-list
                class="collection-list"
                v-model="loadding"
                :finished="finished"
                :immediate-check="false" 
                :offset="10"
                finished-text="没有了"
                @load="onLoad">  
                <div class="collection-item">
                  <div class="collection-item-bd">
                    <div class="collection-item-name">
                      2020年双节活动-新春刮刮卡活动介绍
                    </div>
                    <p class="collection-item-time">发布时间：2020-03-05 12:00:00</p>
                  </div>
                  <div class="collection-item-ft">
                    <div class="left">
                      <span class="collection-item-opt">
                        <van-icon name="eye-o" size="14" />
                        <em>14</em>
                      </span>
                      <span class="collection-item-opt">
                        <van-icon name="star-o" size="14" />
                        <em>14</em>
                      </span>
                    </div>
                    <div class="right">
                      <van-button 
                        plain 
                        round 
                        size="small" 
                        type="info" 
                        :color="primary">
                        未考试反馈
                      </van-button>
                    </div>
                  </div>
                </div>

                <div class="collection-item">
                  <div class="collection-item-bd">
                    <div class="collection-item-name">
                      2020年双节活动-新春刮刮卡活动介绍
                    </div>
                    <p class="collection-item-time">发布时间：2020-03-05 12:00:00</p>
                  </div>
                  <div class="collection-item-ft">
                    <div class="left">
                      <span class="collection-item-opt">
                        <van-icon name="eye-o" size="14" />
                        <em>14</em>
                      </span>
                      <span class="collection-item-opt">
                        <van-icon name="star-o" size="14" />
                        <em>14</em>
                      </span>
                    </div>
                    <div class="right">
                      <van-button 
                        plain 
                        round 
                        size="small" 
                        type="info" 
                        :color="primary">
                        未考试反馈
                      </van-button>
                    </div>
                  </div>
                </div>
              </van-list> 
            </content-with-empty>
          </van-tab>

          <van-tab title="知识百科">
            <content-with-empty 
              :empty="noData">
              <van-list
                class="collection-list"
                v-model="loadding"
                :finished="finished"
                :immediate-check="false" 
                :offset="10"
                finished-text="没有了"
                @load="onLoad">  
                <div class="collection-item">
                  <div class="collection-item-bd">
                    <div class="collection-item-name">
                      2020年双节活动-新春刮刮卡活动介绍
                    </div>
                    <p class="collection-item-time">发布时间：2020-03-05 12:00:00</p>
                  </div>
                  <div class="collection-item-ft">
                    <div class="left">
                      <span class="collection-item-opt">
                        <van-icon name="eye-o" size="14" />
                        <em>14</em>
                      </span>
                      <span class="collection-item-opt">
                        <van-icon name="star-o" size="14" />
                        <em>14</em>
                      </span>
                    </div>
                  </div>
                </div>

                <div class="collection-item">
                  <div class="collection-item-bd">
                    <div class="collection-item-name">
                      2020年双节活动-新春刮刮卡活动介绍
                    </div>
                    <p class="collection-item-time">发布时间：2020-03-05 12:00:00</p>
                  </div>
                  <div class="collection-item-ft">
                    <div class="left">
                      <span class="collection-item-opt">
                        <van-icon name="eye-o" size="14" />
                        <em>14</em>
                      </span>
                      <span class="collection-item-opt">
                        <van-icon name="star-o" size="14" />
                        <em>14</em>
                      </span>
                    </div>
                  </div>
                </div>
              </van-list> 
            </content-with-empty>
          </van-tab>

          <van-tab title="销售话术">
            <content-with-empty 
              :empty="noData">
              <van-list
                class="collection-list"
                v-model="loadding"
                :finished="finished"
                :immediate-check="false" 
                :offset="10"
                finished-text="没有了"
                @load="onLoad">  
                <div class="collection-item">
                  <div class="collection-item-bd">
                    <div class="collection-item-name">
                      2020年双节活动-新春刮刮卡活动介绍
                    </div>
                    <p class="collection-item-time">发布时间：2020-03-05 12:00:00</p>
                  </div>
                  <div class="collection-item-ft">
                    <div class="left">
                      <span class="collection-item-opt">
                        <van-icon name="eye-o" size="14" />
                        <em>14</em>
                      </span>
                      <span class="collection-item-opt">
                        <van-icon name="star-o" size="14" />
                        <em>14</em>
                      </span>
                    </div>
                  </div>
                </div>
              </van-list> 
            </content-with-empty>            
          </van-tab>
        </van-tabs>
      </section>
    </div>
  </div>

</div>
</template>

<script>

import { theme } from '@/config';
import contentWithEmpty from '@/components/contentWithEmpty';

export default {
  name: 'reward-detail',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '我的收藏',
      active: 0,
      noData: false,// 没有数据
      loadding: false,//上拉加载
      finished: true,//上拉加载完毕
      pageNum: 1,
      pageSize:30,
      list: []
    }
  },
  methods: {
    onTab(index) {
      //this.$toast(index);
    },
    onLoad() {
      this.$toast('onLoad')
    }
  },
  created() {
    
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.collection {

  &-list {
    background-color:$color-white;
    margin-top:$margin;
    padding:0 10px;
  }

  &-item {
    padding:15px 0 10px;
    border-bottom:1px solid $color-border-gray;
    
    &-bd {
      margin-bottom:5px;
    }

    &-name {
      font-size:$font-14;
      color:$color-32;
      margin-bottom:8px;
    }

    &-time {
      font-size:$font-12;
      color:$color-c8;
      margin-bottom:0px;
    }

    &-ft {
      @include flex-row();
      align-items:center;

      .left {
        flex:2;
        @include flex-row();
        align-items:center;
      }

      .right {
        flex:3;
        text-align: right;
      }
    }

    &-opt {
      font-size:$font-12;
      color:$color-c8;
      margin-right:10px;
      @include flex-row();
      align-items:center;

      em {
        font-style:normal;
        margin-left:5px;
      }
    }
  }
}
</style>