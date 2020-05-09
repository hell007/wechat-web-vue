<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title">
      <div slot="right" class="header-right" @click="navOption">
        <span class="header-right-text">
          操作
        </span>
      </div>
    </page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">

      <div class="section">
        <h5>picker</h5>
        <van-button 
          type="primary" 
          text="选择" 
          @click="picker.show = true" />
      </div>
      <van-popup
        v-model="picker.show"
        position="bottom">
        <van-picker
          show-toolbar
          value-key="name"
          title="请选择角色"
          :columns="picker.columns"
          @cancel="pickerCancel"
          @confirm="pickerConfirm"
        />
      </van-popup>

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
export default {
  name: 'unit-dialog',
  components: {
  },
  data() {
    return {
      title: '通用组件',
      show: false,
      loadding: {
        visible: false
      },
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
      picker: {
        show: false,
        select: '',
        columns: [{
          id: 1,
          name: '张飞'
        }, {
          id: 2,
          name: '关羽'
        }, {
          id: 2,
          name: '刘备'
        }, {
          id: 2,
          name: '赵云'
        }]
      }
    }
  },
  methods: {
    navBack() {
      this.$router.back();
    },
    navOption() {
      this.$toast('操作');
    },
    pickerCancel() {
      this.picker.show = false
    },
    pickerConfirm(item) {
      this.$toast(item.name)
      this.picker.show = false
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

  .van-popup {
    background-color:none;
  }

</style>