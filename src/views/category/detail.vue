<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="knowledge-panel">
        <h2 class="knowledge-title">5G业务知识、5G咪咕业务、5G客服文档</h2>
        <ul class="knowledge-desc">
          <li>分享人<span>周雨萌</span></li>
          <li>组织角色<span>规划发展团队 培训管理</span></li>
        </ul>
        <div class="knowledge-text">
          <span v-html="text"></span>
          <div class="knowledge-download">
            <van-icon 
              name="link" 
              class-prefix="xa-icon"
              :color="primary"
              size="14"/>
             <a href="#">下载资源.pdf</a>
             <van-icon 
              name="download" 
              class-prefix="xa-icon"
              :color="primary"
              size="18"/>
          </div>
        </div>
        <div class="knowledge-tags">
          <span class="knowledge-tags-label">标签</span>
          <div class="knowledge-tags-val">
            <van-tag  
            v-for="(tag,index) in tags" 
            :key="index" 
            plain 
            :color="primary"
            type="primary">{{tag}}</van-tag>
          </div>
        </div>
        <div class="knowledge-opt">
          <span class="knowledge-opt-item">
            <van-icon name="eye-o" size="18"/>
            <em>853</em>
          </span>
          <span class="knowledge-opt-item">
            <van-icon name="chat-o" size="18"/>
            <em>853</em>
          </span>
          <span class="knowledge-opt-item">
            <van-icon name="star-o" size="18"/>
            <em>853</em>
          </span>
          <span class="knowledge-opt-item">
            <van-icon class="on" name="good-job-o" size="18"/>
            <em>853</em>
          </span>
          <span class="knowledge-opt-item">
            <van-icon class="on" class-prefix="xa-icon" name="bad-job" size="18"/>
            <em>853</em>
          </span>
        </div>
      </section>

      <section class="knowledge-panel">
        <h2 class="knowledge-title">提问与答疑</h2>
        <div class="knowledge-reply">
          <div class="knowledge-reply-name">
            <div class="knowledge-reply-name-txt">刘艳</div>
          </div>
          <div class="knowledge-reply-info">
            <div class="knowledge-reply-area-name">刘艳 银业员</div>
            <div class="knowledge-reply-content">这是发布的内容</div>
            <div class="knowledge-reply-time">
              <div>2020-02-11 15:00:00</div>
              <van-icon name="chat-o" size="20" />
            </div>
            <div class="knowledge-comment">
              <div class="knowledge-comment-area-name">小张:</div>
              <div class="knowledge-comment-content">这是一个回复内容</div>
            </div>
          </div>
        </div>
        <div class="knowledge-reply">
          <div class="knowledge-reply-name">
            <div class="knowledge-reply-name-txt">刘艳</div>
          </div>
          <div class="knowledge-reply-info">
            <div class="knowledge-reply-area-name">刘艳 银业员</div>
            <div class="knowledge-reply-content">这是发布的内容</div>
            <div class="knowledge-reply-time">
              <div>2020-02-11 15:00:00</div>
              <van-icon name="chat-o" size="20" />
            </div>
            <div class="knowledge-comment">
              <div class="knowledge-comment-area-name">小张:</div>
              <div class="knowledge-comment-content">这是一个回复内容</div>
            </div>
          </div>
        </div>
      </section>  
    </div>
  </div>
  
  <div class="page-footer">
    <div class="knowledge-bar">
      <div class="knowledge-bar-left">
        <input readonly placeholder="请输入提问" />
      </div>
      <div class="knowledge-bar-right">
        <van-button :icon="isCollect ?'star-o':'star'" 
          size="small" 
          :color="primary"
          @click="collect">{{isCollect?'收藏':'取消收藏'}}</van-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { theme } from '@/config';
export default {
  name: 'knowledge-detail',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '知识百科',
      text:'这是一段文本编辑器内容。。。。',
      tags: ['双节营销', '双节刮刮卡'],
      isCollect: true
    }
  },
  methods: {
    collect() {
      this.isCollect = !this.isCollect
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
    padding:0 10px 10px;
    margin-bottom: 10px;
    background-color: $color-white;
  }

  &-title {
    @include flex-row();
    align-items:center;
    padding: 10px 0 5px;
    font-size: 14px;
    color:$color-32;
    font-weight:normal;

    &::before {
      display:inline-block;
      content: '';
      width: 2px;
      height: 15px;
      margin-right:5px;
      background-color: $color-primary;
    }
  }

  &-desc {
    margin-bottom: 10px;
    border-bottom: 1px solid $color-border-gray;

    li {
      font-size:12px;
      color:$color-999;
      margin-bottom: 10px;

      span {
        color:$color-666;
        margin-left:5px;
      }
    }
  }

  &-text {
    padding: 10px 0;
    margin-bottom: 15px;
    border-bottom: 1px solid $color-border-gray;
  }

  &-download {
    @include flex-row();
    align-items: center;
    margin-top: 10px;

    a {
      font-size:12px;
      color:$color-7d;
      margin:0 5px;
    }

  }

  &-tags {
    padding:10px 0;
    @include flex-row();

    &-label {
      margin-right:15px;
    }

    &-val {
      flex:4;

      .van-tag {
        margin:0 10px 10px 0;
      }
    }
  }

  &-opt {
    @include flex-row();

    &-item {
      @include flex-row();
      align-items: center;
      margin-right:12px;
      font-size:12px;
      color:$color-7d;

      em {
        font-style:normal;
        margin-left:3px;
      }

      i.on {
        color:$color-primary;
      }
    }
  }

  &-reply {
    display: flex;
    padding: 10px 0;

    &-name {
      width: 50px;
      height: 50px;
      line-height: 18px;
      border-radius: 50%;
      background-color: $color-96;
      color: $color-white;
      margin-right: 10px;

      &-txt {
        text-align: center;
        margin-top: 50%;
        transform: translateY(-50%);
      }
    }

    &-area-name {
      font-size: 13px;
      color: $color-666;
    }

    &-time {
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: $color-999;
      padding-bottom: 5px;
      border-bottom: 1px solid $color-border-gray;
    }

    &-time .van-icon {
      color: $color-primary;
    }

    &-info {
      flex: 1;
      padding-bottom: 5px;
    }

    &-content {
      font-size: 12px;
      color: $color-32;
      padding: 5px 0;
    }
  }

  &-comment {
    padding: 5px 10px;
    border-bottom: 1px solid $color-border-gray;

    &-area-name {
      font-size: 13px;
      color: $color-666;
    }

    &-content {
      font-size: 12px;
      color: $color-32;
    }
  }

  &-bar {
    padding:5px 10px;
    background-color: $color-white;
    @include flex-row();
    align-items: center;

    &-left {
      flex:3;

      input {
        font-size: 12px;
        padding: 5px;
      }
    }

    &-right {
      flex:2;
      text-align:right;
    }
  }
}


</style>