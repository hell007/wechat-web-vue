<template>
<div class="page">
  <div class="page-header">
    <page-title 
      :title="title"
      :isBack="true"
      @onBack="navBack">
      <div slot="right" class="header-right" @click="navOption">
        <span class="header-btn header-btn-opt">
          操作
        </span>
      </div>
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">

      <div class="section">
        <h5>自定义select</h5>

        <vant-select
          :columns="selects.list"
          @onSelect="onSelect"></vant-select>

        <br/>

        <vant-select
          value="选项二"
          :columns="selects.list"
          @onSelect="onSelect"></vant-select>  
      </div>

      <div class="section">
        <h5>自定义autocomplete</h5>

        <vant-autocomplete
          :columns="selects.list"
          @onSelect="autoSelect"></vant-autocomplete>

        <br/>

        <vant-autocomplete
          value="选项二"
          :columns="selects.list"
          @onSelect="autoSelect"></vant-autocomplete>  
      </div>

      <div class="section">
        <h5>loadding</h5>

        <van-button 
          type="info"
          @click="go">首页</van-button>
      </div>

      <div class="section">
        <h5>loadding</h5>
        <van-loading 
          v-if="loadding.visible"
          size="24px"
          color="#1989fa" 
          vertical>加载中...</van-loading>

        <van-overlay 
          :show="show" 
          @click="show = false" 
          z-index="3">
          <div style="position:absolute;left:50%;top:50%;width:60px;height:60px;margin-left:-30px;margin-top:-30px;">
            <van-loading 
              size="24px"
              color="#1989fa" 
              vertical>加载中...</van-loading>
          </div>
        </van-overlay>  

        <van-button 
          type="primary"
          @click="loaddingShow">显示</van-button>
        <van-button 
          type="info"
          @click="loaddingHide">隐藏</van-button>
        <van-button 
          type="info"
          @click="show = !show">全局</van-button>   
      </div>

      <div class="section">
        <h5>toast</h5>
        <van-button 
          type="primary"
          @click="toast">toast</van-button>
        <van-button 
          type="info"
          @click="toastSuccess">成功</van-button>
        <van-button 
          type="primary"
          @click="toastFail">失败</van-button>
        <van-button 
          type="info"
          @click="toastLoadding">自定义加载图标</van-button>
      </div>

      <div class="section">
        <h5>notify</h5>
        <van-button 
          type="primary"
          @click="noticePrimary">primary</van-button>
        <van-button 
          type="info"
          @click="noticeSuccess">success</van-button>
        <van-button 
          type="danger"
          @click="noticeDanger">danger</van-button>
        <van-button 
          type="warning"
          @click="noticeWarning">warning</van-button>
      </div>

      <div class="section">
        <h5>alert</h5>
        <van-button 
          type="primary"
          @click="alert">alert</van-button>
        <van-button 
          type="info"
          @click="alertNoTitle">alertNoTitle</van-button>
      </div>

      <div class="section">
        <h5>confirm</h5>
        <van-button 
          type="primary"
          @click="confirm">confirm</van-button>
        <van-button 
          type="info"
          @click="asycConfirm">asycConfirm</van-button>
      </div>

      <div class="section">
        <h5>overlay</h5>
        <van-button 
          type="primary" 
          text="显示遮罩层" 
          @click="overlay.show = true" />
      </div>
      <van-overlay :show="overlay.show" @click="overlay.show = false" />

      <div class="section">
        <h5>actionsheet</h5>
        <van-button 
          type="primary" 
          text="弹出菜单" 
          @click="actionsheet.show = true" />
      </div>
      <van-action-sheet 
        v-model="actionsheet.show" 
        :actions="actionsheet.actions" 
        @select="onActionSheetSelect"
        cancel-text="取消"
        @cancel="onCancel" />


      <div class="section">
        <h5>actionsheet自定义</h5>
        <van-button 
          type="primary" 
          text="弹出菜单" 
          @click="myaction.show = true" />
      </div>
      <van-action-sheet v-model="myaction.show" title="标题">
        <div class="action-box">
          <p>选项1</p>
          <p>选项2</p>
          <p>选项3</p>
          <p>选项4</p>
        </div>
      </van-action-sheet>

    </div>
  </div>
</div>
</template>

<script>
import vantSelect from '@/components/vantSelect';
import vantAutocomplete from '@/components/vantAutocomplete';
export default {
  name: 'unit-component',
  components: {
    vantSelect,
    vantAutocomplete
  },
  data() {
    return {
      title: '通用组件',
      loadding: {
        visible: false
      },
      show: false,
      overlay: {
        show: false
      },
      actionsheet: {
        show: false,
        actions: [
          { name: '选项一' },
          { name: '选项二' },
          { name: '选项三', subname: '描述信息' }
        ]
      },
      myaction: {
        show: false,
      },
      selects: {
        list: [{
          label: '选项一',
          value: '11',
        }, {
          label: '选项二',
          value: '12',
        }, {
          label: '选项三',
          value: '13',
        }, {
          label: '选项四',
          value: '14',
        }, {
          label: '选项五',
          value: '15',
        }],
        selected: '',
      },
    }
  },
  methods: {
    go() {
      this.$router.back()
    },
    navBack() {
      this.$toast('自定义回退事件');
      this.$router.back();
    },
    navOption() {
      this.$toast('操作');
    },
    loaddingShow() {
      this.loadding.visible = true
    },
    loaddingHide() {
      this.loadding.visible = false
    },
    toast() {
      this.$toast('提示文字');
    },
    toastSuccess() {
      this.$toast.success('成功文案');
    },
    toastFail() {
      this.$toast.fail('失败文案');
    },
    toastLoadding() {
       this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner'
      });
    },
    noticePrimary() {
      this.$notify({ type: 'primary', message: '通知内容' });
    },
    noticeSuccess() {
      this.$notify({ type: 'success', message: '通知内容' });
    },
    noticeDanger() {
      this.$notify({ type: 'danger', message: '通知内容' });
    },
    noticeWarning() {
      this.$notify({ type: 'warning', message: '通知内容' });
    },
    alert() {
      this.$dialog.alert({
        title: '标题',
        message: '弹窗内容'
      })
    },
    alertNoTitle() {
      this.$dialog.alert({
        message: '弹窗内容'
      })
    },
    confirm() {
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      }).then(() => {
        this.$toast('你点击了确定')
      }).catch(() => {
        this.$toast('你点击了取消')
      });
    },
    asycConfirm() {
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容',
        beforeClose: (action, done) => {
          if (action === 'confirm') {
            setTimeout(done, 1000);
          } else {
            done();
          }
        }
      });
    },
    onActionSheetSelect(item) {
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.actionsheet.show = false;
      this.$toast(item.name);
    },
    onCancel() {
      this.actionsheet.show = false;
      this.$toast('cancel');
    },
    onSelect(data) {
      console.log('onSelect==', data)
    },
    autoSelect(index, data) {
      console.log('autoSelect==', index, data)
    }
  },
  created() {
  }
}
</script>
<style scoped lang="scss">
  .section {
    padding:10px;

    h5 {
      font-size:14px;
      color:#1989fa;
    }
  }
  .van-button {
    margin:10px;
  }
  .action-box {
    padding:10px;
  }

</style>