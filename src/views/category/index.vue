<template>
<div class="page page-primary">
  <div class="page-header">
    <page-title :title="title">
      <div slot="right" class="header-right" @click="navOption">
        <span class="header-right-text">
          已归档
        </span>
      </div>
    </page-title>
    <form action="/" class="knowledge-search">
     <van-search
        :background="primary"
        clearable
        v-model="key"
        placeholder="请输入标题或关键词"
        show-action
        shape="round"
        @search="onSearch"
        @cancel="onCancel">
      </van-search>
    </form>
    <section class="knowledge-filter">
      <van-dropdown-menu>
        <van-dropdown-item v-model="opt1" :options="option1" @change="change1"/>
        <van-dropdown-item v-model="opt2" :options="option2" @change="change1"/>
        <van-dropdown-item v-model="opt3" :options="option3" @change="change1"/>
      </van-dropdown-menu>
    </section>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty 
        :empty="noData"
        tips="没有数据，快去添加吧！">
        <van-list
          class="knowledge-list"
          v-model="loadding"
          :finished="finished"
          :immediate-check="false" 
          :offset="10"
          :finished-text="finishedText"
          @load="onLoad">  
          <div class="knowledge-item">
            <div class="knowledge-item-hd on">
              <!-- <van-icon name="fire" /> -->
              <h6>5G业务知识、5G咪咕业务、5G客服文档</h6>
            </div>
            <div class="knowledge-item-bd">
              <span class="knowledge-item-opt"
                @click="onViews">
                <van-icon  
                  class="on"
                  name="eye-o" size="18"/>
                <em>853</em>
              </span>
              <span class="knowledge-item-opt">
                <van-icon class="on" name="chat-o" size="18"/>
                <em>853</em>
              </span>
              <span class="knowledge-item-opt">
                <van-icon class="on" name="star-o" size="18"/>
                <em>853</em>
              </span>
              <span class="knowledge-item-opt">
                <van-icon class="on" name="good-job-o" size="18"/>
                <em>853</em>
              </span>
            </div>
          </div>
          <div class="knowledge-item">
            <div class="knowledge-item-hd">
              <h6>5G业务知识、5G咪咕业务、5G客服文档</h6>
            </div>
            <div class="knowledge-item-bd">
              <span class="knowledge-item-opt">
                <van-icon name="eye-o" size="18"/>
                <em>853</em>
              </span>
              <span class="knowledge-item-opt">
                <van-icon name="chat-o" size="18"/>
                <em>853</em>
              </span>
              <span class="knowledge-item-opt">
                <van-icon name="star-o" size="18"/>
                <em>853</em>
              </span>
              <span class="knowledge-item-opt">
                <van-icon name="good-job-o" size="18"/>
                <em>853</em>
              </span>
            </div>
          </div>
        </van-list> 
      </content-with-empty>
    </div>
  </div>

</div>
</template>

<script>
import contentWithEmpty from '@/components/contentWithEmpty';
import { theme } from '@/config';
import * as utils from '@/utils';
export default {
  name: 'knowledge-index',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '知识库',
      opt1: 0,
      opt2: 0,
      opt3: 0,
      option1: [
        { text: '显示全部', value: 0 },
        { text: '其他', value: 1 },
      ],
      option2: [
        { text: '全部百科知识', value: 0 },
        { text: '其他', value: 1 },
      ],
      option3: [
        { text: '全部类型', value: 0 },
        { text: '其他', value: 1 },
      ],
      noData: false,// 没有数据
      loadding: false,//上拉加载
      finished: false,//上拉加载完毕
      finishedText: '-我是有底线的-',
      pageNum: 1,
      pageSize:10,
      list: []
    }
  },
  methods: {
    navOption() {
      this.$toast('已归档')
    },
    onSearch() {
      this.$toast('确定')
    },
    onCancel() {
      this.$toast('取消')
    },
    change1(val) {
      this.$toast(val)
    },
    onViews() {

    },
    getList() {
      const self = this

      const state = true
      const total = 30
      if (state) {

        let p = Math.ceil(total / self.pageSize)

        // 暂无数据
        if (total==0) {
          self.noData = true
          return
        }

        // 有数据
        
        if (self.pageNum > p) {// 没有数据了
          self.finished = true
          return
        } else {// 请求中
          utils.delay(1000).then(function() {
            let rows = Array(10)
              .fill(null)
              .map(function() {
                return {
                  title:'5G业务知识、5G咪咕业务、5G客服文档',
                  view: true
                }
              }) 
            self.list = self.list.concat(rows)  
            self.loadding = false
          })
        }

      } else {// 错误提示
        self.$message({
          message: '查询失败了！',
          type: 'error'
        })
      }
    },
    onLoad() {
      // this.pageNum++
      // console.log('下一页==', this.pageNum)
      // this.getList();
    }
  },
  created() {
    //this.getList()
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.knowledge {

  &-search {
    .van-search {
      padding:6px;

      &__action,
      &__action:active {
        color: $color-white;
        background-color:$color-primary;
      }
      
    }
  }

  &-filter {

    .van-dropdown-menu {
      height:40px;

      &__title {
        font-size:14px;
      }

      &__item {
        min-width: auto;
        padding-right: 12px;
        border-right: 1px solid $color-border-gray;
        font-size:13px;

        &:last-child {
          border-right:0;
        }
      }
    }
  }

  &-list {
    background-color: $color-white;
  }

  &-item {
    padding:5px 10px;
    border-bottom:1px solid $color-border-gray;

    &-hd {
      @include flex-row();

      h6 {
        flex:5;
        font-size:13px;
        color:$color-7d;
      }

      &.on {

        h6 {
          color:$color-blue;
        }

        &::after {
          display:inline-block;
          content: '';
          width:5px;
          height:5px;
          border-radius:3px;
          background: $color-red;
        }
      }
    }

    &-bd {
      @include flex-row();
      justify-content: flex-end;   
    }

    &-opt {
      @include flex-row();
      align-items: center;
      margin-right:15px;
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
}
</style>