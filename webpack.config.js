const path = require("path");

module.exports = {
	entry:"./index.js"

	,output: {
		filename:"hyperui.min.js"
		,path: path.join(__dirname, "dist")
	}

	,module: {
		rules: [
			{
				test:/\.scss$/
				,use: [
					"style-loader"
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

}