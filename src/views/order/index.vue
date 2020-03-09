<template>
<div class="page page-primary">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
    <form action="/" class="order-search">
     <van-search
        :background="primary"
        clearable
        v-model="key"
        placeholder="集团名称/订单类型/提单人/订单号/集团编码"
        shape="round"
        @search="onSearch">
      </van-search>
    </form>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="order-tab"
        v-if="!noData">
        <van-tabs v-model="active"
          @click="onTab"
          :color="primary"
          :title-active-color="primary">
          <van-tab title="全部"></van-tab>
          <van-tab title="在办单"></van-tab>
          <van-tab title="已归档"></van-tab>
        </van-tabs>
      </section>

      <content-with-empty
        :empty="noData"
        :icon="require('@/assets/images/empty.png')">
        <van-list
          class="order-list"
          v-model="loadding"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          :offset="10"
          @load="onLoad">
          <div class="order-item">
            <div class="order-item-hd">
              <div class="order-item-name">
                <van-icon 
                  class-prefix="xa-icon"
                  name="company"
                  :color="primary"
                  size="18" />
                <h6>云南白药集团</h6>
              </div>
              <span class="order-item-state">在办单</span>
            </div>
            <div class="order-item-bd">
              <div class="order-item-picture">
                <img src="../../assets/images/icons/store-img.jpg" />
              </div>
              <div class="order-item-text">
                <div class="order-item-row">
                  <span>千里眼</span>
                  <em>官渡区分公司</em>
                </div>
                <p>进行中：逍遥子 13987654321</p>
                <p>提单信息：逍遥子 2020-01-06 15:26</p>
              </div>
            </div>
            <div class="order-item-opt">
              <van-button 
                round 
                plain
                size="small"
                :color="primary"
                @click="go">查看详情</van-button>
            </div>
          </div>
          <div class="order-item">
            <div class="order-item-hd">
              <div class="order-item-name">
                <van-icon 
                  class-prefix="xa-icon"
                  name="company"
                  :color="primary"
                  size="18" />
                <h6>云南白药集团</h6>
              </div>
              <span class="order-item-state">在办单</span>
            </div>
            <div class="order-item-bd">
              <div class="order-item-picture">
                <img src="../../assets/images/icons/store-img.jpg" />
              </div>
              <div class="order-item-text">
                <div class="order-item-row">
                  <span>千里眼</span>
                  <em>官渡区分公司</em>
                </div>
                <p>已完成</p>
                <p>提单信息：逍遥子 2020-01-06 15:26</p>
              </div>
            </div>
            <div class="order-item-opt">
              <van-button 
                round 
                plain
                size="small"
                :color="primary"
                @click="go">查看详情</van-button>
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

export default {
  name: 'order',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '订单搜索',
      active: 0,
      key:'',
      noData: false,// 没有数据
      loadding: false,//上拉加载
      finished: false,//上拉加载完毕
      pageNum: 1,
      pageSize:10,
      list: []
    }
  },
  methods: {
    onSearch() {
      this.$toast('确定')
    },
    onTab(index) {
      this.$toast(index)
    },
    onLoad() {
      this.$toast(load)
    },
    go() {
      this.$router.push('orderDetail')
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.order {

  &-list {
    padding:$margin 5px;
    @include clearfix();
  }

  &-item {
    padding:10px;
    margin-bottom:$margin;
    background-color: $color-white;
    border-radius: 8px;

    &-hd {
      margin-bottom:10px;
      @include flex-row();
    }

    &-name {
      flex:4;
      align-items: center;
      @include flex-row();

      h6 {
        flex:3;
        margin-left:4px;
        font-size:$font-14;
        overflow:hidden;
        margin-bottom:0;
      }
    }

    &-state {
      flex:1;
      font-size:$font-14;
      color:$color-primary;
      text-align:right;
    }

    &-bd {
      @include flex-row();
    }

    &-picture {
      flex:1;
      max-width:80px;
      overflow: hidden;
      margin-right:10px;

      img {
        border-radius:4px;
      }
    }

    &-text {
      flex:2.5;
      @include flex-column();
      font-size: 12px;
      color:$color-32;

      p {
        margin-bottom:8px;
        color:$color-7d;
      }
    }

    &-row {
      @include flex-row();
      margin-bottom:8px;

      span {
        flex:3;
        font-size:$font-14;
      }

      em {
        flex:2;
        font-style: normal;
        color:$color-7d;
      }
    }

    &-opt {
      text-align: right;

      .van-button {
        height:30px;
        line-height:30px;
        font-size:12px;
        color:$color-7d;
      }
    }
  }
}
</style>
