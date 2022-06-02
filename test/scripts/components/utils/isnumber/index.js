'use strict'

import { isNumber } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>isNumber</b> - Function returns true if the value is numeric and false if it it\'s not' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'isNumber( 123.98765 )',
        () => Promise.resolve( isNumber( 123.98765 ) ),
        () => Promise.resolve( true )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        'isNumber( 1.0e+7 )',
        () => Promise.resolve( isNumber( 1.0e+7 ) ),
        () => Promise.resolve( true )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `isNumber( 'text' )`,
        () => Promise.resolve( isNumber( 'text' ) ),
        () => Promise.resolve( false )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `isNumber()`,
        () => Promise.resolve( isNumber() ),
        () => Promise.resolve( false )
      )
    )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
  }
}
