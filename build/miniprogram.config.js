module.exports = {
  origin: 'https://test.miniprogram.com',
  entry: '/',
  router: {
    index: ['/',
      '/todo'
    ],
  },
  redirect: {	
    notFound: 'index',	
    accessDenied: 'index',
  },
  app: {
    navigationBarTitleText: 'miniprogram-project',
  },
  projectConfig: {
    appid: 'wx97ec407bdf898b4c',
    projectname: 'wechat-web-vue',
  },
  packageConfig: {
    author: '1048523306@qq.com',
  },
}

