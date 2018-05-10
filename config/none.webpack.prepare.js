const path = require('path')
const paths = require('./paths')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: paths.appIndexJs,
  output: {
    // Next line is not used in dev but WebpackDevServer crashes without it:
    path: paths.appBuild,
    filename: 'bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader'},
        ]
      },
    ]
  },
  resolve: {
    alias: {
      contracts: path.join(__dirname, '../build/contracts'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
  plugins: [
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: paths.appHtml,
      filename: './index.html'
    }),
  ],
};
