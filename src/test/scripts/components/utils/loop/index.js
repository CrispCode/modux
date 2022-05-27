'use strict'

import { loop, html } from './../../../../../scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>loop</b> - Cycles through the elements of a collection' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          let o = {<br/>
          &nbsp;&nbsp;'prop1': 'value1',<br/>
          &nbsp;&nbsp;'prop2': 'value2',<br/>
          &nbsp;&nbsp;'prop3': 'value3'<br/>
          }<br/>
          let results = {<br/>
          &nbsp;&nbsp;prop: [],<br/>
          &nbsp;&nbsp;value: []<br/>
          }<br/>
          loop( o, ( value, key ) => {<br/>
          &nbsp;&nbsp;results.prop.push( key )<br/>
          &nbsp;&nbsp;results.value.push( value )<br/>
          } )<br/>
          resolve( JSON.stringify( results ) )<br/>
        `,
        () => {
          return new Promise( ( resolve ) => {
            let o = {
              'prop1': 'value1',
              'prop2': 'value2',
              'prop3': 'value3'
            }
            let results = {
              prop: [],
              value: []
            }
            loop( o, ( value, key ) => {
              results.prop.push( key )
              results.value.push( value )
            } )
            resolve( JSON.stringify( results ) )
          } )
        },
        () => Promise.resolve( JSON.stringify( { 'prop': [ 'prop1', 'prop2', 'prop3' ], 'value': [ 'value1', 'value2', 'value3' ] } ) )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          let o = [ 'value1', 'value2', 'value3' ]<br/>
          let results = []<br/>
          loop( o, ( value ) => {<br/>
          &nbsp;&nbsp;results.push( value )<br/>
          } )<br/>
          resolve( JSON.stringify( results ) )<br/>
        `,
        () => {
          return new Promise( ( resolve ) => {
            let o = [ 'value1', 'value2', 'value3' ]
            let results = []
            loop( o, ( value ) => {
              results.push( value )
            } )
            resolve( JSON.stringify( results ) )
          } )
        },
        () => Promise.resolve( JSON.stringify( [ 'value1', 'value2', 'value3' ] ) )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          let o = [ 'value1', 'value2', 'value3' ]<br/>
          let found = loop( o, ( value ) => {<br/>
          &nbsp;&nbsp;if ( value === 'value2' ) {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;return value<br/>
          &nbsp;&nbsp;}<br/>
          } )<br/>
          resolve( found )<br/>
        `,
        () => {
          return new Promise( ( resolve ) => {
            let o = [ 'value1', 'value2', 'value3' ]
            let found = loop( o, ( value ) => {
              if ( value === 'value2' ) {
                return value
              }
            } )
            resolve( found )
          } )
        },
        () => Promise.resolve( 'value2' )
      )
    )

    return test
  }

  article2 () {
    let test = this._createTestElement( 'Test for yourself in the section below ( eg {"prop1": "value1"} )' )

    // Step 1
    let input = html( require( './test.html' ) )
    let output = html( '<span></span>' )

    input.querySelector( '.button-test' ).addEventListener( 'click', () => {
      let value = input.querySelector( '.input-test-value' ).value
      try {
        let results = {
          prop: [],
          value: []
        }
        loop( JSON.parse( value ), ( value, key ) => {
          results.prop.push( key )
          results.value.push( value )
        } )
        output.innerHTML = JSON.stringify( results )
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
