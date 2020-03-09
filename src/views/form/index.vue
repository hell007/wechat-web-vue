<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="number-tab">
        <van-tabs v-model="active"
          :color="primary"
          :title-active-color="primary">
          <van-tab title="代办工单">
            <div class="number-filter">
              <div class="number-filter-item">
                <van-checkbox 
                  v-model="filter.checked" 
                  shape="square"
                  icon-size="16px"
                  :checked-color="primary">过滤超时工单</van-checkbox>
              </div>
              <div class="number-filter-item" 
                @click="filter.littleTime=!filter.littleTime">
                <span>剩余时长</span>
                <van-icon 
                  :name="filter.littleTime ? 'ascending' : 'descending'" 
                  size="20px" 
                  :color="primary" />
              </div> 
              <div class="number-filter-item"
                @click="filter.applyTime=!filter.applyTime">
                <span>申请时间</span>
                <van-icon 
                  :name="filter.applyTime ? 'ascending' : 'descending'" 
                  size="20px" 
                  :color="primary" />
              </div>
            </div>
            
            <section class="number-panel">
              <content-with-empty 
                :empty="noData">
                <van-list
                  v-model="loadding"
                  :finished="finished"
                  :immediate-check="false" 
                  :offset="10"
                  @load="onLoad">  
                  <div class="number-item">
                    <div class="number-item-left">
                      <p>
                        <b>王安石</b>
                        <span>携出号码: 13800000000</span>
                      </p>
                      <p>申请携出时间：2020-02-20 16:00:00</p>
                    </div>
                    <div class="number-item-right">
                      <p>已超时</p>
                    </div>
                  </div>

                  <div class="number-item">
                    <div class="number-item-left">
                      <p>
                        <b>王安石</b>
                        <span>携出号码: 13800000000</span>
                      </p>
                      <p>申请携出时间：2020-02-20 16:00:00</p>
                    </div>
                    <div class="number-item-right">
                      <p><em>18</em>小时</p>
                      <p>剩余时长</p>
                    </div>
                  </div>
                </van-list> 
              </content-with-empty>
            </section>
          </van-tab>
          <van-tab title="工单列表">
            <form action="/" class="order-search">
             <van-search
                background="#fff"
                clearable
                v-model="key"
                placeholder="请输入客户号码/客户姓名"
                shape="round"
                @search="onSearch">
              </van-search>
            </form>
            <div class="number-filter">
              <div class="number-filter-item" 
                style="border-right:1px solid #ddd"
                @click="date.show = true">
                <span>挽留时间：</span>
                <span>{{filter.detainTime}}</span>
              </div>
              <div class="number-filter-item" 
                @click="state.show = true">
                <span>挽留状态：</span>
                <span>{{filter.state}}</span>
              </div>
            </div>

            <section class="number-panel">
              <content-with-empty 
                :empty="noData">
                <van-list
                  v-model="loadding"
                  :finished="finished"
                  :immediate-check="false" 
                  :offset="10"
                  @load="onLoad">  
                  <div class="number-item">
                    <div class="number-item-left">
                      <p>
                        <b>王安石</b>
                        <span>携出号码: 13800000000</span>
                      </p>
                      <p>挽留时间：2020-02-20 16:00:00</p>
                    </div>
                    <div class="number-item-right">
                      <div class="success">
                        <van-icon name="checked" size="20px" />
                        <span>成功</span>
                      </div>
                    </div>
                  </div>

                  <div class="number-item">
                    <div class="number-item-left">
                      <p>
                        <b>王安石</b>
                        <span>携出号码: 13800000000</span>
                      </p>
                      <p>挽留时间：2020-02-20 16:00:00</p>
                    </div>
                    <div class="number-item-right">
                      <div class="fail">
                        <van-icon name="clear" size="20px" />
                        <span>失败</span>
                      </div>
                    </div>
                  </div>

                  <div class="number-item">
                    <div class="number-item-left">
                      <p>
                        <b>王安石</b>
                        <span>携出号码: 13800000000</span>
                      </p>
                      <p>挽留时间：2020-02-20 16:00:00</p>
                    </div>
                    <div class="number-item-right">
                      <div>
                        <span>处理中</span>
                      </div>
                    </div>
                  </div>
                </van-list> 
              </content-with-empty>
            </section>
          </van-tab>
        </van-tabs>
      </section>

    </div>
  </div>

  <!-- 挽留时间 -->
  <van-popup
    v-model="date.show"
    position="bottom">
    <van-datetime-picker
      type="date"
      title="挽留时间"
      :min-date="date.minDate"
      :max-date="date.maxDate"
      @cancel="date.show = false"
      @confirm="dateConfirm"
    />
  </van-popup>

  <!-- 挽留状态 -->
  <van-popup v-model="state.show" 
    position="bottom">
    <van-picker 
      show-toolbar 
      title="挽留状态"
      :columns="state.columns" 
      @cancel="state.show=false" 
      @confirm="stateConfirm" />
  </van-popup>

</div>
</template>

<script>
import contentWithEmpty from '@/components/contentWithEmpty';
import * as utils from '@/utils';
import { theme } from '@/config';

export default {
  name: 'form-index',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '携出客户挽留',
      active: 0,
      filter: {
        checked: true,
        littleTime: true,
        applyTime: true,
        detainTime: '2020-02-20',
        state: '全部',
      },
      key:'',
      date: {
        show: false,
        minDate: new Date(),
        maxDate: new Date(2025, 12, 31),
      },
      state: {
        show: false,
        columns: ['处理中', '已完成']
      },
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
    dateConfirm(value) {
      this.date.show = false
      this.filter.detainTime = utils.formatDate(value, 'YYYY-MM-DD')
    },
    stateConfirm(value) {
      this.state.show = false
      this.filter.state = value
    },
    onLoad() {
      this.$toast(load)
    }
  },
  created() {

  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.number {

  &-filter {
    @include flex-row();
    align-items:center;
    padding:8px 10px;
    background-color: $color-white;
    font-size:12px;
    color:$color-32;

    &-item {
      flex:1;
      @include flex-row();
      align-items:center;
      justify-content:center;
    }
  }

  &-panel {
    padding:$margin 5px 0;
    @include clearfix();
  }

  &-item {
    padding:10px;
    margin-bottom:$margin;
    background-color: $color-white;
    border-radius: 5px;
    font-size:$font-14;
    white-space:nowrap;
    @include flex-row();
    align-items: center;

    p {
      margin-bottom:5px;
    }

    b {
      font-weight: normal;
      margin-right:15px;
    }

    em {
      font-style:normal;
      font-size: 16px;
      color:$color-red;
    }
    
    &-left {
      flex:3;
    }

    &-right {
      flex:1;
      margin-left:10px;
      text-align: center;

      div {
        @include flex-column();
        color:$color-primary;

        &.success {
          color:$color-blue;
        }

        &.fail {
          color:$color-red;
        }
      }
    }
  }

}
</style>
