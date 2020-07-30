<template>
  <ul>
    <li v-for="item,index in list" :key="`idx-${index}`">
      <!-- text -->
      <div class="component-item" 
        v-if="item.componentName=='textfield'">
        <van-field
          v-model="item.value"
          input-align="right"
          readonly
          :label="item.defaultLable"
          :placeholder="item.defaultProps"/>
      </div>
      <!-- textarea -->
      <div class="component-item" 
        v-if="item.componentName=='textareafield'">
        <van-field
          class="component-column"
          v-model="item.value"
          input-align="left"
          readonly
          :label="item.defaultLable"
          :placeholder="item.defaultProps"
          rows="3"
          autosize
          type="textarea">
        </van-field>
      </div>
      <!-- number -->
      <div class="component-item"
        v-if="item.componentName=='numberfield'">
        <van-field
          v-model="item.value"
          input-align="right"
          readonly
          :label="item.defaultLable"
          :placeholder="item.defaultProps"
          type="number"/>
      </div>
      <!-- select -->
      <div class="component-item"
        v-if="item.componentName=='selectfield'">
        <van-field
          v-model="item.label"
          input-align="right"
          :label="item.defaultLable"
          :placeholder="item.defaultProps"
          readonly
          :is-link="true"/>
      </div>
      <!-- multiselect -->
      <div class="component-item"
        v-if="item.componentName=='multiselectfield'">
        <van-field
          input-align="right"
          :label="item.defaultLable"
          :placeholder="item.defaultProps"
          readonly
          :is-link="true">
          <ul slot="input"
            v-if="item.label && item.label.length > 0">
            <li v-for="res,i in item.label"
              :key="i">{{res}}</li>
          </ul>
        </van-field>
      </div>
      <!-- date -->
      <div class="component-item"
        v-if="item.componentName=='datefield'">
        <van-field
          v-model="item.value"
          input-align="right"
          :label="item.defaultLable"
          :placeholder="item.defaultProps"
          readonly
          :is-link="true"/>
      </div>
      <!-- daterange -->
      <div class="component-item" 
        v-if="item.componentName=='daterangefield'">
        <van-field
          v-model="item.value[0]"
          input-align="right"
          :label="item.defaultLable"
          :placeholder="item.defaultProps"
          readonly
          :is-link="true"/>
        <van-field
          v-model="item.value[1]"
          input-align="right"
          :label="item.defaultLable2"
          :placeholder="item.defaultProps2"
          readonly
          :is-link="true"/>
      </div>
      <!-- textnote -->
      <div class="component-item component-textnote"
        v-if="item.componentName=='textnote'">
        {{item.defaultLable}}   
      </div>
      <!-- phone -->
      <div class="component-item component-phone"
        v-if="item.componentName=='phonefield'">
        <van-field
          class="component-column"
          input-align="left"
          :label="item.defaultLable">
          <div slot="input" class="component-row">
            <span class="component-phone-prefix">+86</span>
            <van-field
              v-model="item.value"
              readonly
              :placeholder="item.defaultProps" />
          </div>
        </van-field>
      </div> 
      <!-- identity -->
      <div class="component-item"
        v-if="item.componentName=='identityfield'">
        <van-field
          class="component-column"
          v-model="item.value"
          input-align="left"
          readonly
          :label="item.defaultLable"
          :placeholder="item.defaultProps">
        </van-field>
      </div> 
      <!-- rate -->
      <div class="component-item component-rate"
        v-if="item.componentName=='ratefield'">
        <van-field
          input-align="left"
          :label="item.defaultLable"
          :border="false" />
        <van-rate 
          class="component-rate-panel"
          v-model="item.value"
          readonly
          :count="item.defaultRate" />
      </div> 
      <!-- photo -->
      <div class="component-item component-photo"
        v-if="item.componentName=='photofield'">
        <van-field
          input-align="left"
          :label="item.defaultLable"
          :border="false" />
        <ul class="component-photo-list">
          <li class="component-photo-item"
            v-for="p,pindex in item.value"
            :key="pindex">
            <div class="picture">
              <img :src="p.url" />
            </div>
          </li>
        </ul> 
      </div> 
      <!-- attachment -->
      <div class="component-item component-attachment"
        v-if="item.componentName=='attachment'">
        <van-field
          input-align="left"
          :label="item.defaultLable"
          :border="false" />
        <ul class="component-attachment-list">
          <li class="component-attachment-picture">
            <img src="../../../assets/images/icons/videolist2.png" />
          </li>
          <li class="component-attachment-office">
            <p class="o-name">这是一个word文档</p>
            <div class="o-size">
              <van-icon
                class-prefix="xa-icon"
                name="word"
                size="24"
                :color="primary"/>
              <em>1024k</em>
            </div>
          </li>
        </ul>
      </div>

      <!-- table -->
      <dl class="component-item component-table"
        v-if="item.componentName=='tablefield'">
        <dt class="component-row component-table-hd">
          <span>{{item.defaultLable}}</span>
          <em></em>
        </dt>
        <dd class="component-column component-table-bd">
          <div class="component-table-item"
            v-for="it,subindex in item.components" 
            :key="`idx-${subindex}`">
            <!-- text -->
            <div class="component-item" 
              v-if="it.componentName=='textfield'">
              <van-field
                v-model="it.value"
                input-align="right"
                readonly
                :label="it.defaultLable"
                :placeholder="it.defaultProps"/>
            </div>
            <!-- textarea -->
            <div class="component-item" 
              v-if="it.componentName=='textareafield'">
              <van-field
                class="component-column"
                v-model="it.value"
                input-align="left"
                readonly
                :label="it.defaultLable"
                :placeholder="it.defaultProps"
                rows="3"
                autosize
                type="textarea">
              </van-field>
            </div>
            <!-- number -->
            <div class="component-item"
              v-if="it.componentName=='numberfield'">
              <van-field
                v-model="it.value"
                input-align="right"
                readonly
                :label="it.defaultLable"
                :placeholder="it.defaultProps"
                type="number"/>
            </div>
            <!-- select -->
            <div class="component-item"
              v-if="it.componentName=='selectfield'">
              <van-field
                v-model="it.label"
                input-align="right"
                :label="it.defaultLable"
                :placeholder="it.defaultProps"
                readonly
                :is-link="true"/>
            </div>
            <!-- multiselect -->
            <div class="component-item"
              v-if="it.componentName=='multiselectfield'">
              <van-field
                input-align="right"
                :label="it.defaultLable"
                :placeholder="it.defaultProps"
                readonly
                :is-link="true">
                <ul slot="input"
                  v-if="it.label && it.label.length > 0">
                  <li v-for="res,j in it.label"
                    :key="j">{{res}}</li>
                </ul>
              </van-field>  
            </div>
            <!-- date -->
            <div class="component-item"
              v-if="it.componentName=='datefield'">
              <van-field
                v-model="it.value"
                input-align="right"
                :label="it.defaultLable"
                :placeholder="it.defaultProps"
                readonly
                :is-link="true"/>   
            </div>
            <!-- daterange -->
            <div class="component-item" 
              v-if="it.componentName=='daterangefield'">
              <van-field
                v-model="it.value[0]"
                input-align="right"
                :label="it.defaultLable"
                :placeholder="it.defaultProps"
                readonly
                :is-link="true"/>
              <van-field
                v-model="it.value[1]"
                input-align="right"
                :label="it.defaultLable2"
                :placeholder="it.defaultProps2"
                readonly
                :is-link="true"/>
            </div>
            <!-- textnote -->
            <div class="component-item component-textnote"
              v-if="it.componentName=='textnote'">
              {{it.defaultLable}}   
            </div>
            <!-- phone -->
            <div class="component-item component-phone"
              v-if="it.componentName=='phonefield'">
              <van-field
                class="component-column"
                input-align="left"
                :label="it.defaultLable">
                <div slot="input" class="component-row">
                  <span class="component-phone-prefix">+86</span>
                  <van-field
                    v-model="it.value"
                    readonly
                    :placeholder="it.defaultProps" />
                </div>
              </van-field>
            </div> 
            <!-- identity -->
            <div class="component-item"
              v-if="it.componentName=='identityfield'">
              <van-field
                class="component-column"
                v-model="it.value"
                input-align="left"
                readonly
                :label="it.defaultLable"
                :placeholder="it.defaultProps">
              </van-field>
            </div> 
            <!-- rate -->
            <div class="component-item component-rate"
              v-if="it.componentName=='ratefield'">
              <van-field
                input-align="left"
                :label="it.defaultLable"
                :border="false" />
              <van-rate 
                class="component-rate-panel"
                v-model="it.value"
                readonly
                :count="it.defaultRate" />
            </div> 
            <!-- photo -->
            <div class="component-item component-photo"
              v-if="it.componentName=='photofield'">
              <van-field
                input-align="left"
                :label="it.defaultLable"
                :border="false" />
              <ul class="component-photo-list">
                <li class="component-photo-item"
                  v-for="p,pindex in it.value"
                  :key="pindex">
                  <div class="picture">
                    <img :src="p.url" />
                  </div>
                </li>
              </ul>  
            </div> 
            <!-- attachment -->
            <div class="component-item component-attachment"
              v-if="it.componentName=='attachment'">
              <van-field
                input-align="left"
                :label="it.defaultLable"
                :border="false" />
              <ul class="component-attachment-list">
                <li class="component-attachment-picture">
                  <img src="../../../assets/images/icons/videolist2.png" />
                </li>
                <li class="component-attachment-office">
                  <p class="o-name">这是一个word文档</p>
                  <div class="o-size">
                    <van-icon
                      class-prefix="xa-icon"
                      name="word"
                      size="24"
                      :color="primary"/>
                    <em>1024k</em>
                  </div>
                </li>
              </ul>  
            </div>
          </div>
          <!-- <div class="component-table-item">
            <span class="component-row component-table-btn">
              <van-icon name="plus" size="16" />
              <em @click="add(item)">{{item.defaultAction}}</em>
            </span>
          </div> -->
        </dd>
      </dl>
    </li>
  </ul>
</template>

<script>
import { theme } from '@/config';
export default {
  name: "flow-form-view",
  components: {
  },
  data() {
    return {
      primary: theme.primary,
      list: []
    }
  },
  props: {
    components: {
      type: Array,
      default: null
    }
  },
  watch: {
    components() {
      this.list = this.components
    }
  },
  methods: {
  },
  created() {
    this.list = this.components
    //console.log('===',this.list)
  }
}
</script>
<style scoped lang="scss">
@import "../../../styles/flow.scss";
</style>
