const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  cache: { type: 'memory' },
  resolve: {
    extensions: ['.ts', '.js', '.jsx', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  entry: {app: './src/index.tsx'},
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    clean: true,
  },
  module: {
    rules: [{
				test: /\.(tsx?)(\?.*)?$/,
				use: [
					{
						loader: 'esbuild-loader',
						options: {
							loader: 'tsx',
							target: 'es2015',
						},
					},
				],
			},
			{
				test: /\.(js)(\?.*)?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'esbuild-loader',
						options: {
							target: 'es2015',
						},
					},
				],
      },
      {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'esbuild-loader',
              options: {
                loader: 'css',
                minify: true
              }
            }
          ]
      },
			{
				test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
				type: 'asset',
			},
			{
				test: /\.(svg)(\?.*)?$/,
				type: 'asset',
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
				type: 'asset',
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				type: 'asset',
			},]
  },
  plugins: [
		new HtmlPlugin({
			template: './public/index.html',
    }),
    new CopyPlugin({
			patterns: [
				{
					from: 'public',
					to: 'dist',
					toType: 'dir',
					globOptions: {
						ignore: ['.DS_Store', 'index.html'],
					},
				},
			],
    }),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    })
  ]
}