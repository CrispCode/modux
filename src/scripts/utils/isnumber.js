'use strict'

/**
 * Checks if the value is a number
 * @param {mixed} value The value to be checked if it's a number
 * @return {Boolean} Returns true if value is a number
 */
export let isNumber = value => ( Number( parseFloat( value ) ) === value )
