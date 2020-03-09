<template>
<div class="page">
  <div class="page-header">
    <page-title :title="title"></page-title>
  </div>

  <div class="page-main">
    <div class="page-scroller">
      <content-with-empty :empty="noData">
        <van-pull-refresh
          v-model="refreshing"
          success-text="刷新成功"
          @refresh="onRefresh">
          <van-list
            v-model="loadding"
            :finished="finished"
            :immediate-check="false" 
            :offset="10"
            finished-text="-我是有底线的-"
            @load="onLoad">  
            <div class="item" 
              v-for="item,index in list"
              :key="index">
              {{item.text}}--{{item.page}}
            </div>
          </van-list>  
        </van-pull-refresh>
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
      title: '下拉刷新上拉加载',
      noData: false,// 没有数据
      refreshing: false,//下拉刷新
      loadding: false,//上拉加载
      finished: false,//上拉加载完毕
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
            self.refreshing = false
            self.loadding = false
          })
        }

      } else {// 错误提示
        self.$message({
          message: '查询失败了！',
          type: 'error'
        })
      }
    },
    onRefresh() {
      this.pageNum = 1
      this.list = []
      this.finished = false 
      this.getList()
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
@import "../../styles/_global.scss";

.item {
  padding:10px 12px;
  background-color:$color-white;
  border-bottom:1px solid $color-border-gray;
}
</style>