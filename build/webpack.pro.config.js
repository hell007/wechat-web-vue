const path = require('path')
const webpack = require('webpack')
const WebPackMerge = require('webpack-merge')
const WebPackBaseConfig = require('./webpack.base.config.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob-all')
const PurifyCSSPlugin = require('purifycss-webpack')

// 时间
const moment = require('moment');
const buildDate = moment().format('YYYYMMDDhhmmss');

module.exports = WebPackMerge(WebPackBaseConfig, {
  output: {
    filename: `js/[name].${buildDate}.js`,
    publicPath: './',
    chunkFilename: `js/[name].${buildDate}.js`,
    path: path.resolve(__dirname, '../dist/web'),
  },
  target: 'web',
  optimization: {
    // 分割代码
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      }
    },
    runtimeChunk: false,
    // 压缩代码
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      }),
      new OptimizeCSSAssetsPlugin()
    ]
  },
  plugins: [
    // 清理文件夹
    //new CleanWebpackPlugin(['dist']), 
    // 拷贝静态文件
    new CopyWebpackPlugin([{
      from: path.join(__dirname, '../public/img'),
      to: path.join(__dirname, '../dist/web/img'),
      ignore: ['.*']
    }]),
    // css extract
    new MiniCssExtractPlugin({
      filename: `css/[name].${buildDate}.css`,
      chunkFilename: `css/[name].${buildDate}.css`,
    }),
    // 去除无用的css 此处会导致css为空
    // new PurifyCSSPlugin({
    //   paths: glob.sync([
    //     path.join(__dirname, '../src/')
    //   ]),
    //   purifyOptions: {
    //     whitelist: ['*purify*']
    //   }
    // }),
  ]
})