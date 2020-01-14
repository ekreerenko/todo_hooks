const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/index.js',
  },
  devtool: 'inline-source-map', // track errors in source file
  devServer: {
    compress: true, //  gzip compression
    port: 9000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'React App',
      template: './src/index.html',
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({ // enable lodash as global variable
       _: 'lodash',
       join: ['lodash', 'join'] // provide a single method of lodash as global
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].index.js'
    // filename: '[name].[hash].bundle.js',
    // chunkFilename: '[name].[hash].bundle.js',  // dynamic imports [contenthash] adds has to filename
    // path: path.resolve(__dirname, './dist'),
    // publicPath: '/',  // run as middleware node express
  },
  // optimization: {
  //   moduleIds: 'hashed',
  //   runtimeChunk: 'single', // single runtime for all chunks
  //   splitChunks: {  // chunk configurations
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         chunks: 'all'
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        },
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: true,
            removeAttributeQuotes: false,
            caseSensitive: true,
            customAttrSurround: [ [/#/, /(?:)/], [/\*/, /(?:)/], [/\[?\(?/, /(?:)/] ],
            customAttrAssign: [ /\)?\]?=/ ]
          }
        }]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(csv|tsv)$/,
        use: [
          'csv-loader'
        ]
      },
      {
        test: /\.xml$/,
        use: [
          'xml-loader'
        ]
      },
      // {
      //   test: require.resolve('index.js'),
      //   use: 'imports-loader?this=>window'  // link this with window
      // }
      // {
      //   test: require.resolve('globals.js'),
      //   use: 'exports-loader?file,parse=helpers.parse'  / global export
      // }
    ],

  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
};
