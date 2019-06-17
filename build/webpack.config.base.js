const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const filePublicPath="styles/assets/[name].[ext]";

module.exports = {
	context: path.resolve(__dirname, ".."), // 上下文绝对路径
	resolve: {
		modules: [ // 配置webpack去哪些目录下寻找第三方模块
			// path.resolve:把一个路径或路径片段的序列解析为一个绝对路径
			// 从右向左拼接在一起
			// path.resolve('wwwroot', 'static_files/png/', '../gif/image.gif');// 如果当前工作目录为 /home/myself/node，相当于：
			path.resolve(__dirname, "../src"),
			path.resolve(__dirname, "../node_modules"),
			"node_modules"
		],
		alias: { // 给路径取别名，方便import和require
			src: path.resolve(__dirname, "../src"),
			ASSETS: "src/assets",
			COMPONENTS: "src/components",
			CONTAINERS: "src/containers",
			MOCK: "src/mock",
			MODULES: "src/modules",
			ROUTER: "src/router",
			STORE: "src/store",
			STYLES: "src/styles",
			UTILS: "src/utils",
		},
		extensions: [ // 自动解析确定的扩展，用户可以在引入模块时不带扩展名
			".web.js",
			".js",
			".jsx",
			".less",
			".css",
			".json",
			".scss"
		] //自动解析的扩展
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				loader:  ["babel-loader", "eslint-loader"],
				exclude: [/node_modules/],
				include: path.resolve(__dirname, "../src")
			},
			{
				test: /\.eot$/,
				use: [
					{
						loader: "file-loader",
						options:{
							name:filePublicPath
						}
					}
				]
			},
			{
				test: /\.woff$/,
				use: [
					{
						loader: "file-loader",
						options:{
							name:filePublicPath
						}
					}
				]
			},
			{
				test: /\.ttf$/,
				use: [
					{
						loader: "file-loader",
						options:{
							name:filePublicPath
						}
					}
				]
			},
			{
				test: /\.(jpe?g|png|gif)$/i,
                use: [{
                    loader: 'file-loader',
                    options: {
						//线上
						// name: '[name].[ext]',
						// outputPath: './assets',
						// publicPath: '/electrClassbrand/assets'
						//本地
						name: 'assets/[name].[ext]',
						
                    }
                }]
			},
			{
				test: /\.ico$/,
				use: [
					{
						loader: "file-loader",
						options:{
							name:filePublicPath
						}
					}

				]
			},
			{
				test: /\.svg$/i,
				use: [
					{
						loader: "url-loader",
						options:{
							name:filePublicPath
						}
					}
				]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
            template: 'views/index.html',
            filename: 'index.html',
            minify: true,
            inject: true
        })
	],
	externals: [
		//扩展，import 下属模块的时候不会打包生成Bundle
		require("webpack-require-http") //支持require 线上地址资源
	]
};
