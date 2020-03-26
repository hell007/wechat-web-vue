//参考地址 https://www.cnblogs.com/ayseeing/p/12505132.html

const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin')
const MpPlugin = require('mp-webpack-plugin')
const isOptimize = false // 是否压缩业务代码，开发者工具可能无法完美支持业务代码使用到的 es 特性，建议自己做代码压缩
const fileList = require('../config/entry')
const pjson = require('../package.json')

// 从package.json 中获取 arias，把@开头的处理成当前项目能用的路径
if (pjson && pjson.alias) {
  let alias = pjson.alias;
  let a = ''
  for (a in alias) {
    if (a.indexOf('@') === 0) {
      alias[a] = path.join(__dirname, '../src' + alias[a]);
    }
  }
}

// 小程序页面配置自动化
let entry = {}
fileList.forEach(function(item) {
  entry[item] = path.resolve(__dirname, '../src/pages/' + item + '.js')
})

module.exports = {
  mode: 'production',
  entry: {
    ...entry, // 小程序页面入口自动化

    // 小程序页面入口
    // index: path.resolve(__dirname, '../src/pages/index.js'),
    // log: path.resolve(__dirname, '../src/pages/log.js'),
    // typelist: path.resolve(__dirname, '../src/pages/typelist.js'),
    // detail: path.resolve(__dirname, '../src/pages/detail.js'),
  },
  output: {
    path: path.resolve(__dirname, '../build/mp/common'), // 放到小程序代码目录中的 common 目录下
    filename: '[name].js', // 必需字段，不能修改
    library: 'createApp', // 必需字段，不能修改
    libraryExport: 'default', // 必需字段，不能修改
    libraryTarget: 'window', // 必需字段，不能修改
  },
  target: 'web', // 必需字段，不能修改
  optimization: {
    runtimeChunk: false, // 必需字段，不能修改
    splitChunks: { // 代码分隔配置，不建议修改
      chunks: 'all',
      minSize: 1000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 100,
      maxInitialRequests: 100,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },

    minimizer: isOptimize ? [
      // 压缩CSS
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.(css|wxss)$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
            minifySelectors: false, // 因为 wxss 编译器不支持 .some>:first-child 这样格式的代码，所以暂时禁掉这个
          }],
        },
        canPrint: false
      }),
      // 压缩 js
      new TerserPlugin({
        test: /\.js(\?.*)?$/i,
        parallel: true,
      })
    ] : [],
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader'
      ],
    }, {
      test: /\.less$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'less-loader'
      ]
    }, {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }, {
      test: /\.[t|j]sx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        plugins: [
          ["transform-react-jsx"],
          ["class"],
        ]
      }
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json'],
    alias: {
      ...pjson.alias,
      // '@images': path.join(__dirname, "../src/assets/images"),
      // '@components': path.join(__dirname, '../src/components'),
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.isMiniprogram': process.env.isMiniprogram, // 注入环境变量，用于业务代码判断
    }),
    new MiniCssExtractPlugin({
      filename: '[name].wxss',
    }),
    new MpPlugin(require('./miniprogram.config'))
  ],
}