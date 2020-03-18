<template>
  <section class="input-panel"
    ref="autoInput">
    <div class="input-hd">
      <input 
        class="input-hd-input" 
        type="text"
        v-model="searchKey"
        :placeholder="placeholder"
        @click="init"
        @keyup="keyboardDown" 
        @blur="blur" />
      <span class="input-hd-clear"
        v-show="searching"
        @click="onClear" >
        <van-icon 
          name="clear" 
          size="18" 
          color="#c8c9cc"></van-icon>
      </span>
    </div>
    <div class="input-bd" v-show="searching">
      <p v-if="!size">空数据</p>
      <ul class="input-bd-list">
        <li :class="`input-bd-item ${searchKey==item.label ? 'on' : ''}`"
          v-for="item,index in filtered"
          :key="index"
          @click.stop="clickOne(item)">{{item.label}}</li>
      </ul>
    </div>
 </section>
</template>
<script>
export default {
  name: "vant-autocomplete",
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    name: {
      type: Number,
      default: 0
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
      searching: false,
      searchKey: '',
      timer: null,
      filtered: [],
      selected: [],
      focusIndex: 0,
      invalidData: ''
    };
  },
  computed: {
    size (){
      return this.filtered && this.filtered.length > 0 ? true : false
    }
  },
  watch: {
    searchKey(val) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        if (val === '') {
          this.filtered = this.columns;
        }
        // 自动分词
        else if (val.includes(',')) {
          let arr = val.split(',');
          let invalidArr = [];
          let flag = false;
          arr.forEach(item => {
            if (this.columns.includes(item) && !this.selected.includes(item)) {
              this.selected.push(item);
              flag = true;
            } else if (!this.columns.includes(item)) {
              invalidArr.push(item);
            }
          })
          flag && (this.searchKey = invalidArr.join(','));
        } else {
          this.filterData(val);
        }
      }, 200);
    },
    selected() {
      this.$emit('onSelect', this.name, this.selected);
    },
    list() {
      this.filtered = this.columns;
    },
    value() {
      this.searchKey = this.value
    }
  },
  methods: {
    init(e) {
      if (this.searchKey) return 
      this.searching = true;
      //this.$emit('focus');
      if (this.searchKey === this.selected[0]) {
        this.filtered = this.list;
      }
    },
    blur() {
      this.timer = setTimeout(() => {
        if (!this.searchKey) {
          this.searching = false;
        } else {
          if (!this.size) {
            this.searching = false
            this.selected = [this.searchKey]
            this.$emit('onSelect', this.name, this.selected);
          }
        }
      }, 200);
      this.fixedBug()
    },
    keyboardDown(e) {
      if (!this.searching) {
        this.searching = true;
      }
    },
    filterData(str = this.searchKey) {
      this.filtered = this.columns.filter(item => {
        return item.label.toLowerCase().includes(str.toLowerCase());
      });
      this.focusIndex = 0;
    },
    clickOne(item) {
      clearTimeout(this.timer);
      this.selected = [item.label];
      this.searching = false;
      this.searchKey = item.label;
      this.fixedBug()
    },
    onClear() {
      this.searching = true
      this.searchKey = ''
    },
    fixedBug() {
      // 修复ios键盘问题
      window.scroll(0, 0)
    }
  },
  mounted() {
    if (this.columns.includes(this.value)) {
      this.searchKey = this.value;
      this.selected = [this.value];
    }
    this.filtered = this.columns;
  },
  directives: {
    focus: {
      inserted: function(el) {
        el.focus()
      }
    }
  }
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
