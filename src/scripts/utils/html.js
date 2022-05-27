/* globals document */
'use strict'

/**
 * Convert string to html
 * @param {String} text HTML code represented as String
 * @return {HTMLElement}
 */
export let html = ( text ) => {
  let container = document.createElement( 'section' )
  container.innerHTML = ( text.default ) ? text.default : text.trim()
  return container.firstChild
}
