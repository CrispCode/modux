'use strict'

import { radians, html } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>radians</b> - Converts a value to radians' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'radians( 0 )',
        () => Promise.resolve( radians( 0 ).toString() ),
        () => Promise.resolve( '0' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'radians( 90 )',
        () => Promise.resolve( radians( 90 ).toString() ),
        () => Promise.resolve( '1.5707963267948966' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'radians( 180 )',
        () => Promise.resolve( radians( 180 ).toString() ),
        () => Promise.resolve( '3.141592653589793' )
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
        output.innerHTML = radians( value )
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
