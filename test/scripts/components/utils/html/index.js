'use strict'

import { html } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>html</b> - Converts a string to an html element' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `let element = html( '&lt;span name="text" style="color: #ff0000"&gt;custom text&lt;/span&gt;' )<br/><br/>return element.getAttribute( 'name' )`,
        () => new Promise( ( resolve ) => {
          let element = html( '<span name="text" style="color: #ff0000">custom text</span>' )
          resolve( element.getAttribute( 'name' ) )
        } ),
        () => Promise.resolve( 'text' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `let element = html( '&lt;span style="color: #ff0000"&gt;&lt;div&gt;DIV ELEMENT&lt;/div&gt;&lt;/span&gt;' )<br/><br/>return element.querySelector( 'div' ).innerHTML`,
        () => new Promise( ( resolve ) => {
          let element = html( '<span style="color: #ff0000"><div>DIV ELEMENT</div></span>' )
          resolve( element.querySelector( 'div' ).innerHTML )
        } ),
        () => Promise.resolve( 'DIV ELEMENT' )
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
      let value = input.querySelector( '.input-test-html' ).value
      try {
        output.appendChild( html( value ) )
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
