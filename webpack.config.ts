import path from 'path';
import {CleanWebpackPlugin} from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import {ProvidePlugin} from 'webpack';

module.exports = {
  target: 'web',
  entry: './src/index',
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `[name].js`,
    chunkFilename: '[id].[chunkhash].js',
  },
  resolve: {
    extensions: ['.wasm', '.ts', '.tsx', '.mjs', '.cjs', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{from: 'assets', globOptions: {ignore: '**/index.html'}}],
    }),
    new HtmlWebpackPlugin({
      title: 'Match-three game with ECS',
      template: 'assets/index.html',
    }),
    new ProvidePlugin({
      PIXI: 'pixi.js',
    }),
  ],
  devServer: {
    inline: true,
    port: 9000,
    compress: true,
    watchContentBase: true,
    publicPath: '/',
    contentBase: [path.join(__dirname, 'dist')],
  },
  optimization: {
    chunkIds: 'named',
    mergeDuplicateChunks: true,
    removeEmptyChunks: true,
    splitChunks: {
      chunks: 'all',
    },
  },
};
