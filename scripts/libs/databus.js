'use strict'

import { loop } from './../utils/loop.js'
import { uid } from './../utils/uid.js'

/**
 * A DataBus class used to communicate between components
 */
class DataBus {
  /**
   * Creates an instance of DataBus
   */
  constructor () {
    /**
     * Contains all the listeners subscribed to the DataBus
     * @type {Object}
     * @private
     */
    this.__listeners = {}
    /**
     * Contains all the data sent to the DataBus. Is used when a handler is attached after the data has already been pushed.
     * @type {Object}
     * @private
     */
    this.__data = {}
  }

  /**
   * Method used to bind handlers to the DataBus
   * @param {String} eventname The event name
   * @param {Function} listener The handler for the event
   * @param {Boolen} [showPreviousData=false] Set to true if data is to be sent to the handler upon attachment, if set to false it will work as a standard event handler
   * @return {Function} Call this function to unsubscribe from the event
   */
  on ( eventname, listener, showPreviousData ) {
    let id = uid()
    this.__listeners[ id ] = {
      eventname: eventname,
      handler: listener
    }
    if ( showPreviousData && this.__data && this.__data[ eventname ] !== undefined ) {
      listener.apply( listener, this.__data[ eventname ] )
    }
    return () => {
      delete this.__listeners[ id ]
    }
  }

  /**
   * Emits data on a specific event name. Accepts multiple parameters. The first parameter will be the event name and all the following params will be pushed on the event name
   */
  emit () {
    let values = Array.prototype.slice.call( arguments )
    let eventname = values.shift()

    this.__data[ eventname ] = values
    loop( this.__listeners, ( data ) => {
      if ( data.eventname === eventname ) {
        data.handler.apply( data.handler, values )
      }
    } )
  }

  /**
   * Returns an instance of DataBus
   * @return { DataBus }
   */
  create () {
    return new DataBus()
  }
}

/**
 * Instance of DataBus to be used as singleton
 */
export let databus = new DataBus()
