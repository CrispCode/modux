/* globals window, history */

'use strict'

import { loop } from './../utils/loop.js'
import { uid } from './../utils/uid.js'

/**
 * Holds all the handlers bound to the router class. Since the class is static, all imports will point to the same class
 * @type {Object}
 */
let listeners = {}

/**
 * This function is used to call all handlers on url or state change
 * @type {Function}
 */
const handler = function () {
  const url = window.location.toString()

  loop( listeners, ( listener ) => {
    listener( url )
  } )
}

window.addEventListener( 'pageshow', () => { handler() } )
window.addEventListener( 'hashchage', () => { handler() } )
window.addEventListener( 'popstate', () => { handler() } )
history.onpushstate = () => { handler() }

// Create the `pushstate` event
/**
 * This variable is a shorthand for history.pushState
 * @type {String}
 */
let pushState = history.pushState
/**
 * Add a new method to history, to call use when the state or url changes
 */
history.pushState = function () {
  let next = pushState.apply( history, arguments )
  if ( typeof history.onpushstate === 'function' ) {
    history.onpushstate()
  }
  return next
}

/**
 * A static class which is responsible for handling state and url change
 * Remember to remove <base/> in most common scenarios
 */
export class Router {
  /**
   * A static method used to push a new state
   * @param {String} url The new url
   */
  static redirect ( url ) {
    history.pushState( { url: url }, '', url )
  }

  /**
   * A static method used to attach a handler to the state change. It returns a function that can be called to remove the handler when it is no longer used
   * @param {Function} listener The state change handler
   * @return {Function}
   */
  static onStateChange ( listener ) {
    let id = uid()
    listeners[ id ] = listener
    return () => {
      delete listeners[ id ]
    }
  }
}
