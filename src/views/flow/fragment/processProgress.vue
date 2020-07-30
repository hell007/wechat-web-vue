<template>
  <div class="item">
    <van-steps direction="vertical" active="" class="processBox">
      <van-step class="launch">
        <template #active-icon>
          <van-image
            round
            fit="cover"
            width="28"
            height="28"
            :src="require('../../../assets/images/flow/launch-icon.png')"
          />
          <van-icon name="checked" color="#07c160" size="6" class="icon-position"/>
        </template>
        <div class="flexBox">
          <h4>{{item.launch.title}}</h4>
          <span>{{item.launch.time}}</span>
        </div>
        <p class="launch-name">{{item.launch.name}}</p>
      </van-step>
      <van-step class="launch">
        <template #inactive-icon>
          <van-image
            round
            fit="cover"
            width="28"
            height="28"
            :src="item.implement.imgSrc"
          />
          <van-icon name="checked" color="#07c160" size="6" class="icon-position"/>
        </template>
        <div class="flexBox">
          <h4>{{item.implement.title}}</h4>
          <span>{{item.implement.time}}</span>
        </div>
        <p class="launch-name">{{item.implement.name}}</p>
      </van-step>
      <van-step class="nextNode">
        <template #inactive-icon>
          <van-image
            round
            fit="cover"
            width="28"
            height="28"
            :src="require('../../../assets/images/flow/nextNode-icon.png')"
          />
          <van-icon name="checked" color="#07c160" size="6" class="icon-position"/>
        </template>
        <van-collapse v-model="activeNames">
          <van-collapse-item :title="item.nextNodePeople.title" name="1" :border="false" title-class="process-progress-title"  label-class="nextNode-label" class="nextNode-collapse">
            <p class="launch-name">{{item.nextNodePeople.peopleNo}}人会签审批</p>
            <div class="flexBox">
              <div v-for="(scorrd,index) in item.nextNodePeople.people" :key="index" class="nextNodePeople">
                <div class="img-position">
                  <!--                用户有头像-->
                  <img :src="scorrd.imgSrc"  v-if="scorrd.imgSrc !== ''" />
                  <!--                用户没有头像-->
                  <img src="../../../assets/images/icons/pro_sjtq.png"  v-else/>
                  <van-icon name="checked" color="#07c160" size="6" class="icon-position icon-position-right" v-if="scorrd.state === '审批通过'"/>
                  <van-icon name="clear" color="red" size="6" class="icon-position icon-position-right" v-if="scorrd.state === '审批未通过'"/>
                </div>
                <div class="nextNodePeople-name">{{scorrd.name}}</div>
              </div>
            </div>
            <div class="message">处理意见：'提交不符合规范，请重新提交！'</div>
          </van-collapse-item>
        </van-collapse>
      </van-step>
      <van-step class="copyPerson">
        <template #inactive-icon>
          <van-image
            round
            fit="cover"
            width="28"
            height="28"
            :src="require('../../../assets/images/flow/copyPerson-icon.png')"
          />
          <van-icon name="checked" color="#07c160" size="6" class="icon-position"/>
        </template>
        <van-collapse v-model="activeNames">
          <van-collapse-item :title="item.copyPerson.title" name="2" :border="false" title-class="process-progress-title"  label-class="nextNode-label" class="copyPerson-collapse">
            <p class="launch-name">{{item.copyPerson.peopleNo}}人抄送</p>
            <div class="flexBox">
              <div v-for="(scorrd,index) in item.copyPerson.people" :key="index" class="nextNodePeople">
                <div class="img-position">
                  <!--                用户有头像-->
                  <img :src="scorrd.imgSrc"  v-if="scorrd.imgSrc !== ''" />
                  <!--                用户没有头像-->
                  <img src="../../../assets/images/icons/pro_sjtq.png"  v-else/>
                </div>
                <div class="nextNodePeople-name">{{scorrd.name}}</div>
              </div>
            </div>
          </van-collapse-item>
        </van-collapse>
      </van-step>
    </van-steps>
  </div>
</template>
<script>
import {fetchGet, fetchPost} from '@/api'
import { theme } from '@/config'
export default {
  name: "abilityItem",
  props: {
    item: {
      type: Object,
      default () {
        return {}
      }
    },

  },
  data() {
    return {
        primary: theme.primary,
        activeNames: ['1','2'],
    }
  },
  methods: {
    //参与测评

  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/global";

.nextNode-collapse /deep/ .van-cell,
.copyPerson-collapse /deep/ .van-cell{
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 0;
}
.nextNode-collapse /deep/ .van-collapse-item__content,
.copyPerson-collapse /deep/ .van-collapse-item__content{
  padding-top: 0;
  padding-left: 0;
}
.nextNode /deep/ .van-step__line{
  background-color: rgba(255,255,255,0);
  border-left: 1px dashed #ebedf0;
}
/deep/ .process-progress-title{
  font-weight: bold;
}

.flexBox{
  display: flex;
}

.message {
  font-size:12px;
  color:$color-32;
  margin-top:8px;
}

/deep/ .van-hairline--top-bottom::after,
/deep/ .van-hairline--top-bottom::after,
/deep/ .van-step--vertical:not(:last-child)::after{
  border: none;
}

/deep/ .van-cell::after {
  border-bottom:0;
}

.img-position{
  position: relative;

  img{
    display: inline-block;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}

.nextNodePeople{
  width: 40px;
  text-align: center;
  margin-right: 10px;

  &-name{
    font-size: 12px;
    color: #999;
    width: 100%;
    text-align: center;
  }
}

.icon-position{
  position: absolute;
  bottom: 0px;
  right: -5px;

  &-right{
    right: 0px;
  }
}

.copyPerson-collapse,.nextNode-collapse{
  top: -4px;
}

.copyPerson{
  padding-top: 5px;
  padding-left: 10px;
  position: relative;
}

.nextNode{
  padding-top: 5px;
  padding-left: 10px;
  position: relative;
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;

  span{
    width: 12px;
    height: 12px;
  }
  h4{
    flex: 1;
  }

}

.launch{
  padding-top: 5px;
  padding-left: 10px;
  position: relative;
  border-bottom: 1px solid #eee;
  margin-bottom: 5px;

  span{
    flex: 1;
    text-align: right;
    color: #999;
  }
  h4{
    color: #323232;
  }
  &-name{
    color: #999;
  }
}

.processBox p{
  font-size: 12px;
}

.launchIcon{
  color: #1d90e6;
}

.detailBtn:after{
  content: '';
  height: 0;
  line-height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}



</style>
