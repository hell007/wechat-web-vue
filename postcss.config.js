module.exports = {
	plugins: [
		require('autoprefixer')({
			browsers: ['last 100 versions']
		}),
		'postcss-px-to-viewport': {
			viewportWidth: 375, // 视窗的宽度，设计稿的宽度
			viewportHeight: 667, //视窗的高度，也可以不配置
			unitPrecision: 3, // 指定`px`转换为视窗单位值的小数位数
			viewportUnit: "vw", //指定需要转换成的视窗单位，建议使用vw
			selectorBlackList: ['.ignore'], // 指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
			minPixelValue: 1, // 小于或等于`1px`不转换为视窗单位，你也可以设置为你想要的值
			mediaQuery: false // 允许在媒体查询中转换`px`
		}
	]
};