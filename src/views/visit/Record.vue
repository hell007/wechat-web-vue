<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty
        :empty="noData"
        tips="暂无数据！">
        <van-list
          class="visit-company"
          v-model="loadding"
          :finished="finished"
          :immediate-check="false"
          :offset="10"
          finished-text="没有了！"
          @load="onLoad">
          <div class="visit-company-item">
            <div class="visit-company-hd">
              <van-icon
                class-prefix="xa-icon"
                name="company"
                :color="primary"
                size="18" />
              <b>云南白药集团</b>
            </div>
            <div class="visit-company-bd">
              <div class="com-picture">
                <img src="../../assets/images/icons/store-img.jpg"/>
              </div>
              <div class="com-text">
                <p>拜访时间：2020-4-17 12:00</p>
                <p>被拜访人：张三 李四</p>
                <p>拜访方式：上门拜访</p>
              </div>
            </div>
          </div>
          <div class="visit-company-item">
            <div class="visit-company-hd">
              <van-icon
                class-prefix="xa-icon"
                name="company"
                :color="primary"
                size="18" />
              <b>云南白药集团</b>
            </div>
            <div class="visit-company-bd">
              <div class="com-picture">
                <img src="../../assets/images/icons/store-img.jpg"/>
              </div>
              <div class="com-text">
                <p>拜访时间：2020-4-17 12:00</p>
                <p>被拜访人：张三 李四</p>
                <p>拜访方式：上门拜访</p>
              </div>
            </div>
          </div>
          <div class="visit-company-item">
            <div class="visit-company-hd">
              <van-icon
                class-prefix="xa-icon"
                name="company"
                :color="primary"
                size="18" />
              <b>云南白药集团</b>
            </div>
            <div class="visit-company-bd">
              <div class="com-picture">
                <img src="../../assets/images/icons/store-img.jpg"/>
              </div>
              <div class="com-text">
                <p>拜访时间：2020-4-17 12:00</p>
                <p>被拜访人：张三 李四</p>
                <p>拜访方式：上门拜访</p>
              </div>
            </div>
          </div>
          <div class="visit-company-item">
            <div class="visit-company-hd">
              <van-icon
                class-prefix="xa-icon"
                name="company"
                :color="primary"
                size="18" />
              <b>云南白药集团</b>
            </div>
            <div class="visit-company-bd">
              <div class="com-picture">
                <img src="../../assets/images/icons/store-img.jpg"/>
              </div>
              <div class="com-text">
                <p>拜访时间：2020-4-17 12:00</p>
                <p>被拜访人：张三 李四</p>
                <p>拜访方式：上门拜访</p>
              </div>
            </div>
          </div>
        </van-list>
      </content-with-empty>  
    </div>
  </div>

</div>
</template>

<script>
import { theme } from '@/config'
import contentWithEmpty from '@/components/contentWithEmpty';
export default {
  name: 'visit-record',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      primary: theme.primary,
      title: '客户拜访记录',
      noData: false,// 没有数据
      loadding: false,//上拉加载
      finished: false,//上拉加载完毕
    }
  },
  methods: {
    onLoad() {

    }
  },
  created() {
    
  }
}
</script>
<style scoped lang="scss">
@import "../../styles/_global.scss";

.visit {

  &-company {
 
    &-item {
      padding:10px;
      margin:8px;
      background-color:$color-white;
      border-radius:8px;
      box-shadow:2px 2px 4px rgba(0, 0, 0, 0.1);
    }

    &-hd {
      @include flex-row();
      align-items:center;
      margin-bottom:8px;

      b {
        flex:3;
        margin-left:8px;
        font-size:$font-14;
        overflow:hidden;
      }
    }

    &-bd {
      @include flex-row();

      .com-text {
        flex:3;

        p {
          //font-size:12px;
          margin-bottom:8px;
          color:$color-7d;
        }
      }

      .com-picture {
        width:80px;
        height:80px;
        margin-right:10px;
        overflow:hidden;
      }
    }
  }

}
</style>