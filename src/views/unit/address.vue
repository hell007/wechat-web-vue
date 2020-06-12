<template>
<div class="page page-primary">
  <div class="page-header">
    <page-title :title="title">
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="demo-panel">
        <div class="demo-panel-bd">
          <van-field
            v-model="form.province"
            input-align="right"
            readonly
            label="省份"
            placeholder="请输入">
            <div slot="right-icon"></div>
          </van-field>

          <!--- <van-field
            v-model="form.city"
            input-align="right"
            readonly
            label="地市"
            placeholder="请选择"
            @click="openMultiPicker(0)">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="form.county"
            input-align="right"
            readonly
            label="区县"
            placeholder="请选择"
            @click="openMultiPicker(1)">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="form.town"
            input-align="right"
            readonly
            label="乡镇"
            placeholder="请选择"
            @click="openMultiPicker(2)">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field> -->

          <van-field
            v-model="multiPicker.selected[0].name"
            input-align="right"
            readonly
            label="地市"
            placeholder="请选择"
            @click="openMultiPicker(0)">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="multiPicker.selected[1].name"
            input-align="right"
            readonly
            label="区县"
            placeholder="请选择"
            @click="openMultiPicker(1)">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>

          <van-field
            v-model="multiPicker.selected[2].name"
            input-align="right"
            readonly
            label="乡镇"
            placeholder="请选择"
            @click="openMultiPicker(2)">
            <div slot="right-icon">
              <i class="van-icon van-icon-arrow"></i>
            </div>
          </van-field>
        </div>
      </section>

      <div class="demo-submit">
        <van-button round block :color="primary" @click="onSubmit">登记</van-button>
      </div>

    </div>
  </div>

  <vant-multi-picker
    :visible="multiPicker.show"
    :options="multiPicker"
    @change="multiPickerChange"
    @cancel="multiPickerCancel"/>

</div>
</template>

<script>
import { theme } from '@/config';
import vantMultiPicker from '@/components/vantMultiPicker'
export default {
  name: 'unit-address',
  components: {
    vantMultiPicker
  },
  data() {
    return {
      primary: theme.primary,
      title: '地址选择',
      form: {
        province:'云南',
        city: '',
        county: '',
        town: ''
      },
      multiPicker: {
        show: true,
        level: 2, // 层级 根据需求自定义
        active: 0,
        loading: false,
        disabled: [],
        columns: [],
        selected: []
      },
      cityList:[{
        id: '',
        name: '昆明'
      }, {
        id: '',
        name: '曲靖'
      }, {
        id: '',
        name: '昭通'
      }, {
        id: '',
        name: '楚雄'
      }, {
        id: '',
        name: '玉溪'
      }, {
        id: '',
        name: '普洱'
      }, {
        id: '',
        name: '丽江'
      }, {
        id: '',
        name: '大理'
      }],
      countyList: [ {
        id: '',
        name: '西山区'
      }, {
        id: '',
        name: '官渡区'
      }],
      villageList: [ {
        id: '',
        name: '官渡古镇'
      }, {
        id: '',
        name: '东来大厦'
      }]
    }
  },
  methods: {
    openMultiPicker(active) {
      this.multiPicker.show = true;
      this.multiPicker.active = active
    },
    initMultiPicker() {
      // 数据初始化
      const len = this.multiPicker.level
      for(let i=0; i<=len; i++){
        if(i==0){
          this.multiPicker.columns[i] = this.cityList
          this.multiPicker.disabled[i] = false
        }else {
          this.multiPicker.columns[i] = []
          this.multiPicker.disabled[i] = true
        }

        this.multiPicker.selected[i] = {name: '请选择'}
      }
    },
    multiPickerChange(mpIndex, item) {
      const self = this
      let next = mpIndex == this.multiPicker.level ? mpIndex : mpIndex + 1

      this.multiPicker.loading = true
      this.multiPicker.selected[mpIndex] = item
      this.multiPicker.disabled[next] = false

      //清除已选
      for(var i=next; i<self.multiPicker.level; i++){
        self.multiPicker.columns[i+1] = []
        self.multiPicker.selected[i] = {name:'请选择'}
        self.multiPicker.selected[i+1] = {name:'请选择'}
      }

      // 渲染下级数据模拟 ajax
      setTimeout(() => {
        self.multiPicker.loading = false
        self.multiPicker.columns[next] = mpIndex==0 ? self.countyList : self.villageList
        self.multiPicker.active = next

        // 回显方式二
        // 使用multiPicker.selected
      },500)

      if (this.multiPicker.active == this.multiPicker.level) {
        this.multiPicker.show = false

        // 回显方式一
        // this.form.city = this.multiPicker.selected[0].name
        // this.form.county = this.multiPicker.selected[1].name
        // this.form.town = this.multiPicker.selected[2].name
      }
    },
    multiPickerCancel() {
      this.multiPicker.show = false
    },
    onSubmit() {
      this.$toast('console查看选择数据')
      console.log(this.multiPicker.selected)
    }
  },
  created() {
    this.initMultiPicker()
    console.log('===',this.multiPicker)
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.page-scroller {
  background-color: $color-white;
}

.demo {

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
