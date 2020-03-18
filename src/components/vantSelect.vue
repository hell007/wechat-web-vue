<template>
  <section class="input-panel"
    ref="vantSelect">
    <div class="input-hd">
      <input 
        class="input-hd-input" 
        type="text" 
        readonly 
        autocomplete="off"
        v-model="label"
        :placeholder="placeholder"
        @click="init"
        @blur="blur" />
      <span class="input-hd-clear"
        v-show="slideDown"
        @click="onClear" >
        <van-icon 
          name="clear"
          size="18" 
          color="#c8c9cc"></van-icon>
      </span>
    </div>
    <div class="input-bd" v-show="slideDown">
      <p v-if="!size">空数据</p>
      <ol class="input-bd-list">
        <li :class="`input-bd-item ${label==item.label ? 'on' : ''}`"
          v-for="item,index in filtered"
          :key="index"
          @click.stop="clickOne(item)">{{item.label}}</li>
      </ol>
    </div>
 </section>
</template>
<script>
export default {
  name: "vant-select",
  props: {
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: []
    },
    onSelect: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      slideDown: false,
      label: '',
      timer: null,
      filtered: [],
      selected: {},
    };
  },
  computed: {
    size (){
      return this.filtered && this.filtered.length > 0 ? true : false
    }
  },
  watch: {
    selected() {
      this.$emit('onSelect', this.selected);
    },
    value() { //监听value变化，更新label
      this.label = this.value
    }
  },
  methods: {
    init() {
      //if (this.label) return 
      this.slideDown = !this.slideDown;
    },
    blur() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.slideDown = false;
      }, 200);
    },
    clickOne(item) {
      clearTimeout(this.timer);
      this.selected = item;
      this.slideDown = false;
      this.label = item.label;
    },
    onClear() {
      this.slideDown = true
      this.label = ''
    },
  },
  mounted() {
    this.label = this.value
    this.filtered = this.columns;
  },
}
</script>
<style scoped lang="scss">
@import "../styles/_global.scss";

.input {
  
  &-panel {
    width:160px;
    position:relative;
    border:1px solid $color-border-gray;
    padding:0px 5px;
    border-radius:2px;
    background-color:$color-white;
    cursor:pointer;
  }

  &-hd {
    @include flex-row();
    align-items:center;
    
    &-input {
      width:100%;
      height:34px;
      padding:0;
      border:0;
    }

    &-clear {
      padding:4px;
      margin-top:2px;
      margin-left:4px;
    }
  }

  &-bd {
    position:absolute;
    left:0;
    right:0;
    top:42px;
    z-index:3;
    background-color:$color-white;
    box-shadow:0px 0px 5px rgba(0,0,0,.2);
    border-radius:4px;
    padding:4px 0;

    &:before {
      display:inline-block;
      content:'';
      position:absolute;
      left:20px;
      top:-7px;
      @include arrow(up,1em,1px);
      color:$color-white;
      background-color:$color-white;
      z-index:4;
      border-right:1px solid $color-border-gray;
      border-top:1px solid $color-border-gray;
    }

    p {
      padding:5px;
      color:$color-c8;
    }

    &-list {
      max-height:120px;
      scroll-behavior: smooth;
      @include scrollable();
      margin-bottom:0;
    }

    &-item {
      height:40px;
      line-height:40px;
      padding:0 10px;

      &.on {
        color:$color-primary;
      }

      &:hover {
        background-color:$color-f7;
      }
    }
  }
}
</style>
