'use strict'

import { Font } from './../../../../../src/scripts'

import { Utils } from './../index.js'

export default class Index extends Utils {
  article1 () {
    let test = this._createTestElement( '<b>Font</b> - A class used to load custom fonts' )

    // Step 1
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          document.head.appendChild( html( '&lt;style&gt;@import url('https://fonts.googleapis.com/css?family=Indie+Flower');&lt;/style&gt;' ) )<br/><br/>
          Font.create( 'Indie Flower' ).load()<br/>
          &nbsp;&nbsp;.then( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font loaded' )<br/>
          &nbsp;&nbsp;} )
        `,
        ( element ) => new Promise( ( resolve ) => {
          element.innerHTML = `<style>@import url('https://fonts.googleapis.com/css?family=Indie+Flower');</style>`
          Font.create( 'Indie Flower' ).load()
            .then( () => {
              resolve( 'Font loaded' )
            } )
        } ),
        () => Promise.resolve( 'Font loaded' )
      )
    )

    // Step 2
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          Font.create( 'No font' ).load( 10 )<br/>
          &nbsp;&nbsp;.then( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font loaded' )<br/>
          &nbsp;&nbsp;} )<br/>
          &nbsp;&nbsp;.catch( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font not found' )<br/>
          &nbsp;&nbsp;} )
        `,
        () => new Promise( ( resolve ) => {
          Font.create( 'No font' ).load( 10 )
            .then( () => {
              resolve( 'Font loaded' )
            } )
            .catch( () => {
              resolve( 'Font not found' )
            } )
        } ),
        () => Promise.resolve( 'Font not found' )
      )
    )

    // Step 3
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          Font.create( 'No font', { 'font-weight': 'bold' } ).load( 10, 500 )<br/>
          &nbsp;&nbsp;.then( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font loaded' )<br/>
          &nbsp;&nbsp;} )<br/>
          &nbsp;&nbsp;.catch( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font not found' )<br/>
          &nbsp;&nbsp;} )
        `,
        () => new Promise( ( resolve ) => {
          Font.create( 'No font', { 'font-weight': 'bold' } ).load( 10, 500 )
            .then( () => {
              resolve( 'Font loaded' )
            } )
            .catch( () => {
              resolve( 'Font not found' )
            } )
        } ),
        () => Promise.resolve( 'Font not found' )
      )
    )

    // Step 4
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          let font = Font.create( 'Test Font 1' )<br/>
          font.get( [<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;'url(\\'/fonts/Roboto-Regular.ttf\\') format(\\'truetype\\')'<br/>
          &nbsp;&nbsp;] )<br/>
          &nbsp;&nbsp;.load( 10, 500 )<br/>
          &nbsp;&nbsp;.then( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;font.destroy()<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font loaded' )<br/>
          &nbsp;&nbsp;} )<br/>
          &nbsp;&nbsp;.catch( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font not found' )<br/>
          &nbsp;&nbsp;} )
        `,
        () => new Promise( ( resolve ) => {
          let font = Font.create( 'Test Font 1' )
          font.get( [
            `url('/fonts/Roboto-Regular.ttf') format('truetype')`
          ] )
            .load( 10, 500 )
            .then( () => {
              font.destroy()
              resolve( 'Font loaded' )
            } )
            .catch( () => {
              resolve( 'Font not found' )
            } )
        } ),
        () => Promise.resolve( 'Font loaded' )
      )
    )

    // Step 5
    test.querySelector( '.steps' ).appendChild(
      this._createStep(
        `
          let font = Font.create( 'Test Font 2', { 'font-weight': 'bold' } )<br/>
          font.get( [<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;'url(\\'/wrong-path/no-font.ttf\\') format(\\'truetype\\')',<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;'url(\\'/wrong-path/no-font.otf\\') format(\\'opentype\\')'<br/>
          &nbsp;&nbsp;] )<br/>
          &nbsp;&nbsp;.load( 10, 500 )<br/>
          &nbsp;&nbsp;.then( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;font.destroy()<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font loaded' )<br/>
          &nbsp;&nbsp;} )<br/>
          &nbsp;&nbsp;.catch( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font not found' )<br/>
          &nbsp;&nbsp;} )
        `,
        () => new Promise( ( resolve ) => {
          let font = Font.create( 'Test Font 2', { 'font-weight': 'bold' } )
          font.get( [
            `url('/wrong-path/no-font.ttf') format('truetype')`,
            `url('/wrong-path/no-font.otf') format('opentype')`
          ] )
            .load( 10, 500 )
            .then( () => {
              font.destroy()
              resolve( 'Font loaded' )
            } )
            .catch( () => {
              resolve( 'Font not found' )
            } )
        } ),
        () => Promise.resolve( 'Font not found' )
      )
    )

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
  }
}
