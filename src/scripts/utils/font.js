/* globals document */
'use strict'

import { html } from './html.js'
import { loop } from './loop.js'

/**
 * Contains the Adobe Blank font code to be used in testing
 * @external {Adobe Blank} https://github.com/adobe-fonts/adobe-blank
 */
import AdobeBlankCss from './../../styles/adobe-blank.inline.scss'

/**
 * Creates a font test container
 * @param {String} name The name of the container
 * @return {HTMLElement} The html tag containing the test text
 */
let createContainer = ( name ) => {
  return html( `
    <span id="modux-font-` + name + `" style="position: absolute; top: -500px">
      abcdefghijklmnopqrstuvwxyz
      1234567890
      ABCDEFGHIGKLMNOPQRSTUVWXYZ
      !? -_
    </span>
  ` )
}

/**
 * A class used to load fonts
 */
export class Font {
  /**
   * Creates a new instance of Font
   * @param {String} font Holds the font name
   * @param {Object} styles Holds the font styles as object properties
   */
  constructor ( font, styles ) {
    /**
     * Holds the font name
     * @type {String}
     * @private
     */
    this.__font = font
    /**
     * Holds the font styles as object properties
     * @type {Object}
     * @private
     */
    this.__styles = styles
  }

  /**
   * Returns a new instance of Font
   * @param {String} font Holds the font name
   * @param {Object} styles Holds the font styles as object properties
   * @return {Font} The newly created Font instance
   */
  static create ( font, styles ) {
    return new Font( font, styles )
  }

  /**
   * Loads the font into the html document
   * @param {Array} srcs An array of sources pointing to the font file ( ttf, otf, etc )
   * @return {Font} Returns the current instance of the class
   */
  get ( srcs ) {
    /**
     * Holds the fontfile css source
     * @type {HTMLElement}
     * @private
     */
    this.__fontfile = html( '<style></style>' )
    document.head.appendChild( this.__fontfile )
    let data = 'src: ' + srcs.join( ', ' ) + ';\n'
    loop( this.__styles, ( value, key ) => {
      data += key + ': ' + value + ';\n'
    } )
    this.__fontfile.innerHTML = `
    @font-face {
      font-family: '` + this.__font + `';
      ` + data + `
    }
    `
    return this
  }

  /**
   * Destroy font related tags
   */
  destroy () {
    if ( this.__fontfile ) {
      this.__fontfile.remove()
    }
  }

  /**
   * A method to check if a font has been loaded
   * @param {Number} [attempts=-1] The number of attempts before the promise is rejected. Default is infinite.
   * @param {Number} [interval=100] The time in milliseconds it takes to retry the load
   * @return {Promise} A promise that is resolved when the font is loaded
  */
  load ( attempts, interval ) {
    attempts = attempts || -1

    let blankFontStyle = html( '<style></style>' )
    document.head.appendChild( blankFontStyle )
    blankFontStyle.innerHTML = AdobeBlankCss

    let container = createContainer( this.__font )
    document.body.appendChild( container )

    container.style.fontFamily = '"' + this.__font + '", "AdobeBlank"'

    loop( this.__styles, ( value, key ) => {
      container.style[ key ] = value
    } )

    let count = 0

    return new Promise( ( resolve, reject ) => {
      let cleanUp = () => {
        container.parentNode.removeChild( container )
        blankFontStyle.remove()
      }
      let timer = () => {
        if ( container.offsetWidth > 0 ) {
          cleanUp()
          resolve()
        } else {
          count++
          if ( count === attempts ) {
            cleanUp()
            reject()
          } else {
            setTimeout( timer, interval || 100 )
          }
        }
      }

      setTimeout( () => {
        timer()
      }, interval || 100 )
    } )
  }
}
