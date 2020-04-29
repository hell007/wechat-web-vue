const path = require('path')
const webpack = require('webpack')
const WebPackMerge = require('webpack-merge')
const WebPackBaseConfig = require('./webpack.base.config.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const glob = require('glob-all')
//const PurifyCSSPlugin = require('purifycss-webpack-plugin')

// 时间
const moment = require('moment');
const buildDate = moment().format('YYYYMMDDhhmmss');

module.exports = WebPackMerge(WebPackBaseConfig, {
  output: {
    path: path.resolve(__dirname, '../dist/web'),
    filename: `js/[name].${buildDate}.js`,
    chunkFilename: `js/[name].${buildDate}.js`,
  },
  optimization: {
    // 分割代码
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'all',
          test: /node_modules/,
          name: 'vendor',
          minChunks: 1,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 100
        },
        common: {
          chunks: 'all',
          test: /[\\/]src[\\/]js[\\/]/,
          name: 'common',
          minChunks: 2,
          maxInitialRequests: 5,
          minSize: 0,
          priority: 60
        },
        styles: {
          name: 'styles',
          test: /\.(sa|sc|c)ss$/,
          chunks: 'all',
          enforce: true
        },
        runtimeChunk: {
          name: 'manifest'
        },
      }
    },
    runtimeChunk: false,
    // 压缩代码
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          //生产环境自动删除console
          compress: {
            drop_debugger: true,
            drop_console: true,
            pure_funcs: ['console.log']
          }
        },
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
      from: path.join(__dirname, '../public/'),
      to: path.join(__dirname, '../dist/web/'),
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