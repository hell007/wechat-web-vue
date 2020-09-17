<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty 
        :empty="noData"
        tips="没有数据，快去添加吧！">
        <van-list
          v-model="loadding"
          :finished="finished"
          :immediate-check="false" 
          :offset="10"
          :finished-text="finishedText"
          @load="onLoad">  
          <div class="item" 
            v-for="item,index in list"
            :key="index">
            {{item.text}}--{{item.page}}
          </div>
        </van-list> 
      </content-with-empty>
    </div>
  </div>

</div>
</template>

<script>
import contentWithEmpty from '@/components/contentWithEmpty';
import * as utils from '@/utils';

export default {
  name: 'unit-refresh',
  components: {
    contentWithEmpty
  },
  data() {
    return {
      title: 'List-上拉加载',
      noData: false,// 没有数据
      loadding: false,//上拉加载
      finished: false,//上拉加载完毕
      finishedText: '-我是有底线的-',
      pageNum: 1,
      pageSize:30,
      list: []
    }
  },
  methods: {
    navBack() {
      this.$router.back();
    },
    getList() {
      const self = this

      self.$loading.show()

      const state = true
      const total = 90
      if (state) {

        let p = Math.ceil(total / self.pageSize)

        // 暂无数据
        if (total==0) {
          self.noData = true
          return
        }

        // 有数据
        
        if (self.pageNum > p) {// 没有数据了
          self.finished = true
          return
        } else {// 请求中
          utils.delay(1000).then(function() {
            let rows = Array(30)
              .fill(null)
              .map(function() {
                return {
                  text:'景洪市铂金广场',
                  page:self.pageNum
                }
              }) 
            self.list = self.list.concat(rows)  
            self.loadding = false
            self.$loading.hide()
          })
        }

      } else {// 错误提示
        self.$message({
          message: '查询失败了！',
          type: 'error'
        })
      }
    },
    onLoad() {
      this.pageNum++
      console.log('下一页==', this.pageNum)
      this.getList();
    }
  },
  created() {
    this.getList()
  }
}
</script>
<style scoped lang="scss">
.item {
  padding:10px 12px;
  background-color:$color-white;
  border-bottom:1px solid $color-border-gray;
}
</style>