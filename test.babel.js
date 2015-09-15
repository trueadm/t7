export default {
	devtool: 'eval',
	entry: './tests/index.js',
	output: {
		path: './dist',
		filename: 'testem.js'
	},
	module: {
		loaders: [{ test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }]
	},
	resolve: {
		extensions: ['', '.js']
	}
}
