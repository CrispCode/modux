#!/usr/bin/env node

const parameters = process.argv.slice( 2 )

const webpack = require( 'webpack' )
const WebpackDevServer = require( 'webpack-dev-server' )
const boilerplate = require( __dirname + '/boilerplate' )

const path = require( 'path' )
const File = require( __dirname + '/utils/File.js' )
const Output = require( __dirname + '/utils/Output.js' )

const config = require( __dirname + '/webpack.config.js' )()
const compiler = webpack( config )

// Starts the application in development mode
const start = ( hostname = 'localhost', port = '8080' ) => {
  process.env[ 'NODE_ENV' ] = 'development'
  Output.log( 'STARTING APPLICATION - DEVELOPMENT' )
  const server = new WebpackDevServer( config.devServer, compiler )
  server.start( port, hostname, ( err ) => {
    if ( err ) {
      Output.error( err )
    }
  } )
}

// Builds the application for production
const build = () => {
  process.env[ 'NODE_ENV' ] = 'production'
  Output.log( 'STARTING APPLICATION - PRODUCTION' )
  compiler.run( ( err ) => {
    if ( err ) {
      Output.error( err )
    }
  } )
}

const help = () => {
  // Fallback
  return File.get( __dirname + path.sep + 'help.txt' ).exists()
    .then( ( file ) => {
      return file.read()
    } )
    .then( ( data ) => {
      Output.write( data )
    } )
}

if ( parameters[ 0 ] ) {
  switch ( parameters[ 0 ].toString().toLowerCase() ) {
    case 'start':
      start( ( process.platform === 'win32' ) ? 'localhost' : '0.0.0.0', 80 )
      break
    case 'build':
      build()
      break
    case 'boilerplate':
      boilerplate( parameters[ 1 ], parameters[ 2 ] )
      break
    case 'help':
    default:
      help()
      break
  }
} else {
  help()
}
