export default {
	entry: './t7.js',
	output: {
		path: './dist',
		filename: 't7.js',
		library: 't7',
		libraryTarget: 'umd'
	},
	module: {
		loaders: [{ test: /\.js$/, loaders: ['babel-loader'], exclude: /node_modules/ }]
	}
}
