<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <flow-form
        :components="components" />
      <flow-node
        :nodes="nodes" />
      <div class="flow-submit">
        <van-button 
          :color="primary"
          round>提交</van-button>
      </div>    
    </div>
  </div>
</div>
</template>

<script>
import { theme } from '@/config';
import {fetchGet, fetchPost} from '@/api';
import flowForm from './fragment/flowForm';
import flowNode from './fragment/flowNode';

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
      value: '有事情急需处理！',
      defaultLable: '请假原因',
      defaultProps: '请输入',
      defaultRequired: true,
      componentName: 'textareafield'
    }]
  }],
  nodes: [{
    name: '审批人',
    type: 'sponsor',
  },{
    name: '抄送人',
    type: 'notifier',
  }]
}

export default {
  name: 'flow-apply',
  components: {
    flowForm,
    flowNode
  },
  data() {
    return {
      primary: theme.primary,
      title: '常规流程',
      components: [],
      nodes:[],
    }
  },
  methods: {
    // onTab(active) {
    //   this.active = active
    // }
  },
  created() {
    this.components = data.components
    this.nodes = data.nodes
  },
  mounted() {
  }
}
</script>
<style scoped lang="scss">
.flow {

  &-submit {
    text-align:center;
    margin-top:30px;
    margin-bottom:20px;

    /deep/ .van-button {
      min-width:120px;
    }
  }
}
</style>
