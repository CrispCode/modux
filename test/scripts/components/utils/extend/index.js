'use strict'

import { extend, html } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>extend</b> - A function used to merge 2 objects together, at a deep level' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        ` extend( <br/>&nbsp;&nbsp;{ a: 'a', b: { a: 'a', b: 'b' } }, <br/>&nbsp;&nbsp;{ b: { b: 'x', c: 'c' } } <br/>) `,
        () => Promise.resolve( JSON.stringify( extend( { a: 'a', b: { a: 'a', b: 'b' } }, { b: { b: 'x', c: 'c' } } ), null, 4 ) ),
        () => Promise.resolve( JSON.stringify( { a: 'a', b: { a: 'a', b: 'x', c: 'c' } }, null, 4 ) )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        ` extend( <br/>&nbsp;&nbsp;{ a: 'a', b: { a: 'a', b: 'b' } }, <br/>&nbsp;&nbsp;null <br/>) `,
        () => Promise.resolve( JSON.stringify( extend( { a: 'a', b: { a: 'a', b: 'b' } }, null ), null, 4 ) ),
        () => Promise.resolve( JSON.stringify( null, null, 4 ) )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        ` extend( <br/>&nbsp;&nbsp;{ a: 'a', b: { a: 'a', b: 'b' } }, <br/>&nbsp;&nbsp;undefined <br/>) `,
        () => Promise.resolve( JSON.stringify( extend( { a: 'a', b: { a: 'a', b: 'b' } }, undefined ), null, 4 ) ),
        () => Promise.resolve( JSON.stringify( { a: 'a', b: { a: 'a', b: 'b' } }, null, 4 ) )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        ` extend( <br/>&nbsp;&nbsp;{ x: 'x' }, <br/>&nbsp;&nbsp;{ a: 'a', b: { a: 'a', b: 'b' } } <br/>) `,
        () => Promise.resolve( JSON.stringify( extend( { x: 'x' }, { a: 'a', b: { a: 'a', b: 'b' } } ), null, 4 ) ),
        () => Promise.resolve( JSON.stringify( { x: 'x', a: 'a', b: { a: 'a', b: 'b' } }, null, 4 ) )
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
      let a = input.querySelector( '.input-test-a' ).value
      let b = input.querySelector( '.input-test-b' ).value
      try {
        output.innerHTML = JSON.stringify( extend( JSON.parse( a ), JSON.parse( b ) ), null, 4 )
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
