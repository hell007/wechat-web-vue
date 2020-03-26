<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
    <form action="/" class="order-search">
     <van-search
        :background="primary"
        clearable
        v-model="key"
        placeholder="订单号"
        shape="round"
        @input="onInput"
        @search="onSearch">
      </van-search>
    </form>
    <section class="order-tab"
      v-if="!noData && !isSearch">
      <van-tabs v-model="active"
        @click="onTab"
        :color="primary"
        :title-active-color="primary">
        <van-tab title="全部"></van-tab>
        <van-tab title="在办单"></van-tab>
        <van-tab title="已归档"></van-tab>
      </van-tabs>
      <div class="order-tab-filter" 
        @click="filter.show=true">
        <span>筛选</span>
        <van-icon name="filter-o" size="18"></van-icon>
      </div>
    </section>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <!-- 搜索联想 -->
      <section class="order-result"
        v-if="isSearch">
        <ul class="order-result-list">
          <li class="order-result-item">
            <b>云南白药</b>
          </li>
          <li class="order-result-item">
            <b>云南白药</b>集团
          </li>
          <li class="order-result-item">
             <b>云南白药</b>喷雾剂
          </li>
          <li class="order-result-item">
             <b>云南白药</b>
          </li>
        </ul>
      </section>

      <content-with-empty
        v-if="!isSearch"
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
  
  <!-- 右弹窗 -->
  <pop-right
    :visible.sync="filter.show"
    @confirm="popConfirm"
    @overlay="popOverlay"
    @cancel="popCancel">
    <section slot="body" class="order-filter">
      <dl class="order-filter-panel">
        <dt class="order-filter-hd">订单类型(多选)</dt>
        <dd class="order-filter-bd">
          <span v-for="item,index in filter.types" 
            :key="index"
            :class="{on:filter.type.includes(index)}"
            @click="popCheckbox(index)">{{item.label}}</span>
        </dd>
      </dl>
      <dl class="order-filter-panel">
        <dt class="order-filter-hd">提单年份(单选)</dt>
        <dd class="order-filter-bd">
          <span v-for="item,index in filter.years" 
            :key="index"
            :class="{on:filter.year == index}"
            @click="popRadio(index)">{{item.label}}</span>
        </dd>
      </dl>
      <dl class="order-filter-panel">
        <dt class="order-filter-hd">提单月份</dt>
        <dd class="order-filter-bd">
          <span>1月</span>
          <span>2月</span>
          <span>3月</span>
        </dd>
      </dl>
      <dl class="order-filter-panel">
        <dt class="order-filter-hd">其他条件</dt>
        <dd class="order-filter-bd">
          <span>集团名称</span>
          <span>集团编码</span>
          <span>订单人</span>
          <span>订单编号</span>
        </dd>
      </dl>
    </section>
  </pop-right>

</div>
</template>

<script>
import contentWithEmpty from '@/components/contentWithEmpty';
import popRight from '@/components/popRight';
import { theme } from '@/config';
import {fetchGet, fetchPost} from '@/api';  

export default {
  name: 'order',
  components: {
    contentWithEmpty,
    popRight
  },
  data() {
    return {
      primary: theme.primary,
      title: '订单搜索',
      isSearch: false,//搜索中
      filter: {
        show: false,
        types: [{
          label: '物联网',
          value: '11'
        },{
          label: '互联网',
          value: '12',
        },{
          label: '局域网',
          value: '13',
        },{
          label: '大数据',
          value: '14',
        }],
        type: [],
        years: [{
          label: '2018',
          value: '11'
        },{
          label: '2019',
          value: '12',
        },{
          label: '2020',
          value: '13',
        },{
          label: '2021',
          value: '14',
        }],   
        year: null, //初始必须为null
      },
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
    popConfirm() {
      this.$toast('确定')
    },
    popOverlay() {
      this.filter.show = false
      this.$toast('遮罩关闭')
    },
    popCancel() {
      this.filter.show = false
    },
    // 多选案列
    popCheckbox(index) {
      if(this.filter.types.includes(index)){
        this.filter.types = this.filter.types.filter((ele)=>{
          return ele != index
        });
      } else {
        if(this.filter.type.includes(index)) {
          this.filter.type = this.filter.type.filter((e)=>{
            return e != index
          })
        } else {
          this.filter.type.push(index)
        }
      }

      console.log('this.filter.type==', this.filter.type)
    },
    // 单选案列
    popRadio(index) {
      if(this.filter.year==index) {
        this.filter.year = null
      } else {
        this.filter.year = index
      }
      
      console.log('this.filter.year==', index)
    },
    onInput() {
      console.log(this.key)
      if(this.key) {
        this.isSearch = true
      } else {
        this.isSearch = false
      } 
    },
    onSearch() {
      console.log(this.key)
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
    },
    test() {
      const self = this 
      const user = {
        'loginId': '13988234913',//' 13988234913',
        'verifyCode': '708090'
      }
      fetchPost('/flep/app/api/sys/login', user).then(function (res) {
        console.log('发生了请求==', res)
      }).catch(() => {
        self.$toast({type: 'error', message: '网络异常'});
      });
    }
  },
  created() {
    this.test()
  },
  mounted() {

  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";


.order {

  &-result {
    position:absolute;
    right:0;
    left:0;
    top:0;
    z-index:2;
    background-color:$color-white;
    height:100%;

    &-list {
      padding:0 10px;
    }

    &-item {
      padding:10px 0;
      font-size:14px;
      color:$color-32;
      border-bottom:1px solid $color-border-gray;

      b {
        font-weight:normal;
        color:$color-7d;
      }
    }
  }

  &-tab {
    @include flex-row();
    align-items:center;
    background-color:$color-white;

    .van-tabs {
      flex:4;
    }

    &-filter {
      flex:1;
      padding-left:16px;
      border-left:1px solid $color-c8;
      @include flex-row();
      align-items:center;
    }
  }

  &-filter {
    padding:10px 0;
    
    &-panel {
      padding:0 12px;
      margin-bottom:8px;
      border-bottom:1px solid $color-border-gray;
    }

    &-hd {
      font-size:14px;
      color:$color-32;
      font-weight:normal;
      margin-bottom:8px;
    }

    &-bd {
      @include flex-row();
      flex-wrap:wrap;

      span {
        width:30%;
        text-align:center;
        padding:5px 0;
        font-size:13px;
        color:$color-32;
        border-radius:4px;
        background-color:$color-f2;
        margin-right:5%;
        margin-bottom:5%;
        cursor:pointer;

        &:nth-child(3n) {
          margin-right:0;
        }

        &.on {
          background-color:rgba(254,243,231,.8);
          color:$color-primary;
        }
      }
    }
  }

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
