#!/usr/bin/env node

const args = process.argv.slice( 2 )

const webpack = require( 'webpack' )
const WebpackDevServer = require( 'webpack-dev-server' )

let env = 'development'
if ( [ 'PRODUCTION', 'production', 'PROD', 'prod' ].indexOf( args[ 0 ] ) !== -1 ) {
  env = 'production'
}
process.env[ 'NODE_ENV' ] = env

const config = require( __dirname + '/webpack.config.js' )()
const compiler = webpack( config )

const hostname = ( process.platform === 'win32' ) ? 'localhost' : '0.0.0.0'
const port = 8080

if ( env === 'development' ) {
  const server = new WebpackDevServer( config.devServer, compiler )
  server.start( port, hostname, ( err ) => {
    if ( err ) {
      console.log( err )
    }
  } )
} else {
  compiler.run( ( err ) => {
    if ( err ) {
      console.log( err )
    }
  } )
}
