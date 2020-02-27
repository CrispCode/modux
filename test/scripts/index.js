/* globals window, document */

'use strict'

import { Module, Router, logger } from './../../scripts'

import { Layout } from './components/layout'

let initialize = () => {
  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', Layout )

  app.store.set( 'core', window.config )
  app.store.set( 'app', app )

  logger.enabled( app.store.get( 'core.debug' ) )

  logger.info( 'Application start' )

  Router.setDynamicBase( true )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )
