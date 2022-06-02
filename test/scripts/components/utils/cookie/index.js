/* globals document */

'use strict'

import { Cookie, loop, html } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  __getCookie ( name ) {
    let result = null
    let cookies = document.cookie.split( ';' )
    loop( cookies, ( item ) => {
      let data = item.split( '=' )
      if ( data[ 0 ].trim() === name ) {
        result = data[ 1 ].trim()
        return
      }
    } )
    return result
  }

  article1 () {
    let test = this._createTestElement( '<b>Cookie</b> - A class used for manipulating browser cookies' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `Cookie.set('cookie-test','success')`,
        () => {
          Cookie.set( 'cookie-test', 'success' )
          return Promise.resolve( 'Cookie was set correctly' )
        },
        () => new Promise( ( resolve ) => {
          if ( this.__getCookie( 'cookie-test' ) === 'success' ) {
            resolve( 'Cookie was set correctly' )
          } else {
            resolve( 'Did not find the cookie' )
          }

          // Test is done, delete the cookie
          Cookie.set( 'cookie-test', 'success', '/', -1000 )
        } )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `Cookie.set('cookie-test','success', '/' )`,
        () => {
          Cookie.set( 'cookie-test', 'success', '/' )
          return Promise.resolve( 'Cookie was set correctly' )
        },
        () => new Promise( ( resolve ) => {
          if ( this.__getCookie( 'cookie-test' ) === 'success' ) {
            resolve( 'Cookie was set correctly' )
          } else {
            resolve( 'Did not find the cookie' )
          }

          // Test is done, delete the cookie
          Cookie.set( 'cookie-test', 'success', '/', -1000 )
        } )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `Cookie.set('cookie-test','success', '/', 100 )`,
        () => {
          Cookie.set( 'cookie-test', 'success', '/', 100 )
          return Promise.resolve( 'Cookie was set correctly' )
        },
        () => new Promise( ( resolve ) => {
          if ( this.__getCookie( 'cookie-test' ) === 'success' ) {
            resolve( 'Cookie was set correctly' )
          } else {
            resolve( 'Did not find the cookie' )
          }

          // Test is done, delete the cookie
          Cookie.set( 'cookie-test', 'success', '/', -1000 )
        } )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `Cookie.set('cookie-test','success' )<br/>Cookie.set('cookie-test','success', null, -1000 )`,
        () => {
          Cookie.set( 'cookie-test', 'success' )
          Cookie.set( 'cookie-test', 'success', null, -1000 )
          return Promise.resolve( 'Cookie was created and then deleted' )
        },
        () => new Promise( ( resolve ) => {
          if ( this.__getCookie( 'cookie-test' ) === 'success' ) {
            resolve( 'Cookie was not deleted properly' )
          } else {
            resolve( 'Cookie was created and then deleted' )
          }
        } )
      )
    )

    // Step 5
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `Cookie.set('cookie-test','success', null, 100 )
        <br/>
        Cookie.get('cookie-test' )`,
        () => {
          Cookie.set( 'cookie-test', 'success', null, 100 )
          return Promise.resolve( ( Cookie.get( 'cookie-test' ) === 'success' ) ? 'Cookie was created and found' : 'Cookie was not found' )
        },
        () => new Promise( ( resolve ) => {
          resolve( 'Cookie was created and found' )

          // Test is done, delete the cookie
          Cookie.set( 'cookie-test', 'success', null, -1000 )
        } )
      )
    )

    return test
  }

  article2 () {
    let test = this._createTestElement( 'Test `Cookie.set` for yourself in the section below' )

    // Step 1
    let input = html( require( './test-set.html' ) )
    let output = html( '<span></span>' )

    input.querySelector( '.button-test' ).addEventListener( 'click', () => {
      let name = input.querySelector( '.input-test-name' ).value
      let value = input.querySelector( '.input-test-value' ).value
      let path = input.querySelector( '.input-test-path' ).value
      let age = input.querySelector( '.input-test-age' ).value
      try {
        Cookie.set( name, value, path, age )
        output.innerHTML = Cookie.get( name )
      } catch ( e ) {
        output.innerHTML = e.message
      }
    } )

    let step = this._createStepElement( input, output )
    test.querySelector( '.steps' ).appendChild( step )

    return test
  }

  article3 () {
    let test = this._createTestElement( 'Test `Cookie.get` for yourself in the section below' )

    // Step 1
    let input = html( require( './test-get.html' ) )
    let output = html( '<span></span>' )

    input.querySelector( '.button-test' ).addEventListener( 'click', () => {
      let name = input.querySelector( '.input-test-name' ).value
      try {
        output.innerHTML = Cookie.get( name )
      } catch ( e ) {
        output.innerHTML = e.message
      }
    } )

    let step = this._createStepElement( input, output )
    test.querySelector( '.steps' ).appendChild( step )

    return test
  }
  execute () {
    this.element.appendChild( this.article1() )
    this.element.appendChild( this.article2() )
    this.element.appendChild( this.article3() )
  }
}
