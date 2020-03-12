<template>
<div class="page page-primary">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="number-panel">
        <div class="number-panel-bd">
          <van-field
            v-model="form.province"
            input-align="right"
            readonly
            label="省份"
            placeholder="请输入">
            <div slot="right-icon"></div>
          </van-field>

          <van-field
            v-model="form.city"
            input-align="right"
            readonly
            label="地市"
            placeholder="请选择"
            @click="openMultiPicker()">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="form.county"
            input-align="right"
            readonly
            label="区县"
            placeholder="请选择">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="form.town"
            input-align="right"
            readonly
            label="乡镇"
            placeholder="请选择">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="form.village"
            input-align="right"
            readonly
            label="路/村"
            placeholder="请选择">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="form.address"
            input-align="right"
            clearable
            label="详细地址"
            placeholder="请输入">
            <div slot="right-icon"></div>
          </van-field>

          <van-field
            v-model="form.name"
            input-align="right"
            clearable
            label="联系人"
            placeholder="请输入">
            <div slot="right-icon"></div>
          </van-field>

          <van-field
            v-model="form.phone"
            input-align="right"
            clearable
            label="联系电话"
            placeholder="请输入">
            <div slot="right-icon"></div>
          </van-field>
        </div>
      </section>

      <div class="number-submit">
        <van-button round block :color="primary" @click="onSubmit">登记</van-button>
      </div>

    </div>
  </div>

  <!--城市多级联动-->
  <van-popup 
    v-model="multiPicker.show" 
    position="bottom">
    <van-tabs 
      :color="primary"
      :title-active-color="primary"
      v-model="multiPicker.active">
      <van-tab title="地市">
        <van-picker 
          :columns="cityList" 
          @change="cityChange" />
      </van-tab>
      <van-tab title="区/县">
        <van-picker 
          :columns="countyList"
          :loading="multiPicker.countyLoading" 
          @change="countyChange" />
      </van-tab>
      <van-tab title="乡/镇">
        <van-picker 
          :columns="townList"
          :loading="multiPicker.townLoading" 
          @change="townChange" />
      </van-tab>
      <van-tab title="村/路">
        <van-picker 
          :columns="villageList"
          :loading="multiPicker.villageLoading" 
          @change="villageChange" />
      </van-tab>
    </van-tabs>
  </van-popup>

</div>
</template>

<script>
import { theme } from '@/config';

export default {
  name: 'form-address',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '宽带地址登记',
      form: {
        province:'云南',
      },
      multiPicker: {
        show: false,
        active: 0,
        countyLoading: false,
        townLoading: false,
        villageLoading: false
      },
      cityList:[ '请选择'],
      countyList: ['请选择'],
      townList: ['请选择'],
      villageList:['请选择']
    }
  },
  methods: {
    openMultiPicker() {
      this.multiPicker.show = true;
    },
    getList() {
      this.cityList = ['请选择', '昆明','曲靖']
    },
    cityChange(picker, value, index) {
      console.log(value, index)
      this.multiPicker.active = 1
      this.multiPicker.countyLoading = true 
      // 渲染区县数据模拟
      setTimeout(() => {
        this.multiPicker.countyLoading = false 
        this.countyList =  ['请选择', '麒麟区', '麒麟二']

        this.form.city = value
      },200)
    },
    countyChange(picker, value, index){

    },
    townChange(picker, value, index) {

    },
    villageChange(picker, value, index) {
      //最后一个关闭
      this.multiPicker.show = false
    },
    onSubmit() {
      this.$toast('登记')
    }
  },
  created() {
    this.getList();
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.page-scroller {
  background-color: $color-white;
}

.number {

  &-panel {
    background-color: $color-white;

    &-bd {
      @include clearfix();
      padding: 0 5px;
    }

    .van {

      &-cell {
        &:last-child {
          border-bottom: 0;
        }
      }
    }
  }

  &-submit {
    margin:20px 10px;
  }

}
</style>
