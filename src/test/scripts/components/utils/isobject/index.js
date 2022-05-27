'use strict'

import { isObject, html } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>isObject</b> - Checks if the value is an object' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'isObject( null )',
        () => Promise.resolve( isObject( null ) ),
        () => Promise.resolve( false )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'isObject()',
        () => Promise.resolve( isObject() ),
        () => Promise.resolve( false )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'isObject( 1000 )',
        () => Promise.resolve( isObject( 1000 ) ),
        () => Promise.resolve( false )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `isObject( 'not an object' )`,
        () => Promise.resolve( isObject( 'not an object' ) ),
        () => Promise.resolve( false )
      )
    )

    // Step 5
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `isObject( { prop1: 'v1', prop2: 'v2' } )`,
        () => Promise.resolve( isObject( { prop1: 'v1', prop2: 'v2' } ) ),
        () => Promise.resolve( true )
      )
    )

    return test
  }

  article2 () {
    let test = this._createTestElement( 'Test for yourself in the section below' )

    // Step 1
    let input = html( require( './test.html' ) )
    let output = html( '<span></span>' )

    input.querySelector( '.button-test' ).addEventListener( 'click', () => {
      let value = input.querySelector( '.input-test-value' ).value
      try {
        output.innerHTML = isObject( JSON.parse( value ) )
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
  }
}
