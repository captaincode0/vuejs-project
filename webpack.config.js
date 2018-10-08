const path = require("path");

/**
 * Webpack Plugins
 */
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const FlowWebpackPlugin = require("flow-webpack-plugin");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const JSMininizer = new UglifyJsPlugin({
						test: /\.js/,
						exclude: /node_modules/,
						parallel: true
					});

/**
 * [ExtractCSS configure plugin to compile sass code into css file]
 * @type {ExtractTextPlugin}
 */
const ExtractCSS = new ExtractTextPlugin("app.css");

/**
 * [ISDEVELOPMENT used to check if is developing under development environment]
 * @type {Boolean}
 */
const ISDEVELOPMENT = (process.env.NODE_ENV === "development");

/**
 * Loaders
 */

/**
 * [CSSLoader loader used to process all css files]
 * @type {Object}
 */
const CSSLoader = {
					test: /\.css$/,
					exclude: /node_modules/,
					use: ExtractCSS.extract({
						fallback: "style-loader",
						publicPath: path.resolve(__dirname, "src/dist/css"),
						use: [
							{
								loader: "css-loader",
								options: {
									url: false,
									minimize: !ISDEVELOPMENT
								}
							}
						]	
					})
				};

/**
 * [SASSLoader loader used to process all SASS files and compile'em and save in a minified CSS file]
 * @type {Object}
 */
const SASSLoader = {
					test: /\.scss$/,
					exclude: /node_modules/,
					use: ExtractCSS.extract({
						fallback: "style-loader",
						publicPath: path.resolve(__dirname, "src/dist/css"),
						use: [
							{
								loader: "css-loader",
								options: {
									url: false,
									minimize: !ISDEVELOPMENT
								}
							},
							{
								loader: "sass-loader",
								options: {
									outputStyle: (!ISDEVELOPMENT)?"compressed":"uncompressed"
								}	
							}
						]
					})
				};

/**
 * [CommentsLoader Used to remove comments when is in production mode]
 * @type {Object}
 */
const CommentsLoader = {
						test: /\.(js|scss|css)/,
						loader: ["remove-comments-loader"]
					};	

/**
 * [JSLoader used to process flow files with babel-loader]
 * @type {Object}
 */
const JSLoader = {
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: [
								"@babel/preset-flow",
								"@babel/preset-env"
							],
							plugins: [
								require("@babel/plugin-transform-runtime"),
								require("@babel/plugin-transform-flow-comments"),
								require("@babel/plugin-syntax-flow"),
								require("@babel/plugin-transform-flow-strip-types")
							]
						}
					}
				};

const VUELoader = {
					test: /\.vue$/,
					loader: "vue-loader"
				};

/**
 * [DEVELOPMENT_LOADER loader used for command npm run dev]
 * @type {Array}
 */
const DEVELOPMENT_LOADER = [
								VUELoader, 
								CSSLoader, 
								SASSLoader, 
								JSLoader
						];

/**
 * [PRODUCTION_LOADER Loader used for production mode]
 * @type {Array}
 */
const PRODUCTION_LOADER = [
							VUELoader, 
							CSSLoader, 
							SASSLoader, 
							JSLoader, 
							CommentsLoader
						];

/**
 * Project webpack configuration
 */
module.exports = {
	entry: {
		main: "./src/app.js"
	},
	output: {
		path: path.resolve(__dirname, "src/dist"),
		filename: "app.js"
	},
	module: {
		rules: (ISDEVELOPMENT)?DEVELOPMENT_LOADER:PRODUCTION_LOADER
	},
	optimization: {
		minimizer: (!ISDEVELOPMENT)?[JSMininizer]:[]
	},
	plugins: [
		ExtractCSS,
		new VueLoaderPlugin(),
		new FlowWebpackPlugin()
	]
};