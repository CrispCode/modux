'use strict'

const path = require( 'path' )
const webpack = require( 'webpack' )

const HtmlWebpackPlugin = require( 'html-webpack-plugin' )
const CopyWebpackPlugin = require( 'copy-webpack-plugin' )
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' )
const ImageMinimizerPlugin = require( 'image-minimizer-webpack-plugin' )

module.exports = () => {
  let prod = false
  if ( process.env.NODE_ENV === 'production' ) {
    prod = true
  }

  let apps = process.cwd()
  let build = path.join( process.cwd(), 'build' )

  console.log( 'LOADING APPLICATION - ' + ( ( prod ) ? 'PRODUCTION' : 'DEVELOPMENT' ) )

  let plugins = [
    new MiniCssExtractPlugin( { filename: '[name].min.css' } ),
    new HtmlWebpackPlugin( {
      template: path.join( apps, 'app.html' ),
      inject: false,
      hash: false // Set to true in order to prevent css and js caching
    } ),
    new CopyWebpackPlugin( {
      patterns: [
        {
          from: path.join( apps, 'public' ),
          to: build,
          noErrorOnMissing: true
        }
      ]
    } ),
    new webpack.DefinePlugin( { 'PRODUCTION': prod } )
  ]

  let config = {
    mode: 'none',
    cache: !prod,
    entry: {
      app: [
        path.join( apps, 'app.js' )
      ]
    },
    output: {
      path: build,
      filename: '[name].min.js',
      pathinfo: !prod
    },
    devServer: {
      open: true,
      static: {
        publicPath: '/',
        directory: build
      },
      hot: !( prod ),
      liveReload: !( prod ),
      historyApiFallback: true,
      allowedHosts: 'all',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, Content-Length, X-Requested-With',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      },
      setupMiddlewares: ( middlewares, server ) => {
        let app = server.app
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

        return middlewares
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
                additionalData: ( content, loaderContext ) => {
                  const relativePath = path.relative( path.dirname( loaderContext.resourcePath ), path.join( __dirname, 'styles', 'index.scss' ) ).split( path.sep ).join( '/' )
                  return '@import "' + relativePath + '";\n' + content
                }
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
                url: false,
                modules: {
                  mode: 'icss'
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                additionalData: ( content, loaderContext ) => {
                  const relativePath = path.relative( path.dirname( loaderContext.resourcePath ), path.join( __dirname, 'styles', 'index.scss' ) ).split( path.sep ).join( '/' )
                  return '@import "' + relativePath + '";\n' + content
                }
              }
            }
          ]
        },
        {
          test: /\.inline\.css$/,
          use: [
            {
              loader: 'raw-loader'
            }
          ]
        },
        {
          test: /^((?!\.inline).)*\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                modules: {
                  mode: 'icss'
                }
              }
            }
          ]
        },
        {
          test: /\.(html)$/i,
          loader: 'raw-loader'
        },
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'url-loader'
            },
            {
              loader: ImageMinimizerPlugin.loader,
              options: {
                severityError: 'warning', // Ignore errors on corrupted images
                minimizerOptions: {
                  plugins: [
                    [ 'gifsicle', { interlaced: true } ],
                    [ 'jpegtran', { progressive: true } ],
                    [ 'optipng', { optimizationLevel: 5 } ],
                    [
                      'svgo',
                      {
                        plugins: [
                          {
                            removeViewBox: false
                          }
                        ]
                      }
                    ]
                  ]
                }
              }
            }
          ]
        },
        {
          test: /\.(frag)$/i,
          loader: 'raw-loader'
        }
      ]
    },
    plugins: plugins,
    performance: {
      hints: ( prod ) ? 'warning' : false
    },
    optimization: {
      nodeEnv: process.env.NODE_ENV,
      flagIncludedChunks: true,
      sideEffects: true,
      usedExports: true,
      concatenateModules: true,
      emitOnErrors: !prod,
      checkWasmTypes: true,
      minimize: prod
    }
  }

  // Overwrite config if needed
  try {
    let newConfig = require( path.join( apps, 'modux.config.js' ) )
    if ( typeof newConfig === 'function' ) {
      console.log( '\nUsing new configuration from modux.config.js\n\n' )
      config = newConfig( config )
    }
  } catch ( err ) { }

  return config
}
