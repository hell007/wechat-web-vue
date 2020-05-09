<template>
<div class="page" ref="container">
  
</div>
</template>

<script>
import { theme } from '@/config';
import { 
  Sprite, 
  Scene, 
  Group, 
  Path, 
  Label } from '@/vendors/spritejs/spritejs.js';
export default {
  name: 'poster',
  components: {

  },
  data() {
    return {
      primary: theme.primary,
      title: '模板',
      scene: null,
      layer: null,
    }
  },
  methods: {
    createClockTexts(text, x, y) {
      const len = text.length;

      for(let i = 0; i < len; i++) {
        const char = text.charAt(i);
        const label = new Label(char);
        label.attr({
          anchor: [0, 0],
          pos: [x, y],
          lineHeight: 16,
          font: '16px "微软雅黑"',
          //fontWeight: 'bold',
          fillColor: '#323232',
          textAlign: 'left',
        });

        this.layer.append(label);
      }
    },
    isChinese(str) {
      return new RegExp("[\u4E00-\u9FA5]+").test(str)
    }
  },
  created() {   

  },
  mounted() {
    const self = this
    let container = this.$refs.container

    //define
    const deviceWidth = window.innerWidth
    const deviceHeight = window.innerHeight
    const theme = '#F39800'
    const color32 = '#323233'
    const color7d = '#7d7e80'
    const color96 = '#969799'
    const colorc8 = '#c8c9cc'
    const colorBorder = '#ebedf0'

    // position
    let posX = 0
    let posY = 0
    
    // bg image
    const bgUrl = require('../../assets/images/poster/poster-bg.png')
    const bgW = 2000 

    // 场景
    const scene = new Scene({
      container,
      mode: 'stickyWidth',
    }); 
    const layer = scene.layer();
    this.scene = scene
    this.layer = layer


    // 背景图
    const bgBox = new Sprite({
      anchor: [0, 0],
      pos: [posX, posY],
      width: deviceWidth,
      height: deviceHeight,
      bgcolor: '#fff',
      texture: bgUrl,
      //scale: width/bgW,
    })
    layer.append(bgBox)

    
    // 和云店 | 中国移动
    const tag = new Label()
    const tagTop = 15
    tag.attr({
      text: '和云店 | 中国移动',
      pos: [posX, tagTop],
      width: deviceWidth,
      font: '14px "微软雅黑"',
      fillColor: color7d,
      textAlign: 'center',
    })
    layer.append(tag)


    // 超值服务
    const title = new Label('超值服务')
    const titleTop = 30
    const titleHeight = 40
    let titlePosY = tagTop + titleTop
    title.attr({
      pos: [posX, titlePosY],
      width: deviceWidth,
      height: titleHeight,
      font: '40px "微软雅黑"',
      fontWeight: 'bold',
      fillColor: color32,
      textAlign: 'center',
    })
    layer.append(title)


    // 产品白框
    const padding = 20
    let productBgW = deviceWidth-padding*2
    let productBgPosY= titlePosY + titleHeight + padding
    const productBg = new Sprite({
      anchor: [0, 0],
      pos: [padding, productBgPosY],
      width: productBgW,
      height: productBgW + 100,
      bgcolor: '#fff',
      borderRadius: 10,
    })
    layer.append(productBg)


    // 产品
    const productPadding = 16
    let productW = productBgW - productPadding*2
    let productPosX = padding + productPadding
    let productPosY = productBgPosY + productPadding
    const productUrl = require('../../assets/images/poster/poster.png')
    const product = new Sprite({
      anchor: [0, 0],
      pos: [productPosX, productPosY],
      width: productW,
      height: productW,
      texture: productUrl,
    })
    layer.append(product)


    // 产品名称
    const productName = 'HUAWE IP40 6G+128G+亮黑色'
    const productNameTop = 10
    let productNamePosY = productPosY + productW + productNameTop

    const len = productName.length
    const charH = 16
    let labelW = productW + productPosX
    let labelY = productNamePosY
    let j = -1

    for(let i = 0; i < len; i++) {
      const char = productName.charAt(i)
      let charW = this.isChinese(char) ? 14 : 12

      const label = new Label(char)
      
      let labelX = productPosX + i*charW
      
      if (labelX >= labelW) {
        j++
        labelX = productPosX + j*charW
        labelY = productNamePosY + charH
      }

      console.log(i,char,charW, labelX, labelW)

      label.attr({
        pos: [labelX, labelY],
        width: charW,
        height: charH,
        font: '14px "微软雅黑"',
        fillColor: '#323232',
        textAlign: 'center',
      });

      layer.append(label);
    }

    // 价格
    const price = new Label('￥5899.00')
    const priceTop = 25
    const priceHeight = 20
    let pricePosY = labelY + priceTop
    price.attr({
      pos: [productPosX, pricePosY],
      width: productW,
      height: priceHeight,
      font: '20px "微软雅黑"',
      fontWeight: 'bold',
      fillColor: theme,
      textAlign: 'left',
    })
    layer.append(price)
    
  },
}
</script>
<style scoped lang="scss">
.test {
  white-space:wrap;
}
</style>
