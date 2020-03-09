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
            name="radio">
            <div slot="input" class="number-filed">
              <van-radio-group 
                :checked-color="primary"
                v-model="form.p1"
                @change="onBroad">
                <van-radio name="0" shape="square">宽带无覆盖</van-radio>
                <van-radio name="1" shape="square">居住地能办移动宽带但移动宽带质量比其他运营商差</van-radio>
                <van-radio name="2" shape="square">其他</van-radio>
              </van-radio-group>
              <input
                v-if="form.p1==2"
                class="number-filed-input" 
                type="input"
                placeholder="选择其他需要填写备注"
              />
            </div>
          </van-field>

          <van-field
            label="手机信号问题"
            name="radio">
            <div slot="input" class="number-filed">
              <van-radio-group 
                :checked-color="primary"
                v-model="form.p2">
                <van-radio name="0" shape="square">居住地/工作地手机上网网速慢</van-radio>
                <van-radio name="1" shape="square">居住地/工作地手机打电话掉线或不清晰</van-radio>
                <van-radio name="2" shape="square">其他</van-radio>
              </van-radio-group>
              <input
                v-if="form.p2==2"
                class="number-filed-input" 
                type="input"
                placeholder="选择其他需要填写备注"
              />
            </div>
          </van-field>

          <van-field
            label="宽带业务问题"
            name="radio">
            <div slot="input" class="number-filed">
              <van-radio-group 
                :checked-color="primary"
                v-model="form.p3">
                <van-radio name="0" shape="square">宽带有覆盖但资费比其他运营商贵</van-radio>
                <van-radio name="1" shape="square">已经装了其他运营商的宽带</van-radio>
                <van-radio name="2" shape="square">其他</van-radio>
              </van-radio-group>
              <input
                v-if="form.p3==2"
                class="number-filed-input" 
                type="input"
                placeholder="选择其他需要填写备注"
              />
            </div>
          </van-field>

          <van-field
            label="资费问题"
            name="radio">
            <div slot="input" class="number-filed">
              <van-radio-group 
                :checked-color="primary"
                v-model="form.p4">
                <van-radio name="0" shape="square">流量不够用，超套费用贵或被限速</van-radio>
                <van-radio name="1" shape="square">语音不够用，超套费用贵</van-radio>
                <van-radio name="2" shape="square">主套餐固定扣费搞</van-radio>
                <van-radio name="3" shape="square">其他</van-radio>
              </van-radio-group>
              <input
                v-if="form.p4==3"
                class="number-filed-input" 
                type="input"
                placeholder="选择其他需要填写备注"
              />
            </div>
          </van-field>

          <van-field
            label="服务问题"
            name="radio">
            <div slot="input" class="number-filed">
              <van-radio-group 
                :checked-color="primary"
                v-model="form.p5">
                <van-radio name="0" shape="square">营业厅等候时间长</van-radio>
                <van-radio name="1" shape="square">工作人员态度不好</van-radio>
                <van-radio name="2" shape="square">业务咨询讲解不清楚</van-radio>
                <van-radio name="3" shape="square">投诉得不到及时解决</van-radio>
              </van-radio-group>
            </div>
          </van-field>

          <van-field
            v-model="form.p6"
            rows="3"
            autosize
            label="其他问题"
            type="textarea"
            maxlength="50"
            placeholder="请输入"
          />

          <van-field
            label="是否挽留成功"
            required
            name="radio">
            <div slot="input" class="number-filed">
              <van-radio-group 
                :checked-color="primary"
                v-model="form.p7">
                <van-radio name="0" shape="square">是</van-radio>
                <van-radio name="1" shape="square">否</van-radio>
              </van-radio-group>
            </div>
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
            required
            name="radio">
            <div slot="input" class="number-filed">
              <van-radio-group 
                :checked-color="primary"
                v-model="form.p8">
                <van-radio name="0" shape="square">中国电信</van-radio>
                <van-radio name="1" shape="square">中国联通</van-radio>
              </van-radio-group>
            </div>
          </van-field>

          <van-field
            v-model="form.p9"
            input-align="right"
            required
            label="使用的挽留政策"
            placeholder="请选择"
            @click="onPolicy">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="form.p10"
            input-align="right"
            required
            label="对手提供的资费政策"
            placeholder="请输入">
            <div slot="right-icon"></div>
          </van-field>

          <van-field
            v-model="form.p11"
            rows="4"
            autosize
            label="备注"
            type="textarea"
            maxlength="50"
            placeholder="请输入"
          />

        </div>
      </section>


      <div class="number-submit">
        <van-button round block :color="primary" @click="onSubmit">提交</van-button>
      </div>

    </div>
  </div>

  <!-- 政策弹窗 -->
  <pop-bottom 
    :visible="policy.show"
    @confirm="policyConfirm"
    @cancel="policyCancel">
    <div class="data-pop-body" slot="body">
      <div>
        <van-radio-group v-model="policy.radio" :checked-color="primary">
          <van-cell-group>
            <van-cell title="政策1">
              <van-radio slot="right-icon" name="政策1" />
            </van-cell>
            <van-cell title="政策2">
              <van-radio slot="right-icon" name="政策2" />
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </div>
    </div>  
  </pop-bottom>

</div>
</template>

<script>
import { theme } from '@/config';
import popBottom from '@/components/popBottom';


export default {
  name: 'form-user-register',
  components: {
    popBottom
  },
  data() {
    return {
      primary: theme.primary,
      title: '携出客户挽留登记',
      form: {
        name:'李白',
        phone:'135 2923 7491',
        time:'2020-02-19 10:00:00',
      },
      policy: {
        show: false,
        radio: ''
      }
    }
  },
  methods: {
    onBroad(name) {
      this.$toast(name)
    },
    onPolicy() {
      this.policy.show = true
    },
    policyConfirm() {
      this.policy.show = false
      this.$toast(this.policy.radio)
    },
    policyCancel() {
      this.policy.show = false
    },
    onSubmit() {
      this.$toast('提交')
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
      margin-top:10px;
      border:0;
      border-bottom:1px solid $color-primary;
    }
  }

  &-submit {
    margin:20px 10px;
  }

}
</style>
