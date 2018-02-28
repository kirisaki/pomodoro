const path = require( 'path' )

const webpack = require( 'webpack' )
const merge = require( 'webpack-merge' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )

const resolve = filePath => path.resolve( __dirname, filePath )

const common = {
  devtool: 'source-map',
  resolve: {
    extensions: ['.js']
  },
  externals: ['electron'],
  output: {
    libraryTarget: 'commonjs2'
  }
}

const electron_main = {
  entry: resolve( 'src/electron_main.js' ),
  output: {
    path: resolve( 'dist' ),
    filename: 'index.js'
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new CopyWebpackPlugin( [
      { from: resolve( 'package.json' ), to: resolve( 'dist/package.json' ) },
    ] )
  ],
  target: 'node'
}

const elm_main = {
  entry: resolve( 'src/elm_main.js' ),
  module: {
    rules: [{
      test: /\.elm$/,
      exclude: [/elm-stuff/, /node_modules/],
      use: {
        loader: 'elm-webpack-loader',
        options: {
        }
      }
    }, {
      test: /\.html$/,
      exclude: /node_modules/,
      use: {
        loader: 'file-loader',
        options: {
          name: '[name].[ext]'
        }
      }
    }, {
      test: /\.s[ca]ss$/,
        loaders: [ 'style-loader', 'css-loader', 'sass-loader' ]
    }]
  },
  output: {
    path: resolve( './dist/' ),
    filename: 'app.js'
  }
}

module.exports = [
  merge( common, electron_main ),
  merge( common, elm_main )
]
