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
            <div class="visit-panel-arrow"
              @click="type.show=true">
              <van-icon name="arrow" size="18" />
            </div>
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
              :class="item.checked ? 'on' : ''" 
              v-for="item,index in persons.list"
              :key="index"
              @click="checkedPerson(item)">{{item.name}}</li>
          </ul>
          <div class="visit-person-add" v-if="persons.isAdd">
            <span class="visit-person-add-item">
              <input type="text" v-model="person.name" placeholder="请输入拜访人姓名" />
            </span>
            <span class="visit-person-add-item">
              <input type="text" v-model="person.phone" placeholder="请输入拜访人电话" />
            </span>
            <span class="visit-person-add-btn"
              @click="deletePerson">
              <van-icon class-prefix="xa-icon" name="remove" size="18" :color="primary" /> 
            </span>
          </div>
          <div class="visit-person-opt">
            <span class="visit-person-opt-btn"
              @click="addPerson">
              <van-icon name="add-o" size="20" :color="primary" /> 
            </span>
          </div>
        </div>
      </section>

      <section class="visit-panel" 
        v-for="item,index in content.list"
        :key="index">
        <div class="visit-panel-cell">
          <div class="visit-panel-hd">
            <b>拜访内容{{index==0? '' : (index+1)}}</b>
            <span class="visit-panel-hd-btn"
              v-if="item.isDel"
              @click="deleteContent(item)">
              <van-icon class-prefix="xa-icon" name="remove" size="18" :color="primary"/>
            </span>
          </div>
          <div class="visit-panel-row">
            <div class="visit-panel-val">{{item.name}}</div>
            <div class="visit-panel-arrow"
              @click="picker.show=true">
              <van-icon name="arrow" size="18" />
            </div>
          </div>
        </div>

        <div class="visit-panel-cell"
          v-if="item.name==='商机详情'">
          <div class="visit-panel-hd">
            <b>商机涉及产品<em>(多选)</em></b>
            <span class="visit-panel-hd-btn"
              @click="goods.toggle= !goods.toggle">
              <span>{{goods.toggle ? '展开' : '收起'}}</span>
              <van-icon 
                :name="goods.toggle ? 'arrow-down' : 'arrow-up'" 
                size="18" 
                :color="primary"/>
            </span>
          </div>
          <ul :class="`visit-goods-list ${goods.toggle ? '' : 'active'}`">
            <li 
              :class="item.checked ? 'on' : ''" 
              v-for="item,index in goods.list"
              :key="index"
              @click="checkedGoods(item)">{{item.name}}</li>
          </ul>
        </div>
        
        <div class="visit-panel-cell">
          <div class="visit-panel-hd">
            <b>{{item.name}}内容</b>
          </div>
          <div class="visit-panel-row">
            <div class="visit-panel-val">
              <input type="text" :placeholder="`请补充${item.name}内容`" />
            </div>
          </div>
        </div> 

        <div class="visit-panel-upload">
          <van-uploader
            multiple
            v-model="fileList"
            :after-read="afterReadFile"
            @delete="deleteFile"
            max-count="5"
            :accept="'image/*'">
          </van-uploader>
        </div>
      </section>

      <div class="visit-content-btn"
        @click="addContent">
        <van-icon name="add-o" size="20" :color="primary" /> 
        <span>新增拜访内容</span>
      </div>

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

  <div class="page-footer">
    <div class="visit-submit">
      <van-button  
        block 
        :color="primary" 
        @click="onSubmit">提交</van-button>
    </div>
  </div>

  <!-- 拜访方式 -->
  <van-popup
    v-model="type.show"
    position="bottom">
    <van-picker
      show-toolbar
      value-key="name"
      title="选择拜访方式"
      :columns="type.columns"
      @cancel="typeCancel"
      @confirm="typeConfirm"
    />
  </van-popup>

  <!-- 拜访内容 -->
  <van-popup
    v-model="picker.show"
    position="bottom">
    <van-picker
      show-toolbar
      value-key="name"
      title="选择拜访内容"
      :columns="picker.columns"
      @cancel="pickerCancel"
      @confirm="pickerConfirm"
    />
  </van-popup>
</div>
</template>

<script>
import { theme } from '@/config'
export default {
  name: 'visit-form',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '客户拜访',
      type: {
        show: false,
        columns: [{
          id: '1',
          name: '上门拜访'
        }, {
          id: '2',
          name: '其他'
        }]
      },
      person: {
        name: '',
        phone: '',
      },
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
        isAdd: false,
      },
      content: {
        list: [{
          id: '1',
          name: '客户关怀',
          isDel: false
        }, {
          id: '2',
          name: '商机详情',
          isDel: false
        }],
      },
      goods: {
        list: [{
          id: '1',
          name: '李白',
          checked: true
        }, {
          id: '2',
          name: '张三',
          checked: true
        }, {
          id: '3',
          name: '杰克马',
          checked: false
        }, {
          id: '4',
          name: '关羽',
          checked: false
        }, {
          id: '5',
          name: '张飞',
          checked: false
        }, {
          id: '1',
          name: '李白',
          checked: true
        }, {
          id: '2',
          name: '张三',
          checked: true
        }, {
          id: '3',
          name: '杰克马',
          checked: false
        }, {
          id: '4',
          name: '关羽',
          checked: false
        }, {
          id: '5',
          name: '张飞',
          checked: false
        },{
          id: '1',
          name: '李白',
          checked: true
        }, {
          id: '2',
          name: '张三',
          checked: true
        }, {
          id: '3',
          name: '杰克马',
          checked: false
        }, {
          id: '4',
          name: '关羽',
          checked: false
        }, {
          id: '5',
          name: '张飞',
          checked: false
        }],
        toggle: true
      },
      fileList:[],
      picker: {
        show: false,
        columns: [{
          id: '1',
          name: '客户关怀'
        }, {
          id: '2',
          name: '故障处理'
        }, {
          id: '3',
          name: '业务办理'
        }, {
          id: '4',
          name: '商机处理'
        }]
      },
      location: {
        isRefresh: false,
        address: '东来大厦'
      }
    }
  },
  methods: {
    typeCancel() {
      this.type.show = false
    },
    typeConfirm() {
      this.type.show = false
    },
    checkedPerson(item) {
      item.checked = !item.checked
    },
    checkedGoods(item) {
      item.checked = !item.checked
    },
    addPerson() {
      this.persons.isAdd = true
    },
    deletePerson() {
      this.person = {
        name: '',
        phone: '',
      }
      this.persons.isAdd = false
    },
    pickerCancel() {
      this.picker.show = false
    },
    pickerConfirm(item) {
      this.picker.show = false
    },
    addContent() {
      if (this.content.list.length >= 3 ) return
      let temp = {
        name: '请选择',
        isDel: true,
      }
      this.content.list.push(temp)
    },
    deleteContent(item) {
      if(this.content.list.includes(item)){
        this.content.list = this.content.list.filter((ele)=>{
          return ele != item
        });
      }
    },
    afterReadFile() {

    },
    deleteFile() {

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

        em {
          font-size:12px;
          color:$color-7d;
          font-style:normal;
          font-weight:normal;
        }
      }

      &-btn {
        @include flex-row();
        align-items:center;
        min-width:30px;
        height:30px;
        text-align:center;
        line-height:34px;
        margin-left:10px;
        font-size:12px;
        color:$color-primary;
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

    &-upload {
      padding:10px 0 8px;
    }
  }

  &-person {

    &-list {
      margin-top:8px;
      margin-bottom:12px;
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
      padding-bottom:10px;

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

  &-goods {

    &-list {
      margin-top:8px;
      margin-bottom:12px;
      @include ellipsis(3,40px);
      @include clearfix();

      &.active{
        @include ellipsis(100,40px);
      } 
    
      li {
        float:left;
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
  

  &-submit {
    background-color:$color-white;
    margin:10px;
  }
}
</style>