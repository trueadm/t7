import { optimize as oz } from 'webpack';

let plugins = [
	new oz.DedupePlugin(),
	new oz.OccurenceOrderPlugin(),
	new oz.UglifyJsPlugin({
		compressor: {
			screw_ie8: true,
			warnings: false
		}
	}),
	new oz.AggressiveMergingPlugin()
];

export default {
	entry: './t7.js',
	output: {
		path: './dist',
		filename: 't7.min.js',
		library: 't7',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [{ test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }]
	},
	plugins
}
