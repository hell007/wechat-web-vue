<template>
  <div class="page">
    <div class="page-header">
      <page-title :title="title"></page-title>
    </div>

    <div class="page-main">
      <div class="page-scroller">
        <section class="flow-panel flow-panel-row">
          <div class="flow-panel-picture">
            <img src="../../assets/images/icons/pro_sjtq.png" />
          </div>
          <div class="flow-panel-name">智赋发起流程</div>
          <div class="flow-panel-state">
            <img src="../../assets/images/icons/pro_hhph.png" class="adopt-img">
          </div> 
        </section>
        <van-tabs 
          v-model="active" 
          :color="primary" 
          :title-active-color="primary">
          <van-tab title="基本信息">
            <flow-detail 
              title="基本信息"
              :details="details"/>
          </van-tab>
          <van-tab title="流程信息">
            <flow-form-view
              :components="components"/>  
          </van-tab>
        </van-tabs>
        <section class="flow-panel">
          <div class="flow-panel-title">流程进度</div>
          <process-progress  :item="nodes" ></process-progress>
        </section>
        <div class="flow-submit">
          <van-button 
            color="#999"
            round
            @click="dialog.show=true">不通过</van-button>
          <van-button 
            style="margin-left:20px;"
            :color="primary"
            round>通过</van-button>
        </div> 
        <div class="flow-submit">
          <van-button 
            :color="primary"
            round>查看进度</van-button>  
        </div>
      </div>
    </div>

    <!-- 弹窗 -->
    <vant-dialog
      type="dialog"
      styles="flow-dialog-mask"
      :show="dialog.show">
      <div class="flow-dialog-bd" slot="body">
        <div class="flow-dialog-title">确认不通过</div>
        <div class="flow-dialog-text">
          <van-field
            v-model="adoptMessage"
            rows="3"
            autosize
            type="textarea"
            placeholder="请输入处理意见"
          />
        </div>
      </div>
      <div class="flow-submit" slot="footer">
        <van-button
          :color="primary"
          round
          @click="dialog.show=false">确认不通过</van-button>
      </div>
    </vant-dialog>
  </div>
</template>

<script>
import {theme} from '@/config';
import flowFormView from './fragment/flowFormView';
import flowNode from './fragment/flowNode';
import flowDetail from './fragment/flowDetail';
import processProgress from './fragment/processProgress';
import vantDialog from '@/components/vantDialog';

// 模拟数据
const data = {
  components: [{
    name: '单行输入框',
    value: '张三',
    defaultLable: '单行测试',
    defaultProps: '请输入',
    defaultRequired: true,
    componentName: 'textfield'
  },
  {
    name: '多行输入框',
    value: '我是多行输入',
    defaultLable: '多行测试',
    defaultProps: '请输入',
    defaultRequired: true,
    componentName: 'textareafield'
  },
  {
    name: '数字输入框',
    value: 1000,
    defaultLable: '数字测试',
    defaultProps: '请输入',
    defaultRequired: true,
    componentName: 'numberfield'
  },
  {
    name: '单选框',
    label: '选项2',
    value: 2,
    defaultLable: '单选框测试',
    defaultProps: '请选择',
    defaultRequired: true,
    defaultOptions: [
      {idx: 1, text: '选项1'},
      {idx: 2, text: '选项2'},
      {idx: 3, text: '选项3'}
    ],
    componentName: 'selectfield'
  },
  {
    name: '多选框',
    label: ['选项1','选项2'],
    value: ['1','2'],
    defaultLable: '多选框测试',
    defaultProps: '请选择',
    defaultRequired: true,
    defaultOptions: [
      {idx: 1, text: '选项1'},
      {idx: 2, text: '选项2'},
      {idx: 3, text: '选项3'}
    ],
    componentName: 'multiselectfield'
  },
  {
    name: '日期',
    value: '2020-07-27',
    defaultLable: '日期测试',
    defaultProps: '请选择',
    defaultRequired: true,
    defaultFormat: 'yyyy-MM-DD',
    componentName: 'datefield'
  },
  {
    name: '日期区间',
    value: ['2020-07-27 12:00:00', '2020-08-27 12:00:00'],
    defaultLable: '开始时间测试',
    defaultLable2: '结束时间测试',
    defaultProps: '请选择',
    defaultProps2: '请选择',
    defaultRequired: true,
    defaultAutorekonTime: false,
    defaultFormat: 'yyyy-MM-DD hh:mm:ss',
    defaultSubtitle: '时长',
    componentName: 'daterangefield'
  },
  {
    name: '图片',
    value:[{
      url: require('../../assets/images/icons/pro_qdzr.png')
    },{
      url: require('../../assets/images/icons/pro_qdzr.png')
    },{
      url: require('../../assets/images/icons/pro_qdzr.png')
    },{
      url: require('../../assets/images/icons/pro_qdzr.png')
    }],
    defaultLable: '图片',
    defaultRequired: true,
    componentName: 'photofield'
  },
  {
    name: '说明文字',
    defaultLable: '说明文字',
    defaultRequired: true,
    defaultProps: '请输入说明文字',
    defaultShow: false,
    defaultHref: '',
    componentName: 'textnote'
  },
  {
    name: '附件',
    value: [],
    defaultLable: '附件',
    defaultRequired: true,
    componentName: 'attachment'
  },
  {
    name: '身份证',
    value: '5301xxxxxxx0000',
    defaultLable: '身份证',
    defaultProps: '请输入',
    defaultRequired: true,
    componentName: 'identityfield'
  },
  {
    name: '手机',
    value: '138xxxxx88',
    defaultLable: '手机',
    defaultProps: '请输入',
    defaultRequired: true,
    componentName: 'phonefield'
  },
  {
    name: '地点',
    defaultLable: '地点',
    defaultProps: '例如：昆明市东来大厦',
    defaultRequired: true,
    componentName: 'locationfield'
  },
  {
    name: '评分',
    value: 8,
    defaultLable: '评分',
    defaultProps: '',
    defaultRate: 10,
    defaultRequired: true,
    componentName: 'ratefield'
  },
  {
    name: "明细/表格",
    index: 0,
    componentName: "tablefield",
    defaultAction: "添加",
    defaultLable: "明细/表格",
    components: [
    {
      name: '单选框',
      label: '事假',
      value: 1,
      defaultLable: '请假类型',
      defaultProps: '请选择',
      defaultRequired: true,
      defaultOptions: [
        {idx: 1, text: '事假'},
        {idx: 2, text: '病假'},
        {idx: 3, text: '调休'}
      ],
      componentName: 'selectfield'
    },
    {
      name: '多行输入框',
      label: '有事情急需处理！',
      defaultLable: '请假原因',
      defaultProps: '请输入',
      defaultRequired: true,
      componentName: 'textareafield'
    }]
  }],
  nodes: {
    launch:{
        title:'发起流程',
        time:'2020-08-08 14:00',
        name:'张三'
    },
    implement:{
        title:'执行人',
        time:'2020-08-08 14:00',
        imgSrc:'https://img.yzcdn.cn/vant/cat.jpeg',
        name:'张三'
    },
    nextNodePeople:{
        title:'审批人',
        peopleNo:'4',
        people:[{
            name:'杰克',
            imgSrc:'https://img.yzcdn.cn/vant/cat.jpeg',
            state:'审批通过'
        },{
            name:'杰克',
            imgSrc:'https://img.yzcdn.cn/vant/cat.jpeg',
            state:'审批未通过'
        },{
            name:'杰克',
            imgSrc:'https://img.yzcdn.cn/vant/cat.jpeg',
            state:'审批未通过'
        },{
            name:'杰克',
            imgSrc:'',
            state:'审批通过'
        }]
    },
    copyPerson:{
        title:'抄送人',
        peopleNo:'2',
        people:[{
            name:'杰克',
            imgSrc:'https://img.yzcdn.cn/vant/cat.jpeg',
            state:'审批通过'
        },{
            name:'杰克',
            imgSrc:'https://img.yzcdn.cn/vant/cat.jpeg',
            state:'审批未通过'
        }]
    }
},
  details: [{
    label: '单行输入框',
    value: '这是一个单行输入内容'
  },{
    label: '多行输入框',
    value: '这是一个多行输入框这是一个多行输入框这是一个多行输入框这是一个多行输入框'
  }]
}
export default {
  name: 'flow-task-approval',
  components: {
    flowFormView,
    flowNode,
    flowDetail,
    processProgress,
    vantDialog
  },
  data() {
    return {
      primary: theme.primary,
      title: '工单流程详情',
      active: 1,
      components: [],
      nodes: [],
      adoptMessage: '',
      dialog: {
        show: false
      }
    }
  },
  methods: {

  },
  created() {
    this.components = data.components
    this.nodes = data.nodes
    this.details = data.details
  },
  mounted() {

  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";
.flow {

  &-panel {
    margin: 8px 0;
    padding: 8px 16px;
    background-color: $color-white;

    &-row {
      @include flex-row();
      align-items:center;
    }

    &-name {
      flex:3;
      overflow:hidden;
    }

    &-picture,
    &-state {
      width: 55px;
      height: 55px;
      overflow:hidden;
    }

    &-picture {
      margin-right:10px;
    }

    &-state { 
      margin-left:10px;
    }

    &-title{
      font-size:14px;
      font-weight:bold;
      color:$color-32;
    }
  }

  &-submit {
    @include flex-row();
    align-items:center;
    padding:0 16px;
    margin-top:30px;
    margin-bottom:20px;

    /deep/ .van-button {
      flex:1;
    }
  }

  &-dialog {

    &-mask {
      z-index:2000;
      background-color:rgba(0,0,0,.7);
    }

    &-title {
      width: 100%;
      text-align: center;
      font-size: 16px;
      font-weight: bold;
      padding: 20px 0;
    }

    &-text{
      width: 90%;
      overflow-y: scroll;
      height: 100px;
      border: 1px solid #eee;
      margin: 0 auto;
    }

    &-btn{
      margin-top: 30px;
      width: 100%;
      border-radius: 50px;
    }
  }
}    
</style>
