/* globals window, requestAnimationFrame */

'use strict'

import { approx } from './approx.js'

/**
 * Scroll window to position
 * @param {Number} x The x position
 * @param {Number} y The y position
 * @param {Number} cycles The scroll cycles needed to reach destination
 */
let scrollTo = ( x, y, cycles ) => {
  let positionX = window.scrollX
  let positionY = window.scrollY

  cycles = cycles || 1 // Default value is instant scroll

  let speedLeft = ( x - positionX ) / cycles
  let speedTop = ( y - positionY ) / cycles

  let scroll = () => {
    cycles--
    if ( cycles >= 0 ) {
      positionX += speedLeft
      positionY += speedTop
      window.scrollTo( approx( positionX, 0 ), approx( positionY, 0 ) )
      requestAnimationFrame( scroll )
    } else {
      window.scrollTo( x, y )
    }
  }
  scroll()
}

/**
 * Scrolls an element to position
 * @param {HTMLElement} element
 * @param {Number} x The x position
 * @param {Number} y The y position
 * @param {Number} cycles The scroll cycles needed to reach destination
 */
let elementScrollTo = ( element, x, y, cycles ) => {
  let positionX = element.scrollLeft
  let positionY = element.scrollTop
  cycles = cycles || 1 // Default value is instant scroll

  let speedLeft = ( x - positionX ) / cycles
  let speedTop = ( y - positionY ) / cycles

  let scroll = () => {
    cycles--
    if ( cycles >= 0 ) {
      positionX += speedLeft
      positionY += speedTop
      element.scrollLeft = approx( positionX, 0 )
      element.scrollTop = approx( positionY, 0 )
      requestAnimationFrame( scroll )
    } else {
      element.scrollLeft = x
      element.scrollTop = y
    }
  }
  scroll()
}

/**
 * A library used for scrolling window or an element
 */
export let scroll = {
  scrollToTop: ( speed ) => {
    scrollTo( 0, 0, speed )
  },
  elementScrollTo: elementScrollTo,
  scrollTo: scrollTo
}
