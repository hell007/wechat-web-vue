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
            label="省"
            placeholder="请选择"
            @click="openMultiPicker()">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="form.city"
            input-align="right"
            readonly
            label="市"
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
            label="区/县"
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
      <van-tab 
        v-for="item,index in multiPicker.list"
        :key="`multiPicker-${index}`" 
        :title="multiPicker.title[index]">
        <van-picker 
          value-key="label"
          :columns="item" 
          @change="multiChange" />
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
      title: '动态城市案列',
      form: {
        province: '',
      },
      multiPicker: {
        show: false,
        active: 0,
        loading: false,
        title: ['省', '市', '区/县'],
        list: [[], [], []]
      },
    }
  },
  methods: {
    openMultiPicker() {
      this.multiPicker.show = true;
    },
    multiInit() {
      const option = {
        label: '请选择',
        value: ''
      }
      this.multiPicker.list.forEach((item) => {
        item.push(option)
      })
    },
    multiInsert(list) {
      const option = {
        label: '请选择',
        value: ''
      }
      list.unshift(option)
    },
    multiChange(picker, item, index) {
      console.log(this.multiPicker.active, item, index)
      this.multiPicker.active = this.multiPicker.active+1
      this.multiPicker.loading = true

      // 渲染区县数据模拟
      setTimeout(() => {

        let city = [{
          label: "昆明市",
          value: "5301"} ,{
          label: "曲靖市",
          value: "5302"}]

        let county = [{
          label: "盘龙区",
          value: "53011"} ,{
          label: "五华区",
          value: "53021"}]  

        let list =  this.multiPicker.active ==1 ? city : county

        this.multiInsert(list)
        this.multiPicker.list[this.multiPicker.active] =  list
        this.multiPicker.loading = false 
        //this.form.province = item.label
      },50)
    },
    getList() {
      const index = this.multiPicker.active
      let arr = [{
        label: "云南省",
        value: "530"} ,{
        label: "江苏省",
        value: "230"}]

      this.multiInsert(arr)
      this.multiPicker.list[index] = arr
    },
    onSubmit() {
      this.$toast('登记')
    }
  },
  created() {
    this.multiInit();
  },
  mounted() {
    this.getList()
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
