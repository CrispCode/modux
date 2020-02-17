'use strict'

module.exports = ( config ) => {
  config.devServer.before = ( app ) => {
    app.get( '/qq', ( req, res ) => {
      res.end( 'THE END' )
    } )
  }

  return config
}
