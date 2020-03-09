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
    appid: '',
    projectname: 'wechat-web-vue',
  },
  packageConfig: {
    author: '1048523306@qq.com',
  },
}

