const path = require('path')
const webpack = require('webpack')
const WebPackBaseConfig = require('./webpack.base.config.js')
const WebPackMerge = require('webpack-merge')

module.exports = WebPackMerge(WebPackBaseConfig, {
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    //port: 3000,
    open: true, //自动在浏览器打开
    hot: true, //启用热替换模块  必须配置 webpack.HotModuleReplacementPlugin
    compress: true, //启用 gzip 压缩
    historyApiFallback: true,
    overlay: true,
    host: "localhost",
    proxy: {
      '/apis': {
        target: 'http://localhost:9000',
        changeOrigin: true,
        pathRewrite: {
          '^/apis': '/api'
        }
      }
    },
  },
  plugins: [
    //启用热替换模块
    new webpack.HotModuleReplacementPlugin(), 
    //启用HMR时,插件将显示模块的相对路径
    new webpack.NamedModulesPlugin() 
  ]
})