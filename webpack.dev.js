const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    new BundleAnalyzerPlugin({
      nalyzerMode: 'server',
			openAnalyzer: false,
    }),
	],
	devServer: {
		host: 'localhost',
		port: 3090,
		hot: true,
		historyApiFallback: true,
	},
});
