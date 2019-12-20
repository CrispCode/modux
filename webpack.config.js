'use strict'

const path = require( 'path' )
const webpack = require( 'webpack' )

const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const UglifyJSPlugin = require( 'uglifyjs-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const ImageminPlugin = require( 'imagemin-webpack-plugin' ).default

const SpeedMeasurePlugin = require( 'speed-measure-webpack-plugin' )
const smp = new SpeedMeasurePlugin()

module.exports = () => {
  let prod = false
  if ( process.env.NODE_ENV === 'production' ) {
    prod = true
  }

  let apps = process.cwd()
  let build = path.join( process.cwd(), 'build' )

  console.log( 'LOADING APPLICATION - ' + ( ( prod ) ? 'PRODUCTION' : 'DEVELOPMENT' ) )

  let plugins = [
    new MiniCssExtractPlugin( { filename: '[name].css' } ),
    new HtmlWebpackPlugin( {
      template: path.join( apps, 'app.html' ),
      inject: false,
      hash: false // Set to true in order to prevent css and js caching
    } ),
    new CopyWebpackPlugin( [
      { context: path.join( apps, 'public' ), from: '**/*', to: build }
    ] ),
    new ImageminPlugin( {
      test: /\.(jpe?g|png|gif|svg)$/i,
      disable: !prod,
      jpegtran: {
        progressive: true
      },
      pngquant: {
        strip: true,
        quality: '30-50'
      }
    } ),
    new webpack.DefinePlugin( { 'PRODUCTION': prod } )
  ]

  if ( !prod ) {
    plugins.push( new webpack.HotModuleReplacementPlugin() )
  }

  if ( prod ) {
    plugins.push( new UglifyJSPlugin() )
  }

  return smp.wrap( {
    mode: ( prod ) ? 'production' : 'development',
    stats: 'minimal',
    entry: {
      app: [
        path.join( apps, 'app.js' )
      ]
    },
    output: {
      path: build,
      filename: '[name].min.js'
    },
    devServer: {
      publicPath: '/',
      hot: !( prod ),
      inline: !( prod ),
      host: '0.0.0.0',
      port: 8080,
      contentBase: build,
      historyApiFallback: true,
      disableHostCheck: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      before: ( app ) => {
        // Allow all requests
        app.post( '*', ( req, res ) => {
          res.redirect( req.originalUrl )
        } )
        app.put( '*', ( req, res ) => {
          res.redirect( req.originalUrl )
        } )
        app.delete( '*', ( req, res ) => {
          res.redirect( req.originalUrl )
        } )
        app.options( '*', ( req, res ) => {
          res.redirect( req.originalUrl )
        } )
      }
    },
    resolve: {
      symlinks: false
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: [
                  [ '@babel/preset-env', {
                    modules: false,
                    include: [ 'proposal-object-rest-spread' ]
                  } ]
                ]
              }
            }
          ]
        },
        {
          test: /\.inline\.scss$/,
          use: [
            {
              loader: 'raw-loader'
            },
            {
              loader: 'sass-loader',
              options: {
                prependData: '@import "' + path.join( __dirname, 'styles', 'index.scss' ) + '";'
              }
            }
          ]
        },
        {
          test: /^((?!\.inline).)*\.scss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                url: false
              }
            },
            {
              loader: 'sass-loader',
              options: {
                prependData: '@import "' + path.join( __dirname, 'styles', 'index.scss' ) + '";'
              }
            }
          ]
        },
        {
          test: /\.(html)$/i,
          loader: 'raw-loader'
        },
        {
          test: /\.(frag)$/i,
          loader: 'raw-loader'
        }
      ]
    },
    plugins: plugins,
    performance: {
      hints: ( prod ) ? false : 'warning'
    },
    optimization: {
      usedExports: true
    }
  } )
}
