<template>
<div class="page page-primary">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
    <form action="/" class="search-search">
     <van-search
        :background="primary"
        clearable
        v-model="key"
        placeholder="服务"
        shape="round"
        @search="onSearch">
      </van-search>
    </form>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty
        tips="没有找到匹配的结果"
        :empty="noData">
        <van-list
          v-model="loadding"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          :offset="10"
          @load="onLoad">
          <div class="search-item">
            <h6 class="search-item-title">功能</h6>
            <ul class="search-item-list">
              <li>
                <span class="search-item-icon">
                  <img src="../../assets/images/icons/store-img.jpg" />
                </span>
                <span class="search-item-text">移动<strong>服务</strong>日</span>
              </li>
            </ul>
          </div>

          <div class="search-item">
            <h6 class="search-item-title">知识百科</h6>
            <ul class="search-item-list">
              <li>
                <span class="search-item-icon">
                  <img src="../../assets/images/icons/store-img.jpg" />
                </span>
                <span class="search-item-text">10085渠道<strong>服务</strong>专线开通待办宽带业务</span>
              </li>
              <li>
                <span class="search-item-icon">
                  <img src="../../assets/images/icons/store-img.jpg" />
                </span>
                <span class="search-item-text">10085渠道<strong>服务</strong>专线开通待办宽带业务</span>
              </li>
            </ul>
          </div>

          <div class="search-item">
            <h6 class="search-item-title">销售话术</h6>
            <ul class="search-item-list">
              <li>
                <span class="search-item-icon">
                  <img src="../../assets/images/icons/store-img.jpg" />
                </span>
                <span class="search-item-text">移动<strong>服务</strong>日</span>
              </li>
            </ul>
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
  name: 'search-search',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '搜索',
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

.search {

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

  &-list {
    padding:0 5px;
    @include clearfix();
  }

  &-item {
    padding:0 10px;
    margin-bottom:$margin;
    background-color: $color-white;

    &-title {
      font-size:14px;
      color:$color-32;
      padding:8px 0;
      margin-bottom:0;
      border-bottom:1px solid $color-border-gray;
    }

    &-list {

      li {
        @include flex-row();
        align-items: center;
        padding:8px 0;
        font-size:12px;
        color:$color-7d;

        &:last-child {

          .search-item-text {
            border-bottom: 0;
          }
        }

        strong {
          color:$color-primary;
        }
      }
    }

    &-icon {
      width:30px;
      height:30px;
      margin-right:20px;
      border-radius:999px;

      img {
        border-radius:999px;
      }
    }

    &-text {
      flex:5;
      padding:6px 0;
      border-bottom: 1px solid $color-border-gray;
    }
  }
}
</style>
