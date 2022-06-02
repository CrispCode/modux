'use strict'

import { logger } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>logger</b> - A class instance to customize output to console' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          logger.enabled( true )<br/>
          logger.setId( '[ TEST ]' )<br/>
          logger.log( 'output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            logger.enabled( true )
            logger.setId( '[ TEST ]' )
            logger.log( 'output' )
            resolve( '[ TEST ] output' )
          } )
        },
        () => Promise.resolve( '[ TEST ] output' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          logger.enabled( true )<br/>
          logger.setId( '[ TEST ]' )<br/>
          logger.warn( 'output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            logger.enabled( true )
            logger.setId( '[ TEST ]' )
            logger.warn( 'output' )
            resolve( '[ TEST ] output' )
          } )
        },
        () => Promise.resolve( '[ TEST ] output' )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          logger.enabled( true )<br/>
          logger.setId( '[ TEST ]' )<br/>
          logger.error( 'output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            logger.enabled( true )
            logger.setId( '[ TEST ]' )
            logger.error( 'output' )
            resolve( '[ TEST ] output' )
          } )
        },
        () => Promise.resolve( '[ TEST ] output' )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          logger.enabled( false )<br/>
          logger.log( 'output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            logger.enabled( false )
            logger.log( 'output' )
            resolve( 'nothing should be displayed' )
          } )
        },
        () => Promise.resolve( 'nothing should be displayed' )
      )
    )

    // Step 5
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
            let l = logger.create( 'APP' )<br/>
            l.enabled( true )<br/>
            l.log( 'output' )<br/>
            resolve( 'APP output' )
        `,
        () => {
          return new Promise( ( resolve ) => {
            let l = logger.create( 'APP' )
            l.enabled( true )
            l.log( 'output' )
            resolve( 'APP output' )
          } )
        },
        () => Promise.resolve( 'APP output' )
      )
    )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
  }
}
