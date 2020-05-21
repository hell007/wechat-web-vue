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

          <!-- <van-field
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
          </van-field> -->
        </div>
      </section>

      <div class="demo-submit">
        <van-button round block :color="primary" @click="onSubmit">登记</van-button>
      </div>

    </div>
  </div>

  <!--城市多级联动-->
  <van-popup 
    v-model="multiPicker.show" 
    class="multiPicker"
    position="bottom">
    <!-- <div class="multiPicker-tabs">
      <ul class="multiPicker-tabs-list"
        ref="multiPickerTabsList">
        <li :class="`multiPicker-tabs-item ${multiPicker.active==index ? 'on' : ''}`" 
          v-for="item,index in multiPicker.selected"
          :key="index"
          v-show="multiPicker.columns[index] && multiPicker.columns[index].length > 0"
          @click="multiPickerTab(index)">
          {{item.name}}
        </li>
      </ul>
    </div>
    <div class="multiPicker-panel">
      <ul class="multiPicker-panel-list"
        v-for="mpList,mpIndex in multiPicker.columns"
        v-show="multiPicker.active==mpIndex"
        :key="mpIndex">
        <li class="multiPicker-panel-item"
          v-for="item,index in mpList"
          :key="index"
          @click="multiPickerSelect(mpIndex, item)">
          <van-icon 
            class="multiPicker-panel-item-check"
            v-if="multiPicker.selected[mpIndex] && multiPicker.selected[mpIndex].name == item.name"
            name="success" 
            :color="primary"
            size="12" />
          <span>{{item.name}}</span>
        </li>
      </ul>
    </div> -->

    <van-tabs 
      :color="primary"
      :title-active-color="primary"
      v-model="multiPicker.active"
      @change="multiPickerTab"
      animated
      class="multiPicker-tabs">
      <van-tab 
        v-for="mpList,mpIndex in multiPicker.columns"
        :key="mpIndex"
        :title="mpList.length>0 ? multiPicker.selected[mpIndex].name : ''" 
        :name="mpIndex">
        <ul class="multiPicker-panel-list">
          <li class="multiPicker-panel-item"
            v-for="item,index in mpList"
            :key="item.name"
            @click="multiPickerSelect(mpIndex, item)">
            <van-icon 
              class="multiPicker-panel-item-check"
              v-if="multiPicker.selected[mpIndex] && multiPicker.selected[mpIndex].name == item.name"
              name="success" 
              :color="primary"
              size="12" />
            <span>{{item.name}}</span>
          </li>
        </ul>
      </van-tab>
    </van-tabs> 

 
  </van-popup>

</div>
</template>

<script>
import { theme } from '@/config';

export default {
  name: 'unit-address',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '地址选择',
      form: {
        province:'云南',
      },
      multiPicker: {
        show: true,
        level: 2, // 层级 根据需求自定义
        active: 0,
        loading: false,
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
  watch: {
    multiPicker(val) {
      console.log(val, this.multiPicker.active)
    }
  },
  methods: {
    openMultiPicker() {
      this.multiPicker.show = true;
    },
    initMultiPicker() {
      // 数据初始化
      const len = this.multiPicker.level
      for(let i=0; i<=len; i++){
        if(i==0){
          this.multiPicker.columns[i] = this.cityList
        }else {
          this.multiPicker.columns[i] = []
        }

        this.multiPicker.selected[i] = {name: '请选择'}
      }
    },
    setMultiPicker(index) {
      const width = window.screen.width / 2
      const tabs = this.$refs.multiPickerTabsList
      const tab = this.$refs.multiPickerTabsList.children

      let left = tab[index].offsetLeft
      let w = left - width

      if(left > width) {
        tabs.style.transform = 'translate('+ -w +'px, 0px)';
      }
    },
    multiPickerTab(index) { 
      //this.setMultiPicker(index)
      this.multiPicker.active = index
    },
    multiPickerSelect(mpIndex, item) {
      const self = this
      let next = mpIndex == this.multiPicker.level ? mpIndex : mpIndex + 1
      if (this.multiPicker.active <= this.multiPicker.level) {
        this.multiPicker.loading = false 
        this.multiPicker.selected[mpIndex] = item
        // 渲染下级数据模拟
        //this.$nextTick(() => {
        setTimeout(() => {
          self.multiPicker.loading = true 
          self.multiPicker.columns[next] = mpIndex==0 ? self.countyList : self.villageList
          self.multiPicker.active = next
          //this.setMultiPicker(next) 
        },200)
        //})

        console.log('multiPicker==',this.multiPicker)
      }
    },
    onSubmit() {
      this.$toast('console查看选择数据')
      console.log(this.multiPicker.selected)
    }
  },
  created() {
    this.initMultiPicker()
  },
  mounted() {
   
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/_global.scss";

.page-scroller {
  background-color: $color-white;
}

.multiPicker {

  &-tabs {
    // @include clearfix();
    // padding:0 10px;
    // margin-bottom:10px;
    // overflow-x: hidden;
    // overflow-y: hidden;
    // scroll-behavior: smooth;
    // border-bottom:1px solid $color-border-gray;

    // &-list {
    //   @include flex-row();
    //   align-items:center;
    //   min-width:200%;
    //   transform:translate(-20px,0);
    // }

    // &-item {
    //   @include ellipsis();
    //   width:60px;
    //   margin:0 10px;
    //   text-align:center;
    //   line-height:40px;
    //   border-bottom:2px solid $color-white;

    //   &.on {
    //     border-color:$color-primary;
    //     color:$color-primary;
    //   }
    // }

    /deep/ .van-tab {
      flex:none;
      width:80px;
    }
  }

  &-panel {
    &-list {
      padding:0 10px;
      height:200px;
      @include scrollable();
      scroll-behavior: smooth;
    }

    &-item {
      line-height:34px;

      &-check {
        margin-right:5px;
      }
    }
  }
  
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
