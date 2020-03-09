<template>
  <div class="rolling-table" 
    :id="id"  
    ref="scrolleTable">
      <table 
        class="table" 
        border="0"
        cellpadding="1" 
        cellspacing="0" 
        ref="rollingTable">
        <tr>
          <th class="rows " 
            :class="{'cross': index == 0 }" 
            v-for="(item,index) in xList" 
            :key="index"><div>{{item.name}}</div></th>
        </tr>
        <tr v-for="(y,i) in yList" :key="i + 'a'">
          <template v-for="(x, xKey) in xField">
            <td v-for="(item,yKey) in y" 
              :key="yKey" 
              v-if="x === yKey" 
              :class="{'cols': yKey == xField[0]}"
              @click="onAction(yList[i][yKey], yList[i])">
              <div>{{ yList[i][yKey]=='event' ? option : yList[i][yKey]}}</div>
            </td>
          </template>
        </tr>
        <tr></tr>
      </table>
  </div>
</template>
<script>
// 注意iscrollTable多个使用时候，mounted时候需要多个加载，display=none会导致滑动错误
import { createIScroller } from "./scrolltable";  
export default {
  name: "iscroll-table",
  props: {
    id: {
      type: String,
      default: null
    },
    xList: {
      type: Array,
      default () {
        return []
      }
    },
    xField: {
      type: Array,
      default () {
        return []
      }
    },
    yList: {
      type: Array,
      default () {
        return []
      }
    },
    option: {
      type: String,
      default: '查看'
    },
    action: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      scroller: null    
    }
  },
  methods: {
    onAction(key, item) {
      //console.log('===', key, item)
      if(key!='event') return;
      this.$emit('action', item);
    },
  },
  mounted() {
    //console.log('id==', this.id)
    this.scroller = createIScroller("#"+this.id);
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.rolling-table {
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  position: relative;
  top: 0;
  overflow: hidden;
}

.rows {
  position: relative;
  z-index: 3;

  div {
    width:99px;
    padding:0 24px;
    margin:0 auto;
    font-size:12px;
    color: $color-32;
    @include ellipsis(2,27px);
  }
}

.cross {
  position: relative;
  z-index: 5;
}

.cols {

  div {
    width:99px;
    padding:0 9px;
    margin:0 auto;
    font-size:12px;
    color:$color-7d;
    @include ellipsis(2,27px);
  }
}

.table {
  min-height: 100%;
  text-align: center;
  margin-left:-1px;

  tr {
    position: relative;
    height:54px;
    background-color:$color-white;

    &:nth-of-type(odd){
      td{
        background-color: $color-f2;;
      }
    }
  }

  th,
  td {
    text-align:center;
    padding:0;
    background-color:$color-white;
  }

  td {
    font-size:12px;
    color:$color-32;
    &:first-child {
      border-right:1px solid $color-border-gray;
    }
  }

  th {
    background-color: $color-f2;

    &:first-child {
      border-right:1px solid $color-border-gray;
    }
  }
}
</style>
