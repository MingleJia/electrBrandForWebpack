const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const filePublicPath="styles/assets/[name].[ext]";

module.exports = {
	context: path.resolve(__dirname, ".."),
	resolve: {
		modules: [
			path.resolve(__dirname, "../src"),
			path.resolve(__dirname, "../node_modules"),
			"node_modules"
		],
		alias: {
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
		extensions: [
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
						name: '[name].[ext]',
						outputPath: 'assets',
                        publicPath: '../assets'
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
