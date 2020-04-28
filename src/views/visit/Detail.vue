<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="visit-panel">
        <div class="visit-panel-cell">
          <div class="visit-panel-hd">
            <b>客户信息</b>
          </div>
          <div class="visit-panel-row">
            <div class="visit-panel-val">云南白药集团</div>
          </div>
        </div>
        <div class="visit-panel-cell">
          <div class="visit-panel-hd">
            <b>客户编码</b>
          </div>
          <div class="visit-panel-row">
            <div class="visit-panel-val">123456</div>
          </div>
        </div>
        <div class="visit-panel-cell">
          <div class="visit-panel-hd">
            <b>拜访方式</b>
          </div>
          <div class="visit-panel-row">
            <div class="visit-panel-val">上门拜访</div>
          </div>
        </div>
      </section>
      
      <section class="visit-panel">
        <div class="visit-panel-cell">
          <div class="visit-panel-hd">
            <b>本次拜访对象</b>
          </div>
          <ul class="visit-person-list">
            <li 
              v-for="item,index in persons.list"
              :key="index">{{item.name}}</li>
          </ul>
        </div>
      </section>

      <section class="visit-panel">
        <div class="visit-panel-cell"
          v-for="item,index in content.list"
          :key="index">
          <div class="visit-panel-hd">
            <b>拜访内容{{index==0? '' : (index+1)}}</b>
          </div>
          <div class="visit-panel-row">
            <div class="visit-panel-val">{{item.name}}</div>
          </div>
        </div>

        <div class="visit-panel-cell"
          v-if="content.other">
          <div class="visit-panel-hd">
            <b>其他拜访内容</b>
          </div>
          <div class="visit-panel-row">
            <div class="visit-panel-val">
              <input type="text" 
                readonly 
                value="其他拜访内容"
                placeholder="请输入其他拜访内容" />
            </div>
          </div>
        </div>

      </section>

      <section class="visit-panel">
        <div class="visit-panel-cell">
          <div class="visit-panel-hd">
            <b>拜访位置</b>
            <span class="visit-panel-hd-btn">
              <van-icon :name="location.isRefresh ? 'replay' : 'location'" size="18" :color="primary"/>
            </span>
          </div>
          <div class="visit-panel-row">
            <div class="visit-panel-val">{{location.address}}</div>
          </div>
        </div>
      </section>

    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config'
export default {
  name: 'visit-detail',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '客户拜访详情',
      persons: {
        list: [{
          id: '1',
          name: '李白',
          phone: '',
          checked: true
        }, {
          id: '2',
          name: '张三',
          phone: '',
          checked: true
        }, {
          id: '3',
          name: '杰克马',
          phone: '',
          checked: false
        }, {
          id: '4',
          name: '关羽',
          phone: '',
          checked: false
        }, {
          id: '5',
          name: '张飞',
          phone: '',
          checked: false
        }],
      },
      content: {
        list: [{
          id: '1',
          name: '业务办理',
        }, {
          id: '2',
          name: '其他',
        }],
        other: true
      },
      location: {
        isRefresh: true,
        address: '云南省昆明市官渡区民航路东来大厦'
      }
    }
  },
  methods: {

  },
  created() {
    
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.visit {

  &-panel {
    margin:8px 0;
    padding:8px 16px;
    background-color:$color-white;

    &-cell {
      padding-bottom:6px;
      @include flex-column();
    }

    &-row {
      padding:8px 0;
      border-bottom:1px solid $color-border-gray;
      @include flex-row();
      align-items:center;
    }

    &-hd {
      @include flex-row();
      align-items:center;
      margin-bottom:8px;

      b {
        flex:6;
        font-size:14px;
      }

      &-btn {
        width:30px;
        height:30px;
        text-align:center;
        line-height:34px;
        margin-left:10px;
      }
    }

    &-val {
      flex:6;
      font-size:14px;
      color:$color-7d;

      input {
        width:100%;
        border:0;
      }
    }

    &-arrow {
      flex:1;
      text-align:right;

      i {
        color:$color-96;
      }
    }
  }

  &-person {

    &-list {
      margin-top:8px;
      @include flex-row();
      flex-wrap:wrap;
    
      li {
        width:21%;
        text-align:center;
        margin-right:4%;
        margin-bottom:4%;
        border-radius:4px;
        font-size:14px;
        padding:4px 0;

        &:last-child {
          margin-right:0;
        }

        &.on {
          color:$color-white;
          background-color:$color-primary;
        }
      }
    }

    &-add {
      @include flex-row();
      align-items:center;

      &-item {
        flex:1;

        &:first-child {
          padding-right:10px;
        }

        &:last-child {
          padding-left:10px;
        }

        input {
          width:100%;
          border:0;
          border-bottom:1px solid $color-border-gray;
        }
      }

      &-btn {
        width:30px;
        height:30px;
        text-align:center;
        line-height:34px;
        margin-left:10px;
      }
    }

    &-opt {
      padding:8px 0;
      height:40px;
      position:relative;

      &-btn {
        position:absolute;
        right:0;
        top:12px;
        width:30px;
        height:30px;
        text-align: center;
        line-height: 38px;
      }
    }
  }

  &-content {

    &-btn {
      margin-top:10px;
      padding:10px 0;
      @include flex-row();
      align-items:center;
      justify-content:center;

      span {
        margin-left:10px;
        font-size:12px;
        color:$color-primary;
      }
    }
  }
}
</style>