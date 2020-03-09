<template>
<div class="page">
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
        <div class="channel-tab">
          <span :class="tab==1 ? 'on' : ''" @click="switchTab(1)">业务量</span>
          <span :class="tab==2 ? 'on' : ''" @click="switchTab(2)">酬金</span>
        </div>
        <div :class="`channel-panel-content ${tab==1 ? 'on' : ''}`">
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
        </div>

        <div :class="`channel-panel-content ${tab==2 ? 'on' : ''}`">
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
            <div class="channel-echarts-line">
            <ve-line 
              ref="lineEchart"
              :data="line.data"
              :extend="line.extend"></ve-line>
            </div>
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
            <ve-pie class="channel-echarts-pie"
              ref="pieEchart"
              :data="pie.data"
              :settings="pie.settings"
              :extend="pie.extend"></ve-pie>
          </div>
        </div>
      </section>

    </div>
  </div>

</div>
</template>

<script>
import Vue from 'vue'
import VCharts from 'v-charts'
Vue.use(VCharts)

export default {
  name: 'channel-detail',
  components: {
  },
  data() {
    return {
      title: '渠道资料',
      tab: 1,
      item: {
        star:4,
      },
      line: {
        data: {
          columns: ['日期', '酬金'],
          rows: [
            {日期: '04', 酬金: 100},
            {日期: '05', 酬金: 640},
            {日期: '06', 酬金: 400},
            {日期: '07', 酬金: 630},
            {日期: '08', 酬金: 1000},
            {日期: '09', 酬金: 500},
            {日期: '10', 酬金: 600}
          ]
        },
        extend: {
          color: ['#3c79fa']
        }
      },
      pie: {
        data: {        
          columns: ['name',  'value'],
          rows: [
            {name: '开户', value: 30},
            {name: '终端', value: 20},
            {name: '数字家庭', value: 15},
            {name: '套餐合约', value: 25},
            {name: '业务办理', value: 20},
            {name: '我的集团业务', value: 35},
            {name: '激励酬金', value: 30}
          ]
        },
        settings: {
          radius: 60,
          label: {
            normal: {
              color: '#666',
              fontSize: '12px',
              formatter: function(params) {
                var text = params.data.name.replace(/\S{4}/g, function(
                  match
                ) {
                  return match + '\n'
                })
                return text + '\n:' + params.percent + '%'
              }
            }
          }
        },
        extend: {
          color: [
            '#67a8f3',
            '#d377f6',
            '#5ad3fa',
            '#fecb45',
            '#67bb90',
            '#6445fe',
            '#f67f77'
          ],
          legend: {
            x: 'left',
            y: 'bottom',
            itemWidth: 5,
            itemHeight: 5
          }
        }
      },
    }
  },
  methods: {
    switchTab(index) {
      this.tab = index
    },
    resizeVChart() {
      if (this.$refs.lineEchart) {
        this.$refs.lineEchart.resize()
      }
      if (this.$refs.pieEchart) {
        this.$refs.pieEchart.resize()
      }
    }
  },
  created() {
  },
  mounted() {
    this.$nextTick(() => {
      console.log('==1',this.$refs['lineEchart'].echarts)
      this.$refs['lineEchart'].echarts.resize()
    })
  }
}
</script>

<style scoped lang="scss">
@import '../../styles/channel-detail.scss';
</style>
