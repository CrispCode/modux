'use strict'

/**
 * Loop through a collection Object or Array. If the function returns a value other then undefined, the loop stops.
 * @param {Object|Array} collection The collection to loop through
 * @param {Function} cb The callback which is called for every element in collection
 * @return If a value other than `undefined` is returned in the callback, it will be passed on to the return of the function and stop the loop
 */
export let loop = ( collection = {}, cb ) => {
  if ( collection ) {
    for ( let i = 0, k = Object.keys( collection ), l = k.length; i < l; i++ ) {
      let result = cb( collection[ k[ i ] ], Array.isArray( collection ) ? parseInt( k[ i ] ) : k[ i ] )
      if ( result !== undefined ) {
        return result
      }
    }
  }
}
