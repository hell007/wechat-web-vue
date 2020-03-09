<template>
<div class="page page-primary">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <section class="channel-store">
        <div class="channel-store-picture">
          <img src="../../assets/images/icons/store-img.jpg" />
        </div>
        <div class="channel-store-text">
          <h6>盘龙迅捷环城东路手机卖场（连锁）</h6>
          <van-rate v-model="item.star" 
            readonly
            size="16" />
          <div class="channel-store-address">
            <van-icon name="location-o" size="16" />
            <span>昆明市人民路202号昆明市人民路202号<em>上报位置</em>
            </span>
          </div>
        </div>
      </section>

      <section class="channel-panel">
        <div class="channel-panel-title">基础信息</div>
        <ul class="channel-panel-box">
          <li>
            <span>区域连锁卖场</span>
            <em>渠道类型</em>
          </li>
          <li>
            <span>城市</span>
            <em>区域类型</em>
          </li>
          <li>
            <span>在用</span>
            <em>渠道状态</em>
          </li>
        </ul>
        <ul class="channel-panel-box">
          <li>
            <b>22A1</b>
            <em>渠道编码</em>
          </li>
          <li>
            <b>22A1</b>
            <em>渠道标识</em>
          </li>
        </ul>
      </section>

      <section class="channel-panel">
        <van-tabs 
          v-model="tab"
          :border="false"
          :color="primary"
          @click="onTab"
          animated>
          <van-tab title="业务量">
            <ul class="channel-service-tab">
              <li class="on">月</li>
              <li>周</li>
              <li>日</li>
            </ul>
            <div class="channel-service">
              <h5>2019年</h5>
              <div class="channel-service-panel">
                <div class="channel-service-title">
                  <h6>开卡数量</h6>
                </div>
                <ul class="channel-service-list">
                  <li>
                    <span>12,325</span>
                    <p>开卡量</p>
                  </li>
                  <li>
                    <span>50.00%</span>
                    <p>其中低套餐占比</p>
                  </li>
                  <li>
                    <span>12.63%</span>
                    <p>其中纯新增占比</p>
                  </li>
                </ul>
              </div>

              <div class="channel-service-panel">
                <div class="channel-service-title">
                  <h6>畅享包办理情况</h6>
                </div>
                <ul class="channel-service-list">
                  <li>
                    <span>0</span>
                    <p>畅享包办理量</p>
                  </li>  
                </ul>
              </div>

              <div class="channel-service-panel">
                <div class="channel-service-title">
                  <h6>终端销售量</h6>
                </div>
                <ul class="channel-service-list">
                  <li>
                    <span>0</span>
                    <p>终端销售量</p>
                  </li>
                </ul>
              </div>

              <div class="channel-service-panel">
                <div class="channel-service-title">
                  <h6>家庭产品</h6>
                </div>
                <ul class="channel-service-list">
                  <li>
                    <span>14</span>
                    <p>宽带销售量</p>
                  </li>
                  <li>
                    <span>0</span>
                    <p>户均快递融合客户数</p>
                  </li>
                </ul>
              </div>

              <div class="channel-service-panel">
                <div class="channel-service-title">
                  <h6>家庭增值产品</h6>
                </div>
                <ul class="channel-service-list">
                  <li>
                    <span>14</span>
                    <p>高清盒子销量</p>
                  </li>
                  <li>
                    <span>0</span>
                    <p>和日销量</p>
                  </li>
                </ul>
              </div>
            </div>
          </van-tab>

          <van-tab title="酬金">
            <div class="channel-reward">
              <h5>2019年10月</h5>
              <div class="channel-reward-info">
                <div class="channel-reward-left">
                  <b>655.81</b>
                  <p>已结酬金（万元）</p>
                </div>
                <div class="channel-reward-right">
                  <p>
                    <span>已结算笔数</span>
                    <em>5326875</em>
                  </p>
                  <p>
                    <span>
                      未达结算酬
                      <br />
                      金标准笔数
                    </span>
                    <em>5326875</em>
                  </p>
                </div>
              </div>
              <div class="channel-echarts-line" id="js-reward-line"></div>
              <div class="channel-echarts-text">
                <span>
                  环比增长：
                  <b>-15.34%</b>
                </span>
                <span>
                  区县排名：
                  <b>7</b>
                </span>
              </div>
            </div>
            <div class="channel-echarts-box">
              <div class="channel-echarts-name">
                <b>酬金构成</b>
                <span class="channel-echarts-type">分类科目</span>
              </div>
              <div class="channel-echarts-pie" id="js-reward-pie"></div>
            </div>
          </van-tab>
        </van-tabs>
      </section>  

      <div class="channel-inspect">巡检</div>
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config';  
export default {
  name: 'channel-detail',
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      title: '渠道资料',
      tab: 0,
      item: {
        star:4,
      },
      lineOption: {
        tooltip: {
          trigger: 'axis'
        },
        color: ['#3c79fa'],
        grid: {
          left: '0%',
          right: '3%',
          bottom: '3%',
          top: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['04', '05', '06', '07', '08', '09', '10']
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        series: [
          {
            name: '酬金',
            type: 'line',
            stack: '万元',
            data: [100, 640, 400, 630, 1000, 500, 640]
          }
        ]
      },
      pieOption: {
        color: [
          '#67a8f3',
          '#d377f6',
          '#5ad3fa',
          '#fecb45',
          '#67bb90',
          '#6445fe',
          '#f67f77'
        ],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          x: 'left',
          y: 'bottom',
          itemWidth: 5,
          itemHeight: 5,
          data: [
            '开户',
            '终端',
            '数字家庭',
            '套餐合约',
            '业务办理',
            '集团业务我的集团业务',
            '激励酬金'
          ]
        },
        calculable: true,
        series: [
          {
            name: '酬金构成',
            type: 'pie',
            minAngle: 5,
            avoidLabelOverlap: true,
            radius: [10, 65],
            center: ['50%', '50%'],
            roseType: 'radius',
            itemStyle: {
              normal: {
                label: {
                  textStyle: {
                    color: '#666',
                    fontSize: '12px'
                  }
                }
              }
            },
            label: {
              normal: {
                show: true,
                fontSize: '12px',
                color: '#333',
                position: 'outer',
                formatter: function(params) {
                  var text = params.data.name.replace(/\S{4}/g, function(
                    match
                  ) {
                    return match + '\n'
                  })
                  return text + '\n:' + params.percent + '%'
                }
              }
            },
            data: [
              {value: 30, name: '开户'},
              {value: 20, name: '终端'},
              {value: 15, name: '数字家庭'},
              {value: 25, name: '套餐合约'},
              {value: 20, name: '业务办理'},
              {value: 35, name: '我的集团业务'},
              {value: 30, name: '激励酬金'}
            ]
          }
        ]
      }
    }
  },
  methods: {
    init() {
      let lineChart = echarts.init(document.getElementById('js-reward-line'))
      window.onresize = lineChart.resize
      lineChart.setOption(this.lineOption)

      let pieChart = echarts.init(document.getElementById('js-reward-pie'))
      window.onresize = pieChart.resize
      pieChart.setOption(this.pieOption)
    },
    onTab(name, title) {
      console.log(name, title)
    }
  },
  updated() {
    this.init()
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/channel-detail.scss';
</style>
