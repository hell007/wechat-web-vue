<template>
  <ul>
    <li v-for="item,index in list" :key="`idx-${index}`">
      <!-- text -->
      <div class="component-item" 
        v-if="item.componentName=='textfield'">
        <van-field
          v-model="item.value"
          input-align="right"
          :label="item.defaultLable"
          :required="item.defaultRequired"
          :placeholder="item.defaultProps"/>
      </div>
      <!-- textarea -->
      <div class="component-item" 
        v-if="item.componentName=='textareafield'">
        <van-field
          class="component-column"
          v-model="item.value"
          input-align="left"
          :label="item.defaultLable"
          :required="item.defaultRequired"
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
          :label="item.defaultLable"
          :required="item.defaultRequired"
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
          :required="item.defaultRequired"
          :placeholder="item.defaultProps"
          readonly
          :is-link="true" 
          @click="onSelect(item)"/>
      </div>
      <!-- multiselect -->
      <div class="component-item"
        v-if="item.componentName=='multiselectfield'">
        <van-field
          input-align="right"
          :label="item.defaultLable"
          :required="item.defaultRequired"
          :placeholder="item.defaultProps"
          readonly
          :is-link="true"
          @click="onMultiselect(item)">
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
          :required="item.defaultRequired"
          :placeholder="item.defaultProps"
          readonly
          :is-link="true" 
          @click="onDate(item)"/>
      </div>
      <!-- daterange -->
      <div class="component-item" 
        v-if="item.componentName=='daterangefield'">
        <van-field
          v-model="item.value[0]"
          input-align="right"
          :label="item.defaultLable"
          :required="item.defaultRequired"
          :placeholder="item.defaultProps"
          readonly
          :is-link="true"
          @click="onDatetime(item, 'start')"/>
        <van-field
          v-model="item.value[1]"
          input-align="right"
          :label="item.defaultLable2"
          :required="item.defaultRequired"
          :placeholder="item.defaultProps2"
          readonly
          :is-link="true"
          @click="onDatetime(item, 'end')"/>
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
          :label="item.defaultLable"
          :required="item.defaultRequired">
          <div slot="input" class="component-row">
            <span class="component-phone-prefix">+86</span>
            <van-field
              v-model="item.value"
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
          :label="item.defaultLable"
          :required="item.defaultRequired"
          :placeholder="item.defaultProps">
        </van-field>
      </div> 
      <!-- rate -->
      <div class="component-item component-rate"
        v-if="item.componentName=='ratefield'">
        <van-field
          input-align="left"
          :label="item.defaultLable"
          :required="item.defaultRequired"
          :border="false" />
        <van-rate 
          class="component-photo-panel"
          v-model="item.value"
          :count="item.defaultRate" />
      </div> 
      <!-- photo -->
      <div class="component-item component-photo"
        v-if="item.componentName=='photofield'">
        <van-field
          input-align="left"
          :label="item.defaultLable"
          :required="item.defaultRequired"
          :border="false" />
        <ul class="component-photo-list">
          <li class="component-photo-item"
            v-for="p,pindex in item.value"
            :key="pindex">
            <div class="picture">
              <img :src="p.url" />
            </div>
            <span class="del">
              <van-icon name="clear" size="16"/>
            </span>
          </li>
          <li class="component-photo-upload"
            @click="onPhoto(item)">
            <van-icon name="photograph" size="30"/>
          </li>
        </ul> 
      </div> 
      <!-- attachment -->
      <div class="component-item component-attachment"
        v-if="item.componentName=='attachment'">
        <van-field
          input-align="left"
          :label="item.defaultLable"
          :required="item.defaultRequired"
          :border="false" />
        <ul class="component-attachment-list">
          <li class="component-attachment-picture">
            <img src="../../../assets/images/icons/videolist2.png" />
            <span class="del">
              <van-icon name="clear" size="16"/>
            </span>
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
            <span class="del">
              <van-icon name="clear" size="16"/>
            </span>
          </li>
          <li class="component-attachment-upload"
            @click="onAttachment(item)">
            <van-icon name="plus" size="20" />
          </li>
        </ul>
      </div>

      <!-- table -->
      <dl class="component-item component-table"
        v-if="item.componentName=='tablefield'">
        <dt class="component-row component-table-hd">
          <span>{{item.defaultLable}}
            <span v-if="item.index > 0">{{item.index}}</span>
          </span>
          <em v-if="item.index > 0"
           @click="delTable(item)">删除</em>
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
                :label="it.defaultLable"
                :required="it.defaultRequired"
                :placeholder="it.defaultProps"/>
            </div>
            <!-- textarea -->
            <div class="component-item" 
              v-if="it.componentName=='textareafield'">
              <van-field
                class="component-column"
                v-model="it.value"
                input-align="left"
                :label="it.defaultLable"
                :required="it.defaultRequired"
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
                :label="it.defaultLable"
                :required="it.defaultRequired"
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
                :required="it.defaultRequired"
                :placeholder="it.defaultProps"
                readonly
                :is-link="true"
                @click="onSelect(it)"/>
            </div>
            <!-- multiselect -->
            <div class="component-item"
              v-if="it.componentName=='multiselectfield'">
              <van-field
                input-align="right"
                :label="it.defaultLable"
                :required="it.defaultRequired"
                :placeholder="it.defaultProps"
                readonly
                :is-link="true"
                @click="onMultiselect(it)">
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
                :required="it.defaultRequired"
                :placeholder="it.defaultProps"
                readonly
                :is-link="true" 
                @click="onDate(it)"/>   
            </div>
            <!-- daterange -->
            <div class="component-item" 
              v-if="it.componentName=='daterangefield'">
              <van-field
                v-model="it.value[0]"
                input-align="right"
                :label="it.defaultLable"
                :required="it.defaultRequired"
                :placeholder="it.defaultProps"
                readonly
                :is-link="true"
                @click="onDatetime(it, 'start')"/>
              <van-field
                v-model="it.value[1]"
                input-align="right"
                :label="it.defaultLable2"
                :required="it.defaultRequired"
                :placeholder="it.defaultProps2"
                readonly
                :is-link="true"
                @click="onDatetime(it, 'end')"/>
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
                :label="it.defaultLable"
                :required="it.defaultRequired">
                <div slot="input" class="component-row">
                  <span class="component-phone-prefix">+86</span>
                  <van-field
                    v-model="it.value"
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
                :label="it.defaultLable"
                :required="it.defaultRequired"
                :placeholder="it.defaultProps">
              </van-field>
            </div> 
            <!-- rate -->
            <div class="component-item component-rate"
              v-if="it.componentName=='ratefield'">
              <van-field
                input-align="left"
                :label="it.defaultLable"
                :required="it.defaultRequired"
                :border="false" />
              <van-rate 
                class="component-photo-panel"
                v-model="it.value"
                :count="it.defaultRate" />
            </div> 
            <!-- photo -->
            <div class="component-item component-photo"
              v-if="it.componentName=='photofield'">
              <van-field
                input-align="left"
                :label="it.defaultLable"
                :required="it.defaultRequired"
                :border="false" />
              <ul class="component-photo-list">
                <li class="component-photo-item"
                  v-for="p,pindex in it.value"
                  :key="pindex">
                  <div class="picture">
                    <img :src="p.url" />
                  </div>
                  <span class="del">
                    <van-icon name="clear" size="16"/>
                  </span>
                </li>
                <li class="component-photo-upload"
                  @click="onPhoto(it)">
                  <van-icon name="photograph" size="30"/>
                </li>
              </ul>  
            </div> 
            <!-- attachment -->
            <div class="component-item component-attachment"
              v-if="it.componentName=='attachment'">
              <van-field
                input-align="left"
                :label="it.defaultLable"
                :required="it.defaultRequired"
                :border="false" />
              <ul class="component-attachment-list">
                <li class="component-attachment-picture">
                  <img src="../../../assets/images/icons/videolist2.png" />
                  <span class="del">
                    <van-icon name="clear" size="16"/>
                  </span>
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
                  <span class="del">
                    <van-icon name="clear" size="16"/>
                  </span>
                </li>
                <li class="component-attachment-upload"
                  @click="onAttachment(it)">
                  <van-icon name="plus" size="20" />
                </li>
              </ul>
            </div>
          </div>
          <div class="component-table-item">
            <span class="component-row component-table-btn">
              <van-icon name="plus" size="16" />
              <em @click="addTable(item)">{{item.defaultAction}}</em>
            </span>
          </div>
        </dd>
      </dl>
    </li>
    
    <!-- 单选框 -->
    <van-popup
      v-model="select.show"
      position="bottom">
      <van-picker
        title="请选择"
        ref="selectfield"
        show-toolbar
        :columns="select.columns"
        @confirm="selectConfirm"
        @cancel="selectCancel"/>
    </van-popup>

    <!-- 多选框 -->
    <pop-bottom 
      :visible="multiselect.show"
      @confirm="multiselectConfirm"
      @cancel="multiselectCancel">
      <div class="component-multiselect" slot="body">
        <van-checkbox-group
          class="component-multiselect-checkbox"
          v-model="multiselect.label">
          <van-checkbox
            label-disabled
            :checked-color="primary"
            v-for="item,index in multiselect.columns"
            :key="index"
            :name="item.text">
            {{item.text}}
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </pop-bottom>

    <!-- 日期 -->
    <van-popup
      v-model="date.show"
      position="bottom">
      <van-datetime-picker
        type="date"
        title="请选择"
        :min-date="date.minDate"
        :max-date="date.maxDate"
        @confirm="dateConfirm"
        @cancel="dateCancel"/>
    </van-popup>

    <!-- 日期范围 -->
    <van-popup
      v-model="datetime.show"
      position="bottom">
      <van-datetime-picker
        type="datetime"
        title="请选择"
        :min-date="datetime.minDate"
        :max-date="datetime.maxDate"
        @confirm="datetimeConfirm"
        @cancel="datetimeCancel"/>
    </van-popup>

    <!-- 图片上传 -->
    <div style="display:none;">
      <van-uploader
        ref="photos"
        multiple
        :max-count="4"
        :max-size="500*1024"
        :after-read="photoAfterread" />
    </div>

    <!-- 附件上传 -->
    <div style="display:none;">
      <van-uploader
        ref="attachments"
        multiple
        :max-count="4"
        :max-size="500*1024"
        :after-read="attachmentAfterread" />
    </div>

  </ul>
</template>

<script>
import { theme } from '@/config';
import { formatDate } from '@/utils';
import popBottom from '@/components/popBottom';
export default {
  name: "flow-form",
  components: {
    popBottom
  },
  data() {
    return {
      primary: theme.primary,
      list: [],
      select: {
        show: false,
        columns: [],
        temp: null
      },
      multiselect: {
        show: false,
        columns: [],
        label: [],
        value: [],
        temp: null
      },
      date: {
        show: false,
        minDate: null,
        maxDate: null,
        format: null,
        temp: null
      },
      datetime: {
        show: false,
        type: null,
        minDate: null,
        maxDate: null,
        format: null,
        temp: null
      },
      photoList: [],
      attachmentList: []
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
    addTable(item) {
      let temp = JSON.parse(JSON.stringify(item))
      temp.index = temp.index + 1
      this.list.push(temp)
    },
    delTable(item) {
      if(this.list.includes(item)){
        this.list = this.list.filter((ele)=>{
          return ele != item
        });
      }
    },
    onSelect(item) {
      this.select.show = true
      this.select.columns = item.defaultOptions
      this.select.temp = item
    },
    selectConfirm(value, index) {
      let self = this
      if(self.select.temp) {
        self.select.temp.value = value.idx
        self.select.temp.label = value.text
      }
      this.select.show = false
    },
    selectCancel(item) {
      this.select.show = false
    },
    onMultiselect(item) {
      this.multiselect.show = true
      this.multiselect.columns = item.defaultOptions
      this.multiselect.value = item.value
      this.multiselect.label = item.label
      this.multiselect.temp = item
    },
    multiselectConfirm() {
      let self = this
      if(self.multiselect.temp) {
        self.multiselect.temp.value = this.multiselect.value
        self.multiselect.temp.label = this.multiselect.label
      }
      this.multiselect.show = false
    },
    multiselectCancel() {
      this.multiselect.show = false
    },
    onDate(item) {
      this.date.show = true
      this.date.minDate = new Date(2020, 7, 1)
      this.date.maxDate = new Date(2021, 7, 1)
      this.date.temp = item
    },
    dateConfirm(value) {
      let self = this
      if(self.date.temp) {
        self.date.temp.value = formatDate(value, 'YYYY-MM-DD')
      }
      this.date.show = false
    },
    dateCancel() {
      this.date.show = false
    },
    onDatetime(item, type) {
      this.datetime.show = true
      this.datetime.type = type
      this.datetime.minDate = new Date(2020, 7, 1)
      this.datetime.maxDate = new Date(2021, 7, 1)
      this.datetime.temp = item
    },
    datetimeConfirm(value) {
      let self = this
      if(self.datetime.temp) {
        switch(self.datetime.type) {
          case 'start':
            self.datetime.temp.value[0] = formatDate(value, 'YYYY-MM-DD hh:mm:ss')
            break;
          case 'end':
            self.datetime.temp.value[1] = formatDate(value, 'YYYY-MM-DD hh:mm:ss')
            break;  
          default:  
        }
      }
      this.datetime.show = false
    },
    datetimeCancel() {
      this.datetime.show = false
    },
    onPhoto(item) {
      var btn = document.querySelectorAll('.van-uploader__input')[0]
      btn.dispatchEvent(new MouseEvent('click'))
      // 复制
      this.photoList = item.value
    },
    photoAfterread(file) {
      console.log(file, this.photoList)
    },
    onAttachment(item) {
      var btn = document.querySelectorAll('.van-uploader__input')[1]
      btn.dispatchEvent(new MouseEvent('click'))
      this.attachmentList = item.value
    },
    attachmentAfterread() {
      console.log(file, this.attachmentList)
    }
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
