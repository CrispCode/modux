'use strict'

import { Font } from './../../../../../scripts'

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
          let font = Font.create( 'WH Hoxton' )<br/>
          font.get( [<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;'url(\\'/fonts/WHHoxtonWeb-Regular.ttf\\') format(\\'truetype\\')',<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;'url(\\'/fonts/WHHoxton-Regular.otf\\') format(\\'opentype\\')'<br/>
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
          let font = Font.create( 'WH Hoxton' )
          font.get( [
            `url('/fonts/WHHoxtonWeb-Regular.ttf') format('truetype')`,
            `url('/fonts/WHHoxton-Regular.otf') format('opentype')`
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
          let font = Font.create( 'WH Hoxton', { 'font-weight': 'bold' } )<br/>
          font.get( [<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;'url(\\'/fonts/WHHoxtonWeb-Bold.ttf\\') format(\\'truetype\\')',<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;'url(\\'/fonts/WHHoxton-Bold.otf\\') format(\\'opentype\\')'<br/>
          &nbsp;&nbsp;] )<br/>
          &nbsp;&nbsp;.load( 10 )<br/>
          &nbsp;&nbsp;.then( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;font.destroy()<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font loaded' )<br/>
          &nbsp;&nbsp;} )<br/>
          &nbsp;&nbsp;.catch( () => {<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;resolve( 'Font not found' )<br/>
          &nbsp;&nbsp;} )
        `,
        () => new Promise( ( resolve ) => {
          let font = Font.create( 'WH Hoxton', { 'font-weight': 'bold' } )
          font.get( [
            `url('/fonts/WHHoxtonWeb-Bold.ttf') format('truetype')`,
            `url('/fonts/WHHoxton-Bold.otf') format('opentype')`
          ] )
            .load( 10 )
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

    return test
  }

  execute () {
    this.element.appendChild( this.article1() )
  }
}
