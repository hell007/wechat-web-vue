<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
    <van-search
      v-model="key"
      shape="round"
      background="#fff"
      show-action
      placeholder="公交">
      <div slot="action" @click="onSearch">
        <van-button 
          round 
          size="small" 
          :color="primary">搜索</van-button>
      </div>
    </van-search>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty
        :empty="noData"
        tips="暂无数据！">
        <van-list
          class="visit-company"
          v-model="loadding"
          :finished="finished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有了！"
          @load="onLoad">
          <div class="visit-company-item">
            <div class="visit-company-hd">
              <div class="com-logo">
                <img src="../../assets/images/icons/store-img.jpg"/>
              </div>
              <div class="com-name">
                <b>云南白药集团</b>
                <p>距您393米 | 民航路76号附近</p>
              </div>
              <div class="com-way">
                <van-icon class-prefix="xa-icon" name="way" size="20" />
                <em>路线</em>
              </div>
            </div>
            <div class="visit-company-bd">
              <div class="com-text">
                <p>本月已拜访：0次</p>
                <p>最近一次拜访时间：2020-4-17 12:00</p>
                <p>关键人：张三 李四</p>
              </div>
              <div class="com-btn">
                <van-button
                  round
                  size="small"
                  :color="primary">去拜访</van-button>
              </div>
            </div>
          </div>
          <div class="visit-company-item">
            <div class="visit-company-hd">
              <div class="com-logo">
                <img src="../../assets/images/icons/store-img.jpg"/>
              </div>
              <div class="com-name">
                <b>云南白药集团</b>
                <p>距您393米 | 民航路76号附近</p>
              </div>
            </div>
            <div class="visit-company-bd">
              <div class="com-text">
                <p>本月已拜访：0次</p>
                <p>最近一次拜访时间：2020-4-17 12:00</p>
                <p>关键人：张三 李四 张三 李四 张三 李四</p>
              </div>
              <div class="com-btn">
                <van-button
                  round
                  size="small"
                  :color="primary">设置位置</van-button>
              </div>
            </div>
          </div>
          <div class="visit-company-item">
            <div class="visit-company-hd">
              <div class="com-logo">
                <img src="../../assets/images/icons/store-img.jpg"/>
              </div>
              <div class="com-name">
                <b>云南白药集团</b>
                <p>距您393米 | 民航路76号附近</p>
              </div>
              <div class="com-way">
                <van-icon class-prefix="xa-icon" name="way" size="20" />
                <em>路线</em>
              </div>
            </div>
            <div class="visit-company-bd">
              <div class="com-text">
                <p>本月已拜访：0次</p>
                <p>最近一次拜访时间：2020-4-17 12:00</p>
                <p>关键人：张三 李四</p>
              </div>
              <div class="com-btn">
                <van-button
                  round
                  size="small"
                  :color="primary">去拜访</van-button>
              </div>
            </div>
          </div>
        </van-list>
      </content-with-empty>  
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config'
import contentWithEmpty from '@/components/contentWithEmpty'
export default {
  name: 'visit-search',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '客户搜索',
      key: '',
      noData: false,// 没有数据
      loadding: false,//上拉加载
      finished: false,//上拉加载完毕
    }
  },
  methods: {
    onSearch() {
      this.$toast('搜索')
    },
    onLoad() {

    }
  },
  created() {
    
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";
.page .van-search__action, 
.page .van-search__action:active {
  color: $color-primary;
  background-color: #fff;
}

.visit {

  &-company {
 
    &-item {
      padding:10px;
      margin:8px;
      background-color:$color-white;
      border-radius:8px;
      box-shadow:2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    &-hd {
      @include flex-row();
      align-items:center;
      margin-bottom:8px;

      .com-logo {
        width:40px;
        height:40px;
        margin-right:10px;
        overflow:hidden;
      }

      .com-name {
        flex:4;

        b {
          font-size:14px;
          color:$color-32;
        }

        p {
          font-size:12px;
          color:$color-7d;
          margin-bottom:0;
        }
      }

      .com-way {
        flex:1;
        @include flex-column();
        text-align:center;

        i {
          color:$color-96;
        }

        em {
          font-style:normal;
          font-size:12px;
          transform:scale(.8);
        }
      }
    }

    &-bd {
      @include flex-row();

      .com-text {
        flex:3;

        p {
          //font-size:12px;
          margin-bottom:8px;
          color:$color-7d;
        }
      }

      .com-btn {
        flex:1;
        position:relative;

        .van-button {
          position:absolute;
          bottom:0;
          right:0;
          width:70px;
        }
      }
    }
  }

}
</style>