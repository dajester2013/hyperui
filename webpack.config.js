const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


const devMode = process.env.NODE_ENV !== "production";


module.exports = {
	entry:"./index.js"

	,output: {
		filename:"hyperui.bundle.js"
		,path: path.join(__dirname, "dist")
	}

	,devtool:"source-map"

	,module: {
		rules: [
			{
				test:/\.scss$/
				,use: [
					 devMode ? "style-loader" : MiniCssExtractPlugin.loader
					,{
						loader:"css-loader"
						,options:{
							modules: true
						}
					}
					
					,"sass-loader"
				]
				,issuer: /\.[tj]s$/
			}

			,{
				test:/\.jsx?$/
				,loader:"babel-loader"
				,query: {
					plugins: [
						 ["@babel/plugin-proposal-decorators", {legacy: true}]
						,["@babel/plugin-proposal-class-properties", {loose: true}]
					]
					,presets: ["@babel/preset-env"]
				}
			}
		]
	}


	,plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			 filename: devMode ? "[name].css" : "[name].[hash].css"
			,chunkFilename: devMode ? "[id].css" : "[id].[hash].css"
		})
	]

}