module.exports = {
	configureWebpack: {
		resolve: {
			alias: {
				// 路径别名
				'assets': '@/assets',
				'common': '@/common',
				'components': '@/components',
				'network': '@/network',
				'views': '@/views',
				'icon': '@/assets/icon',
			}
		}
	},

	css: {
		loaderOptions: {
			sass: {
				prependData: `@import "@/assets/scss/variable.scss";`,
			},
			scss: {
				prependData: `@import "@/assets/scss/variable.scss";`
			},
		},
	},

	productionSourceMap: false,
	// publicPath: process.env.NODE_ENV === 'production' ? '/music-next/' : '/'


}