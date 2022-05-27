'use strict'

/**
 * Generate a random number between two values
 * @param {Number} min The minimum value
 * @param {Number} max The maximum value
 * @return {Number} The random number generated
 */
export let rnd = ( min, max ) => {
  return Math.floor( Math.random() * ( Math.floor( max ) - Math.ceil( min ) + 1 ) ) + Math.ceil( min )
}
