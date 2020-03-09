const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const {
  VueLoaderPlugin
} = require('vue-loader')

const isDev = process.env.NODE_ENV === 'production'

let pluginsConfig = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    title: '微信小程序 web vue项目搭建',
    template: path.resolve(__dirname, '../public/index.html'),
    cdn: {
      // cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
      externals: {
        'echarts': 'echarts',
      },
      css: [],
      js: [
        'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js',
      ]
    }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }
  })
]

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  entry: {
    app: path.join(__dirname, '../src/main.js'),
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  target: 'web',
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
    }, {
      test: /\.(sa|sc|c)ss$/,
      use: [!isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader', {
          loader: 'postcss-loader',
          options: {　　　　　　　　
            sourceMap: isDev ? true : false
          }
        }
      ]
    }, {
      test: /\.js$/,
      loader: 'babel-loader?cacheDirectory',
      exclude: '/node_modules/',
      include: path.resolve(__dirname, '../src')
    }, {
      test: /\.(png|jpg|gif|svg)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  resolve: {
    extensions: ['*', '.js', '.vue', '.json', ".scss", ".css"],
    alias: {
      '@': path.resolve('src'),
    }
  },
  plugins: pluginsConfig,
}