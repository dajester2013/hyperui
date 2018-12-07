const path = require("path");

module.exports = {
	mode:"development"
	,entry:{
		examples: "./examples/index.js"
	}

	,output: {
		filename:"[name].bundle.js"
		,path: path.join(__dirname, "examples/dist")
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
							// ,localIdentName: '[name]__[local]'
						}
					}
					
					,"sass-loader"
				]
				,issuer: /\.[tj]s$/
			}

			,{
				test:/\.scss$/
				,use: [
					"css-loader","sass-loader"
				]
				,issuer: /\.html$/
			}


			,{
				test:/\.css$/
				,use: [
					"style-loader","css-loader"
				]
				,issuer: /\.[tj]s$/
			}

			,{
				test:/\.css$/
				,use: [
					"css-loader"
				]
				,issuer: /\.html$/
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