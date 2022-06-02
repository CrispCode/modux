/* globals window, document */

'use strict'

import { Module, logger } from './../../src/scripts'

import { Layout } from './components/layout'

import variables from './../styles/index.scss'

let initialize = () => {
  // Create application
  let app = new Module( 'app' )
  app
    .addDependency( 'layout', Layout )

  app.store.set( 'core', window.config )

  logger.enabled( app.store.get( 'core.debug' ) )

  logger.info( 'Application start' )
  logger.log( 'Breakpoint is at ', variables.breakpoint )

  // Start application
  app.bootstrap( document.querySelector( 'body' ), 'layout' )
}

window.addEventListener( 'load', () => {
  initialize()
} )
