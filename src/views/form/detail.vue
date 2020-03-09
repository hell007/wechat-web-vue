<template>
<div class="page page-primary">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="number-panel">
        <div class="number-panel-title">
          <b>当前工单流转节点</b>
        </div>
        <div class="number-panel-bd">
          <div class="number-state">
            <div class="number-state-pic">区县中台</div>
            <div class="number-state-text">
              <span>处理中</span>
              <div>
                <p>2020-02-19 14:00:00</p>
                <p>李白 13800000000</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      <section class="number-panel">
        <div class="number-panel-title">
          <b>客户信息</b>
        </div>
        <div class="number-panel-bd">
          <van-field
            v-model="form.name"
            readonly
            label="客户姓名"
            placeholder="请输入">
          </van-field>

          <van-field
            v-model="form.phone"
            readonly
            label="携出号码"
            placeholder="请输入">
          </van-field>

          <van-field
            v-model="form.time"
            readonly
            label="申请时间"
            placeholder="请输入">
          </van-field>
        </div>
      </section>

      <section class="number-panel">
        <div class="number-panel-title">
          <b>客户携出原因</b>
        </div>
        <div class="number-panel-bd">
          <van-field
            label="宽带网络问题"
            readonly
            name="radio">
            <div slot="input" class="number-filed">
              <span>居住地能办移动宽带但移动宽带质量比其他运营商差</span>
              <input
                v-if="form.p1==2"
                class="number-filed-input" 
                type="input"
                readonly
                placeholder="选择其他需要填写备注"
              />
            </div>
          </van-field>

          <van-field
            label="手机信号问题">
            <div slot="input" class="number-filed">
              <span>其他</span>
              <input
                v-if="form.p2==2"
                class="number-filed-input" 
                readonly
                type="input"
                value="客户反映的问题xxx"
                placeholder="选择其他需要填写备注"
              />
            </div>
          </van-field>

          <van-field
            label="宽带业务问题">
            <div slot="input" class="number-filed">
              <span>宽带有覆盖但资费比其他运营商贵</span>
              <input
                v-if="form.p3==2"
                class="number-filed-input" 
                type="input"
                readonly
                placeholder="选择其他需要填写备注"
              />
            </div>
          </van-field>

          <van-field
            label="资费问题">
            <div slot="input" class="number-filed">
              <span>流量不够用，超套费用贵或被限速</span>
              <input
                v-if="form.p4==3"
                class="number-filed-input" 
                type="input"
                readonly
                placeholder="选择其他需要填写备注"
              />
            </div>
          </van-field>

          <van-field
            label="服务问题">
            <div slot="input" class="number-filed">
              <span>营业厅等候时间长</span>
            </div>
          </van-field>

          <van-field
            v-model="form.p6"
            readonly
            rows="3"
            autosize
            label="其他问题"
            type="textarea"
            maxlength="50"
            placeholder="请输入"
          />

          <van-field
            label="是否挽留成功"
            input-align="right"
            readonly
            v-model="form.p7">
          </van-field>
        </div>
      </section>

      <section class="number-panel">
        <div class="number-panel-title">
          <b>挽留信息</b>
        </div>
        <div class="number-panel-bd">
          <van-field
            label="申请携转至"
            input-align="right"
            readonly
            v-model="form.p8">
          </van-field>

          <van-field
            label="使用的挽留政策"
            input-align="right"
            readonly
            v-model="form.p9">
          </van-field>

          <van-field
            label="携转信息来源"
            input-align="right"
            readonly
            v-model="form.p12">
          </van-field>

          <van-field
            label="对手提供的资费政策"
            input-align="right"
            readonly
            v-model="form.p10">
          </van-field>

          <van-field
            v-model="form.p11"
            readonly
            rows="4"
            autosize
            label="备注"
            type="textarea"
            maxlength="50"
            placeholder="请输入"
          />

        </div>
      </section>
      
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config';

export default {
  name: 'form-user-detail',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '携出客户挽留详情',
      form: {
        name:'李白',
        phone:'135 2923 7491',
        time:'2020-02-19 10:00:00',
        p1: '1',
        p2: '2',
        p7: '是',
        p8:'中国电信',
      }
    }
  },
  methods: {
    getInfo() {
      this.$toast('info')
    }
  },
  created() {
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";
.number {

  &-panel {
    margin-bottom:$margin;
    background-color: $color-white;

    &-title {
      padding: 8px;
      border-bottom: 1px solid $color-border-gray;

      b {
        font-size:$font-14;
      }
    }

    &-bd {
      @include clearfix();
      padding: 0 5px;
    }

    .van {

      &-cell {
        //padding: 10px 0px 10px 16px;

        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }

  &-filed {
    @include flex-column();

    .van-radio {
      margin-bottom:5px;
    }

    &-input {
      border:0;
      border-bottom:1px solid $color-primary;
    }
  }

  &-state {
    padding:8px 10px;
    font-size:$font-14;
    @include flex-row();
    align-items:center;

    &-pic {
      width:60px;
      height:60px;
      text-align:center;
      line-height:60px;
      border-radius:999px;
      background-color:$color-primary;
      color:$color-white;
      font-size:$font-12;
    }

    &-text {
      @include flex-row();
      align-items:center;
      flex:3;

      span {
        flex:2;
        padding:0 10px;
      }
      
      p {
        margin-bottom:5px;
      }
    }
  }
}
</style>
