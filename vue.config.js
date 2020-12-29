// 参考文档 https://cli.vuejs.org/zh/config/#integrity
const path = require('path');

// 时间
const moment = require('moment');
const buildDate = moment().format('YYYYMMDDhhmmss');

// 是否为生产环境
const isProduction = process.env.NODE_ENV !== 'development'

// 本地环境是否需要使用cdn
const devNeedCdn = true

// cdn：模块名称和模块作用域命名（对应window里面挂载的变量名称）
const cdn = {
  externals: {
    'echarts': 'echarts',
  },
  css: [],
  js: [
    'https://cdn.bootcss.com/echarts/4.6.0/echarts.min.js',
  ]
}

module.exports = {
  publicPath: '/',
  outputDir: 'dist',
  //assetsDir: '/assets',
  indexPath: 'index.html',
  lintOnSave: isProduction,
  productionSourceMap: false,
  runtimeCompiler: true, //热更新
  devServer: {
    port: 9527,
    open: true,
    hot: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: "https://ynyd.ynicity.cn",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
  },
  css: {
    extract: {
      filename: `css/[name].${buildDate}.css`,
      chunkFilename: `css/[name].${buildDate}.css`,
    },
  },
  configureWebpack: {
    output: {
      filename: `js/[name].${buildDate}.js`,
      chunkFilename: `js/[name].${buildDate}.js`,
    },
  },
  chainWebpack: config => {
    // 修复HMR
    //config.resolve.symlinks(true);
    const oneOfsMap = config.module.rule('scss').oneOfs.store
    oneOfsMap.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: path.resolve(__dirname, './src/styles/_global.scss'),
        })
        .end()
    })

    // 生产环境压缩、分割代码
    if(isProduction) {

      // 压缩代码
      config.optimization.minimize(true)

      // 分割代码
      config.optimization.splitChunks({
        chunks: 'all'
      })

    }

    // 注入cdn
    config.plugin('html').tap(args => {
      if (isProduction || devNeedCdn) args[0].cdn = cdn
      return args
    })
  },
}