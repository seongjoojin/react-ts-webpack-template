const os = require('os');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const { extendDefaultPlugins } = require('svgo');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'hidden-source-map',
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
  },
  plugins: [
    new PreloadWebpackPlugin({
			rel: 'preload',
			include: 'initial',
			fileBlacklist: [/\.map$/, /hot-update\.js$/],
		}),
		new GenerateSW({
			include: [/^index\.html$/, /\.css$/, /\.js$/],
			exclude: [],
			runtimeCaching: [
				{
					urlPattern: /\.(png|jpe?g|gif|webp|svg)(\?.*)?$/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'images-cache',
					},
				},
				{
					urlPattern: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'videos-cache',
					},
				},
				{
					urlPattern: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
					handler: 'CacheFirst',
					options: {
						cacheName: 'fonts-cache',
					},
				},
				{
					urlPattern: /\.css$/,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'css-cache',
					},
				},
				{
					urlPattern: /\.js$/,
					handler: 'StaleWhileRevalidate',
					options: {
						cacheName: 'js-cache',
					},
				},
			],
		}),
		new ImageMinimizerPlugin({
			exclude: /node_modules/,
			minimizerOptions: {
				plugins: [
					'gifsicle',
					'mozjpeg',
					'pngquant',
					[
						'svgo',
						{
							plugins: extendDefaultPlugins([
								{
									name: 'removeViewBox',
									active: false,
								},
								{
									name: 'addAttributesToSVGElement',
									params: {
										attributes: [{ xmlns: 'http://www.w3.org/2000/svg' }],
									},
								},
							]),
						},
					],
				],
			},
		}),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' })
  ],
  optimization: {
		runtimeChunk: 'single',
		minimize: true,
		minimizer: [
			new ESBuildMinifyPlugin({
				sourcemap: false,
				target: 'es2015',
				css: true,
			}),
			new TerserPlugin({
				extractComments: false,
				parallel: true,
				terserOptions: {
					compress: {
						drop_console: true,
					},
				},
			}),
		],
	},
})