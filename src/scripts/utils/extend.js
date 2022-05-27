'use strict'

import { isObject } from './isobject.js'

/**
 * Extends an object with another object
 * @param {Object} o1 The object to be extended
 * @param {Object} o2 The object to extend with
 * @return {Object} Returns the source object
 */
export let extend = ( o1, o2 ) => {
  if ( isObject( o1 ) && isObject( o2 ) ) {
    let keys = Object.keys( Object.assign( {}, o1, o2 ) )
    for ( let i = 0; i < keys.length; i++ ) {
      o1[ keys[i] ] = extend( o1[ keys[ i ] ], o2[ keys[ i ] ] )
    }
  } else if ( o2 !== undefined ) {
    return o2
  }
  return o1
}
